import { math } from "../math"



export interface Numerical<T> {
    zeroValue: T;
    oneValue: T;
    add(x: T, y: T): T;
    subtract(x: T, y: T): T;
    multiply(x: T, y: T): T;
    divide(x: T, y: T): T;
    sqrt(x: T): T;
    fromNumber(n: number): T;
    toNumber(n: T): number
    signOperator(x: T): number;
}


export class NumericalNumber implements Numerical<number> {
    zeroValue: number = 0;
    oneValue: number = 1;

    add = (x: number, y: number): number => x + y;
    subtract = (x: number, y: number): number => x - y;
    multiply = (x: number, y: number): number => x * y;
    divide = (x: number, y: number): number => x / y;
    sqrt = (x: number): number => Math.sqrt(x);

    fromNumber(n: number): number {
        return n;
    }


    signOperator(x: number): number {
        return Math.sign(x);
    }

    toNumber(n: number): number {
        return n;
    }
}

export class NumericalBigInt implements Numerical<bigint> {
    zeroValue: bigint = BigInt(0);
    oneValue: bigint = BigInt(1);

    add = (x: bigint, y: bigint): bigint => x + y;
    subtract = (x: bigint, y: bigint): bigint => x - y;
    multiply = (x: bigint, y: bigint): bigint => x * y;
    divide = (x: bigint, y: bigint): bigint => x / y;
    sqrt = (x: bigint): bigint => math.BigSqrt(x)

    fromNumber(n: number): bigint {
        return BigInt(n);
    }
    signOperator(x: bigint): number {
        return x >= BigInt(0) ? 1 : -1;
    }

    toNumber(n: bigint): number {
        return Number(n);
    }
}
