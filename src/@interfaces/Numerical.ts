export interface Numerical<T> {
    zeroValue: T;
    add(x: T, y: T): T;
    subtract(x: T, y: T): T;
    multiply?(x: T, y: T): T;
    divide?(x: T, y: T): T;
    sqrt?(x: T, y: T): T;
}