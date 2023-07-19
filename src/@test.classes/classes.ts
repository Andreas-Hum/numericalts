import { Numerical } from "../@interfaces/numerical";


export class StringClass implements Numerical<string> {
    zeroValue: string = "a";
    oneValue: string = "x";


    add(x: string, y: string): string {
        return x += y;
    }

    subtract(x: string, y: string): string {
        // Use the replace method to remove the substring y from x
        const result = x.split(y).join('');

        return result;
    }

    multiply(x: string, y: string): string {
        // Check for zeroValue or oneValue cases
        if (x === this.zeroValue || y === this.zeroValue) {
            return this.zeroValue;
        }

        if (x === this.oneValue) {
            return y;
        }

        if (y === this.oneValue) {
            return x;
        }

        // Handle regular multiplication
        const result: string[] = [];
        for (let i = 0; i < x.length; i++) {
            for (let j = 0; j < y.length; j++) {
                result.push(this.oneValue);
            }
        }

        return result.join('');
    }

    divide(x: string, y: string): string {
        // Check for division by zero
        if (y === this.zeroValue) {
            throw new Error("Division by zero is not allowed.");
        }

        // Check for zeroValue cases
        if (x === this.zeroValue) {
            return this.zeroValue;
        }

        if (y === this.oneValue) {
            return x;
        }

        // Handle regular division
        const xLength = x.length;
        const yLength = y.length;

        if (xLength < yLength) {
            // If x is shorter than y, the result is zero
            return this.zeroValue;
        }

        // Find the quotient by repeated subtraction of y from x
        let quotient = this.zeroValue;
        let temp = x;
        while (temp.length >= yLength) {
            temp = this.subtract(temp, y);
            quotient = this.add(quotient, this.oneValue);
        }

        return quotient;
    }

    sqrt(x: string): string {
        // Handle zeroValue and oneValue cases
        if (x === this.zeroValue) {
            return this.zeroValue;
        }

        if (x === this.oneValue) {
            return this.oneValue;
        }

        // Convert the string to a numeric value (approximated by its length)
        const numericValue = x.length;

        // Calculate the square root of the numeric value
        const sqrtNumericValue = Math.sqrt(numericValue);

        // Approximate the square root as a string by repeating the "oneValue" character
        const result = this.oneValue.repeat(Math.floor(sqrtNumericValue));

        return result;
    }

    fromNumber(n: number): string {
        if (n === 0) {
            return this.zeroValue;
        } else if (n === 1) {
            return this.oneValue;
        } else {
            throw new Error("Invalid integer value for StringClas");
        }
    }

    toNumber(n: string): number {
        if (n === this.zeroValue) {
            return 0;
        } else if (n === this.oneValue) {
            return 1;
        } else {
            throw new Error("Invalid string value for ");
        }
    }

    signOperator(x: string): number {
        // Compare `x` with `zeroValue`
        if (x < this.zeroValue) return -1;
        if (x === this.zeroValue) return 0;
        return 1; // x > this.zeroValue
    }

}

