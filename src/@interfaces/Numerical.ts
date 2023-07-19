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
