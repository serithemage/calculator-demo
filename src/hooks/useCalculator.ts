import { useState, useCallback } from 'react';
import { evaluate } from '@/utils/calculator';
import { validateInput } from '@/utils/validator';
import { formatResult } from '@/utils/formatter';
import { CalculatorState } from '@/types/calculator';

const INITIAL_STATE: CalculatorState = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    expression: '',
    angleMode: 'DEG',
    history: [],
    isError: false,
    shouldResetDisplay: false,
};

export const useCalculator = () => {
    const [state, setState] = useState<CalculatorState>(INITIAL_STATE);

    const handleToggleAngle = useCallback(() => {
        setState((prev) => ({
            ...prev,
            angleMode: prev.angleMode === 'DEG' ? 'RAD' : 'DEG',
        }));
    }, []);

    const processInput = useCallback((type: string, payload?: string) => {
        setState((prev) => {
            let next = { ...prev };

            // Reset display logic on new input
            if (next.shouldResetDisplay) {
                if (['+', '-', '*', '/', '%', '^'].includes(payload || '') || type === 'OPERATOR') {
                    // Continue calculation with previous result
                    next.expression = next.currentValue;
                    next.shouldResetDisplay = false;
                    next.currentValue = '0';
                } else if (type === 'TOGGLE_ANGLE') {
                    // Do nothing, just toggle (handled by state update usually)
                } else {
                    // Start a fresh calculation
                    next.expression = '';
                    next.currentValue = '0';
                    next.shouldResetDisplay = false;
                }
            }

            switch (type) {
                case 'NUMBER':
                    if (validateInput(next.currentValue, payload!)) {
                        // special handling for literal '.'
                        if (payload === '.') {
                            if (!next.currentValue.includes('.')) {
                                next.currentValue += '.';
                            }
                        } else {
                            next.currentValue = next.currentValue === '0'
                                ? payload!
                                : next.currentValue + payload!;
                        }
                    }
                    break;

                case 'OPERATOR':
                    // Append current input + operator to expression
                    // But avoid consecutive operators logic (simple version)
                    next.expression = next.expression + next.currentValue + payload;
                    next.currentValue = '0';
                    break;

                case 'FUNCTION':
                    // e.g. sin, cos
                    // If replacing 0, overwrite. Else append with multiplication implicit?
                    if (next.currentValue === '0') {
                        next.currentValue = payload!;
                    } else {
                        next.currentValue += payload!;
                    }
                    // Add opening parenthesis automatically for functions
                    if (!payload?.includes('^') && !payload?.includes('!')) { // basic heuristic
                        next.currentValue += '(';
                    }
                    break;

                case '()':
                    // Smart parentheses
                    const openCount = (next.currentValue.match(/\(/g) || []).length;
                    const closeCount = (next.currentValue.match(/\)/g) || []).length;
                    if (openCount > closeCount) {
                        next.currentValue += ')';
                    } else {
                        if (next.currentValue === '0') next.currentValue = '(';
                        else next.currentValue += '(';
                    }
                    break;

                case 'EQUALS':
                    try {
                        // Compose full expression
                        // If operator was last pressed? handled by mathjs or error
                        const finalExpr = next.expression + next.currentValue;
                        const result = evaluate(finalExpr, next.angleMode);

                        next.history = [...next.history, `${finalExpr} = ${result}`];
                        next.expression = finalExpr + ' ='; // View only
                        next.currentValue = formatResult(result);
                        next.shouldResetDisplay = true;
                        if (result === 'Error') next.isError = true;
                    } catch (e) {
                        next.currentValue = 'Error';
                        next.isError = true;
                        next.shouldResetDisplay = true;
                    }
                    break;

                case 'CLEAR':
                    return { ...INITIAL_STATE, angleMode: next.angleMode, history: next.history };

                case 'DELETE':
                    if (next.currentValue.length > 1) {
                        next.currentValue = next.currentValue.slice(0, -1);
                    } else {
                        next.currentValue = '0';
                    }
                    break;

                case 'TOGGLE_ANGLE':
                    next.angleMode = next.angleMode === 'DEG' ? 'RAD' : 'DEG';
                    break;
            }

            return next;
        });
    }, []);

    return {
        state,
        processInput,
        handleToggleAngle,
    };
};
