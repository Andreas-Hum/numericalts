import { math } from "../math";
import { Numerical } from "../@interfaces";

export class NumericalBigInt implements Numerical<bigint> {
    zeroValue: bigint = BigInt(0);
    oneValue: bigint = BigInt(1);

    add = (x: bigint, y: bigint): bigint => x + y;
    subtract = (x: bigint, y: bigint): bigint => x - y;
    multiply = (x: bigint, y: bigint): bigint => x * y;
    divide = (x: bigint, y: bigint): bigint => x / y;
    sqrt = (x: bigint): bigint => math.BigSqrt(x)

    fromIntegral (n: number): bigint {
        return BigInt(n);
    }
    signOperator(x: bigint): number {
        return x >= BigInt(0) ? 1 : -1;
    }
     
    toIntegral (n: bigint): number {
        return Number(n);
    }
}
