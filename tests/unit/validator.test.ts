import { describe, it, expect } from 'vitest';
import { validateInput, validateExpression } from '@/utils/validator';

describe('Input Validator', () => {
    describe('Decimal Point Validation', () => {
        it('should allow decimal point if not present', () => {
            expect(validateInput('123', '.')).toBe(true);
        });

        it('should prevent multiple decimal points', () => {
            expect(validateInput('12.3', '.')).toBe(false);
            expect(validateInput('0.5', '.')).toBe(false);
        });
    });

    describe('Operator Validation', () => {
        it('should allow operator if last char is number', () => {
            expect(validateInput('123', '+')).toBe(true);
        });

        it('should prevent consecutive operators', () => {
            expect(validateInput('12+', '+')).toBe(false);
            expect(validateInput('12*', '/')).toBe(false);
        });

        // Exception: Minus needs careful handling (negative numbers), but let's stick to basic rule first
        // or allow simple replacement? The validator just says valid or not to append.
    });
});

describe('Expression Validator', () => {
    it('should return true for valid parenthesis', () => {
        expect(validateExpression('(1 + 2) * 3')).toBe(true);
    });

    it('should return false for unbalanced parenthesis', () => {
        expect(validateExpression('(1 + 2')).toBe(false);
        expect(validateExpression('((1 + 2)')).toBe(false);
        expect(validateExpression('1 + 2)')).toBe(false);
    });
});
