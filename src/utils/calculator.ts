import { create, all } from 'mathjs';

// Define AngleMode type here to avoid circular dependency
export type AngleMode = 'DEG' | 'RAD';

const math = create(all);

export const evaluate = (expression: string, angleMode: AngleMode = 'DEG'): string => {
    try {
        // Basic scope overrides for standard calculator behavior
        let scope: any = {
            log: math.log10, // log button usually means base 10
            ln: math.log     // ln button means base e (natural log)
        };

        if (angleMode === 'DEG') {
            scope = {
                ...scope,
                // Trigonometric input conversion (Degree -> Radian for calculation)
                sin: (x: number) => math.sin(math.unit(x, 'deg')),
                cos: (x: number) => math.cos(math.unit(x, 'deg')),
                tan: (x: number) => math.tan(math.unit(x, 'deg')),

                // Inverse Trigonometric output conversion (Radian -> Degree for result)
                asin: (x: number) => math.unit(math.asin(x), 'rad').toNumber('deg'),
                acos: (x: number) => math.unit(math.acos(x), 'rad').toNumber('deg'),
                atan: (x: number) => math.unit(math.atan(x), 'rad').toNumber('deg'),
            };
        }

        const result = math.evaluate(expression, scope);

        if (typeof result === 'number') {
            return result.toString();
        }

        return result.toString();
    } catch (error) {
        return 'Error';
    }
};
