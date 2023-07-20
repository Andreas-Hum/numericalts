import { Numerical } from "../@interfaces/numerical";
import { math } from "../math"


export class FractionalNumberClass implements Numerical<string> {
    // Custom mapping for fractions as strings
    private customMapping: Record<string, number> = {};

    zeroValue: string = "0/1";
    oneValue: string = "1/1";

    add(x: string, y: string): string {
        const [xNum, xDenom] = x.split('/').map(Number);
        const [yNum, yDenom] = y.split('/').map(Number);

        const resultNum = xNum * yDenom + yNum * xDenom;
        const resultDenom = xDenom * yDenom;

        const gcd = this.gcd(resultNum, resultDenom);
        const simplifiedNum = resultNum / gcd;
        const simplifiedDenom = resultDenom / gcd;

        return `${simplifiedNum}/${simplifiedDenom}`;
    }

    subtract(x: string, y: string): string {
        const [xNum, xDenom] = x.split('/').map(Number);
        const [yNum, yDenom] = y.split('/').map(Number);

        const resultNum = xNum * yDenom - yNum * xDenom;
        const resultDenom = xDenom * yDenom;

        const gcd = this.gcd(resultNum, resultDenom);
        const simplifiedNum = resultNum / gcd;
        const simplifiedDenom = resultDenom / gcd;

        return `${simplifiedNum}/${simplifiedDenom}`;
    }

    multiply(x: string, y: string): string {
        const [xNum, xDenom] = x.split('/').map(Number);
        const [yNum, yDenom] = y.split('/').map(Number);

        const resultNum = xNum * yNum;
        const resultDenom = xDenom * yDenom;

        const gcd = this.gcd(resultNum, resultDenom);
        const simplifiedNum = resultNum / gcd;
        const simplifiedDenom = resultDenom / gcd;

        return `${simplifiedNum}/${simplifiedDenom}`;
    }

    divide(x: string, y: string): string {
        const [xNum, xDenom] = x.split('/').map(Number);
        const [yNum, yDenom] = y.split('/').map(Number);

        // Check for division by zero
        if (yNum === 0) {
            throw new Error("Division by zero is not allowed.");
        }

        const resultNum = xNum * yDenom;
        const resultDenom = xDenom * yNum;

        const gcd = this.gcd(resultNum, resultDenom);
        const simplifiedNum = resultNum / gcd;
        const simplifiedDenom = resultDenom / gcd;

        return `${simplifiedNum}/${simplifiedDenom}`;
    }

    sqrt(x: string): string {
        // Handle zeroValue and oneValue cases
        if (x === this.zeroValue || x === this.oneValue) {
            return x;
        }

        // Convert the string representation to the numerator and denominator
        const [num, denom] = x.split('/').map(Number);

        // Calculate the square root of the numerator and denominator
        const sqrtNum = Math.sqrt(num);
        const sqrtDenom = Math.sqrt(denom);

        // Find the greatest common divisor and simplify the result
        const gcd = this.gcd(sqrtNum, sqrtDenom);
        const simplifiedNum = sqrtNum / gcd;
        const simplifiedDenom = sqrtDenom / gcd;

        return `${simplifiedNum}/${simplifiedDenom}`;
    }

    fromNumber(n: number): string {
        // Convert the number to a fraction with denominator 1
        return `${n}/1`;
    }

    toNumber(n: string): number {
        // Convert the fraction to a numeric value
        const [num, denom] = n.split('/').map(Number);
        return num / denom;
    }

    signOperator(x: string): number {
        // Compare `x` with `zeroValue`
        const [num, denom] = x.split('/').map(Number);
        const value = num / denom;

        if (value < 0) return -1;
        if (value === 0) return 0;
        return 1; // value > 0
    }

    private gcd(a: number, b: number): number {
        return math.GCD(a, b)
    }
}
