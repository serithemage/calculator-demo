import React from 'react';

interface DisplayProps {
    expression: string;
    value: string;
    angleMode: 'DEG' | 'RAD';
}

export const Display: React.FC<DisplayProps> = ({ expression, value, angleMode }) => {
    return (
        <div className="flex-1 flex flex-col justify-end items-end px-6 pb-6 w-full relative z-0">
            <div className="text-right mb-2 w-full overflow-hidden text-ellipsis whitespace-nowrap opacity-60 text-lg font-normal tracking-wide text-slate-700 dark:text-slate-300 flex justify-end gap-2 items-center">
                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded opacity-50">{angleMode}</span>
                <span>{expression}</span>
            </div>

            {/* Current Result */}
            <div className="text-right w-full break-all text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white transition-all">
                {value}
            </div>
        </div>
    );
};
