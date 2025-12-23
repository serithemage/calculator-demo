import React, { useEffect } from 'react';
import { Button } from './Button';
import { Display } from './Display';
import { useCalculator } from '@/hooks/useCalculator';

export const Calculator: React.FC = () => {
    const { state, processInput } = useCalculator();

    const onNumber = (num: string) => processInput('NUMBER', num);
    const onOperator = (op: string) => processInput('OPERATOR', op);
    const onFunction = (fn: string) => processInput('FUNCTION', fn);
    const onAction = (type: string) => processInput(type);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            if (/[0-9]/.test(key)) onNumber(key);
            if (key === '.') onNumber('.');
            if (['+', '-', '*', '/', '%', '^'].includes(key)) onOperator(key);
            if (key === 'Enter' || key === '=') { e.preventDefault(); onAction('EQUALS'); }
            if (key === 'Backspace') onAction('DELETE');
            if (key === 'Escape') onAction('CLEAR');
            if (key === '(' || key === ')') onAction('()');
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [processInput]);

    return (
        <div className="relative flex h-screen w-full flex-col max-w-md mx-auto shadow-2xl overflow-hidden bg-background-light dark:bg-background-dark font-display">
            {/* Header */}
            <div className="flex items-center p-4 justify-between z-10">
                <div className="w-12"></div>
                <h2 className="text-lg font-bold leading-tight tracking-tight text-center text-slate-900 dark:text-white">Standard</h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex items-center justify-center rounded-full h-10 w-10 text-slate-500 hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">history</span>
                    </button>
                </div>
            </div>

            {/* Display Area */}
            <Display
                expression={state.expression}
                value={state.currentValue}
                angleMode={state.angleMode}
            />

            {/* Controls Container */}
            <div className="flex flex-col gap-4 px-4 pb-6 bg-background-light dark:bg-background-dark rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)] z-10">

                {/* Tools Row: Mode Switch & Backspace */}
                <div className="flex justify-between items-center py-2 pt-4">
                    {/* DEG/RAD Switch */}
                    <div className="flex bg-slate-200 dark:bg-surface-dark p-1 rounded-lg">
                        <label className={`cursor-pointer relative z-10 px-3 py-1.5 rounded-md transition-all duration-200 ${state.angleMode === 'DEG' ? 'bg-white dark:bg-[#2c3b4e] text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
                            <span className="text-xs font-bold">DEG</span>
                            <input type="radio" name="angle-mode" value="DEG" className="hidden" checked={state.angleMode === 'DEG'} onChange={() => onAction('TOGGLE_ANGLE')} />
                        </label>
                        <label className={`cursor-pointer relative z-10 px-3 py-1.5 rounded-md transition-all duration-200 ${state.angleMode === 'RAD' ? 'bg-white dark:bg-[#2c3b4e] text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
                            <span className="text-xs font-bold">RAD</span>
                            <input type="radio" name="angle-mode" value="RAD" className="hidden" checked={state.angleMode === 'RAD'} onChange={() => onAction('TOGGLE_ANGLE')} />
                        </label>
                    </div>

                    {/* Backspace Button */}
                    <button
                        onClick={() => onAction('DELETE')}
                        className="flex items-center justify-center text-primary h-10 px-4 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[28px]">backspace</span>
                    </button>
                </div>

                {/* Scientific Functions Grid */}
                <div className="grid grid-cols-5 gap-2.5">
                    <Button label="sin" variant="function" onClick={() => onFunction('sin')} />
                    <Button label="cos" variant="function" onClick={() => onFunction('cos')} />
                    <Button label="tan" variant="function" onClick={() => onFunction('tan')} />
                    <Button label="π" variant="function" onClick={() => onFunction('pi')} />
                    <Button label="e" variant="function" onClick={() => onFunction('e')} />

                    <Button label="ln" variant="function" onClick={() => onFunction('ln')} />
                    <Button label="log" variant="function" onClick={() => onFunction('log')} />
                    <Button label="1/x" variant="function" onClick={() => onFunction('1/')} />
                    <Button label="√" variant="function" onClick={() => onFunction('sqrt')} />
                    <Button label="^" variant="function" onClick={() => onOperator('^')} />
                </div>

                <div className="h-px bg-slate-200 dark:bg-white/5 w-full my-1"></div>

                {/* Main Keypad Grid */}
                <div className="grid grid-cols-4 gap-3">
                    <Button label="AC" variant="special" onClick={() => onAction('CLEAR')} />
                    <Button label="( )" variant="operator" onClick={() => onAction('()')} />
                    <Button label="%" variant="operator" onClick={() => onOperator('%')} />
                    <Button label="÷" variant="operator" onClick={() => onOperator('/')} />

                    <Button label="7" variant="number" onClick={() => onNumber('7')} />
                    <Button label="8" variant="number" onClick={() => onNumber('8')} />
                    <Button label="9" variant="number" onClick={() => onNumber('9')} />
                    <Button label="×" variant="operator" onClick={() => onOperator('*')} />

                    <Button label="4" variant="number" onClick={() => onNumber('4')} />
                    <Button label="5" variant="number" onClick={() => onNumber('5')} />
                    <Button label="6" variant="number" onClick={() => onNumber('6')} />
                    <Button label="-" variant="operator" onClick={() => onOperator('-')} />

                    <Button label="1" variant="number" onClick={() => onNumber('1')} />
                    <Button label="2" variant="number" onClick={() => onNumber('2')} />
                    <Button label="3" variant="number" onClick={() => onNumber('3')} />
                    <Button label="+" variant="operator" onClick={() => onOperator('+')} />

                    <Button label="0" variant="number" onClick={() => onNumber('0')} />
                    <Button label="." variant="number" onClick={() => onNumber('.')} />
                    <Button label="=" variant="equals" className="col-span-2" onClick={() => onAction('EQUALS')} />
                </div>
            </div>
        </div>
    );
};
