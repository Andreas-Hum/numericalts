
export interface Numerical<T> {
    zeroValue: T;
    oneValue: T;
    add(x: T, y: T): T;
    subtract(x: T, y: T): T;
    multiply(x: T, y: T): T;
    divide(x: T, y: T): T;
    sqrt(x: T): T;
    fromIntegral(n: number): T;
    toIntegral(n: T): number;
    toString(n:T): string;
    signOperator(x: T): number;
}


