import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'number' | 'operator' | 'function' | 'special' | 'equals';
    label: string;
    className?: string; // Allow additional custom styles like grid-span
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'number',
    label,
    className = '',
    ...props
}) => {
    const baseStyles = "flex items-center justify-center rounded-2xl text-xl font-bold transition-all active:scale-95 select-none";

    const variants = {
        number: "bg-white dark:bg-[#25303e] text-slate-900 dark:text-white shadow-sm hover:brightness-110",
        operator: "bg-slate-200 dark:bg-surface-dark text-primary text-2xl hover:brightness-110",
        function: "bg-slate-200 dark:bg-surface-dark text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-300 dark:hover:bg-surface-dark-hover",
        special: "bg-slate-200 dark:bg-surface-dark text-slate-900 dark:text-red-400 text-xl hover:brightness-110",
        equals: "bg-primary text-white text-3xl shadow-lg shadow-primary/30 hover:bg-blue-600",
    };

    // Adjust height based on variant (functions are smaller height)
    const heightClass = variant === 'function' ? 'h-10 rounded-lg' : 'h-16';

    return (
        <button
            className={`${baseStyles} ${heightClass} ${variants[variant]} ${className}`}
            {...props}
        >
            {label}
        </button>
    );
};
