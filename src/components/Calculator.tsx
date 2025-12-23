import React from 'react';
import { Button } from './Button';
import { Display } from './Display';

export const Calculator: React.FC = () => {
    // Placeholder hook usage - Phase 4 will implement logic
    // For UI Phase, we mock the state or use a dummy hook temporarily
    // But let's define the layout structure fully.

    const handleInput = (char: string) => console.log(char);

    return (
        <div className="relative flex h-screen w-full flex-col max-w-md mx-auto shadow-2xl overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Header */}
            <div className="flex items-center p-4 justify-between z-10">
                <div className="w-12"></div>
                <h2 className="text-lg font-bold leading-tight tracking-tight text-center text-slate-900 dark:text-white">Scientific</h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex items-center justify-center rounded-full h-10 w-10 text-slate-500 hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined">history</span>
                    </button>
                </div>
            </div>

            {/* Display Area */}
            <Display
                expression="sin(30)"
                value="0.5"
                angleMode="DEG"
            />

            {/* Controls Container */}
            <div className="flex flex-col gap-4 px-4 pb-6 bg-background-light dark:bg-background-dark rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)] z-10">

                {/* Tools Row: Mode Switch & Backspace */}
                <div className="flex justify-between items-center py-2 pt-4">
                    {/* DEG/RAD Switch */}
                    <div className="flex bg-slate-200 dark:bg-surface-dark p-1 rounded-lg">
                        <label className="cursor-pointer relative z-10 px-3 py-1.5 rounded-md transition-all duration-200 has-[:checked]:bg-white dark:has-[:checked]:bg-[#2c3b4e] has-[:checked]:text-primary has-[:checked]:shadow-sm">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">DEG</span>
                            <input type="radio" name="angle-mode" value="DEG" className="hidden" defaultChecked />
                        </label>
                        <label className="cursor-pointer relative z-10 px-3 py-1.5 rounded-md transition-all duration-200 has-[:checked]:bg-white dark:has-[:checked]:bg-[#2c3b4e] has-[:checked]:text-primary has-[:checked]:shadow-sm">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">RAD</span>
                            <input type="radio" name="angle-mode" value="RAD" className="hidden" />
                        </label>
                    </div>

                    {/* Backspace Button */}
                    <button className="flex items-center justify-center text-primary h-10 px-4 rounded-lg hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-2xl">backspace</span>
                    </button>
                </div>

                {/* Scientific Functions Grid */}
                <div className="grid grid-cols-5 gap-2.5">
                    <Button label="sin" variant="function" onClick={() => handleInput('sin')} />
                    <Button label="cos" variant="function" onClick={() => handleInput('cos')} />
                    <Button label="tan" variant="function" onClick={() => handleInput('tan')} />
                    <Button label="π" variant="function" onClick={() => handleInput('pi')} />
                    <Button label="e" variant="function" onClick={() => handleInput('e')} />

                    <Button label="ln" variant="function" onClick={() => handleInput('ln')} />
                    <Button label="log" variant="function" onClick={() => handleInput('log')} />
                    <Button label="1/x" variant="function" onClick={() => handleInput('inv')} />
                    <Button label="√" variant="function" onClick={() => handleInput('sqrt')} />
                    <Button label="^" variant="function" onClick={() => handleInput('pow')} />
                </div>

                <div className="h-px bg-slate-200 dark:bg-white/5 w-full my-1"></div>

                {/* Main Keypad Grid */}
                <div className="grid grid-cols-4 gap-3">
                    <Button label="AC" variant="special" onClick={() => handleInput('AC')} />
                    <Button label="( )" variant="operator" onClick={() => handleInput('()')} />
                    <Button label="%" variant="operator" onClick={() => handleInput('%')} />
                    <Button label="÷" variant="operator" onClick={() => handleInput('/')} />

                    <Button label="7" variant="number" onClick={() => handleInput('7')} />
                    <Button label="8" variant="number" onClick={() => handleInput('8')} />
                    <Button label="9" variant="number" onClick={() => handleInput('9')} />
                    <Button label="×" variant="operator" onClick={() => handleInput('*')} />

                    <Button label="4" variant="number" onClick={() => handleInput('4')} />
                    <Button label="5" variant="number" onClick={() => handleInput('5')} />
                    <Button label="6" variant="number" onClick={() => handleInput('6')} />
                    <Button label="-" variant="operator" onClick={() => handleInput('-')} />

                    <Button label="1" variant="number" onClick={() => handleInput('1')} />
                    <Button label="2" variant="number" onClick={() => handleInput('2')} />
                    <Button label="3" variant="number" onClick={() => handleInput('3')} />
                    <Button label="+" variant="operator" onClick={() => handleInput('+')} />

                    <Button label="0" variant="number" onClick={() => handleInput('0')} />
                    <Button label="." variant="number" onClick={() => handleInput('.')} />
                    <Button label="=" variant="equals" className="col-span-2" onClick={() => handleInput('=')} />
                </div>
            </div>
        </div>
    );
};
