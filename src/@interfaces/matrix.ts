
import Matrix from "../matrix";


export interface MatrixTypes<T> {

    shape: string;
    isSquare: boolean;
    isTall: boolean;
    isWide: boolean;

    rows: number;
    columns: number;
    size: number;
    mElements: Array<T>;

    dataType: string

    add(B: Matrix<number>): Matrix<number>
    multiply(B: Matrix<number>): Matrix<number>
    pow(exp: number): Matrix<number>
    scale(scalar: number): Matrix<number>
    subtract(B: Matrix<number>): Matrix<number>
    vMultiply(vector: number[]): Matrix<number>
    backSubstitution(b: number[]): number[]
    forwardSubstitution(b: number[]): number[]
    gaussianElimination(options: { solve?: boolean }): Matrix<number> | number[]
    gaussJordan(options: { solve?: boolean }): Matrix<number> | number[]
    QRDecomposition(): { Q: Matrix<number>, R: Matrix<number> }
    invertSquare(): Matrix<number>
    invertUpper(): Matrix<number>
    invertLower(): Matrix<number>
    augment(B: Matrix<T>): Matrix<T>
    gramSmith(): Matrix<number>
    print(): void
    toArray(): T[][]
    transpose(): Matrix<T>
    toString(): string

}
