export const validateInput = (currentValue: string, input: string): boolean => {
    // 1. Decimal Point Validation
    if (input === '.') {
        // If current value already contains a dot, return false
        // Note: We need to handle cases where currentValue is like "1.2 + 3"
        // The "current number" is the last number segment.
        const parts = currentValue.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        return !lastPart.includes('.');
    }

    // 2. Operator Validation
    const operators = ['+', '-', '*', '/']; // Basic operators
    if (operators.includes(input)) {
        if (currentValue.length === 0) return false; // Cannot start with operator (except minus, but simplicity first)

        const lastChar = currentValue.slice(-1);
        // Prevent consecutive operators
        if (operators.includes(lastChar)) {
            return false;
        }
    }

    return true;
};

export const validateExpression = (expression: string): boolean => {
    // Parenthesis Balance Check
    let balance = 0;
    for (const char of expression) {
        if (char === '(') balance++;
        if (char === ')') balance--;
        if (balance < 0) return false; // Closing parenthesis before opening
    }
    return balance === 0;
};
