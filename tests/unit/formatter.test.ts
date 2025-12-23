import { describe, it, expect } from 'vitest';
import { formatResult } from '@/utils/formatter';

describe('Result Formatter', () => {
    it('should format integer with thousands separator', () => {
        expect(formatResult('1000')).toBe('1,000');
        expect(formatResult('1000000')).toBe('1,000,000');
    });

    it('should format float with precision handling', () => {
        // Floating point error correction
        expect(formatResult('0.4999999999999999')).toBe('0.5'); // sin(30) case
        expect(formatResult('3.0000000000000004')).toBe('3');
    });

    it('should handle large numbers', () => {
        expect(formatResult('123456789.123')).toBe('123,456,789.123');
    });

    it('should return Error as is', () => {
        expect(formatResult('Error')).toBe('Error');
    });
});
