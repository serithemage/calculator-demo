import { describe, it, expect } from 'vitest';
import { evaluate, AngleMode } from '@/utils/calculator';

describe('Calculator Engine', () => {
    const mode: AngleMode = 'DEG';

    describe('Basic Arithmetic', () => {
        it('should correctly add two numbers', () => {
            expect(evaluate('2 + 3', mode)).toBe('5');
            expect(evaluate('1.5 + 2.5', mode)).toBe('4');
        });

        it('should correctly subtract two numbers', () => {
            expect(evaluate('5 - 3', mode)).toBe('2');
            expect(evaluate('10 - 20', mode)).toBe('-10');
        });

        it('should correctly multiply two numbers', () => {
            expect(evaluate('4 * 3', mode)).toBe('12');
            expect(evaluate('2.5 * 2', mode)).toBe('5');
        });

        it('should correctly divide two numbers', () => {
            expect(evaluate('10 / 2', mode)).toBe('5');
            expect(evaluate('5 / 2', mode)).toBe('2.5');
        });

        it('should correctly calculate modulo', () => {
            expect(evaluate('10 % 3', mode)).toBe('1');
        });
    });

    describe('Scientific Functions', () => {
        it('should calculate sin(30) in DEG mode', () => {
            const result = evaluate('sin(30)', 'DEG');
            expect(parseFloat(result)).toBeCloseTo(0.5, 5);
        });

        it('should calculate sin(pi/6) in RAD mode', () => {
            const result = evaluate('sin(pi/6)', 'RAD');
            expect(parseFloat(result)).toBeCloseTo(0.5, 5);
        });

        it('should calculate cos(0) in RAD mode', () => {
            expect(evaluate('cos(0)', 'RAD')).toBe('1');
        });

        it('should calculate square root', () => {
            expect(evaluate('sqrt(16)', 'DEG')).toBe('4');
        });

        it('should calculate power', () => {
            expect(evaluate('2^3', 'DEG')).toBe('8');
        });

        it('should calculate inverse', () => {
            expect(evaluate('1/4', 'DEG')).toBe('0.25');
        });

        it('should calculate log and ln', () => {
            expect(evaluate('log(100)', 'DEG')).toBe('2');
            const lnResult = evaluate('ln(e)', 'DEG');
            expect(parseFloat(lnResult)).toBeCloseTo(1, 5);
        });

        // Inverse Trig Tests
        it('should calculate asin(0.5) in DEG mode', () => {
            const result = evaluate('asin(0.5)', 'DEG');
            // asin(0.5) should be 30 degrees
            expect(parseFloat(result)).toBeCloseTo(30, 5);
        });

        it('should calculate acos(0.5) in DEG mode', () => {
            const result = evaluate('acos(0.5)', 'DEG');
            // acos(0.5) should be 60 degrees
            expect(parseFloat(result)).toBeCloseTo(60, 5);
        });
    });

    describe('Error Handling', () => {
        it('should return Error for invalid input', () => {
            expect(evaluate('2 + * 3', 'DEG')).toBe('Error');
        });
    });
});
