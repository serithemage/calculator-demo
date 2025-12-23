import { describe, it, expect } from 'vitest';

describe('Smoke Test', () => {
    it('should pass basic arithmetic', () => {
        expect(1 + 1).toBe(2);
    });

    it('should have mathjs installed', async () => {
        const { create, all } = await import('mathjs');
        const math = create(all);
        expect(math.evaluate('2 + 3')).toBe(5);
    });
});
