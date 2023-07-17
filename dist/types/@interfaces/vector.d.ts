export interface VectorTypes {
    shape: string;
    isRowVector: boolean;
    isColumnVector: boolean;
    rows: number;
    columns: number;
    size: number;
    vElements: number[] | number[][];
}
