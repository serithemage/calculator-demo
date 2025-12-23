import { format } from 'mathjs';

export const formatResult = (result: string): string => {
    if (result === 'Error') return 'Error';
    if (result === '') return '';

    try {
        // 1. Convert to number to handle floating point issues
        // Using math.format to strip precision errors (precision 14 is usually safe for JS floats)
        // "0.4999999999999999" -> "0.5"
        const cleanedNumber = format(parseFloat(result), { precision: 14 });
        const numberValue = parseFloat(cleanedNumber);

        if (isNaN(numberValue)) return result;

        // 2. Add thousands separators using toLocaleString
        // Keep decimal places as is, up to 10 digits
        return numberValue.toLocaleString('en-US', {
            maximumFractionDigits: 10,
            useGrouping: true
        });
    } catch (e) {
        return result;
    }
};
