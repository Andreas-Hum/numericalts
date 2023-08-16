
export interface Numerical<C> {
    zeroValue: C;
    oneValue: C;
    add(x: C, y: C): C;
    subtract(x: C, y: C): C;
    multiply(x: C, y: C): C;
    divide(x: C, y: C): C;
    sqrt(x: C): C;
    fromIntegral(n: number): C;
    toIntegral(n: C): number;
    toString(n:C): string;
    signOperator(x: C): number;
}


