export type ButtonVariant = 'number' | 'operator' | 'function' | 'primary' | 'danger';

export interface CalculatorState {
    currentValue: string;
    previousValue: string | null;
    operator: string | null;
    expression: string;
    angleMode: 'DEG' | 'RAD';
    history: string[];
    isError: boolean;
    shouldResetDisplay: boolean;
}

export type ButtonAction =
    | { type: 'NUMBER'; payload: string }
    | { type: 'OPERATOR'; payload: string }
    | { type: 'FUNCTION'; payload: string }
    | { type: 'CLEAR' }
    | { type: 'DELETE' }
    | { type: 'EQUALS' }
    | { type: 'DECIMAL' }
    | { type: 'TOGGLE_ANGLE' };
