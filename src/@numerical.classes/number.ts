import { Numerical } from "../@interfaces";

export class NumericalNumber implements Numerical<number> {
    zeroValue: number = 0;
    oneValue: number = 1;

    add = (x: number, y: number): number => x + y;
    subtract = (x: number, y: number): number => x - y;
    multiply = (x: number, y: number): number => x * y;
    divide = (x: number, y: number): number => x / y;
    sqrt = (x: number): number => Math.sqrt(x);

    fromIntegral(n: number): number {
        return n;
    }


    signOperator(x: number): number {
        return Math.sign(x);
    }

    toIntegral(n: number): number {
        return n;
    }
}
