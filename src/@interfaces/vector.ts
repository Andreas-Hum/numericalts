


export interface VectorTypes {
    //Shape type
    shape: string

    //Column or row
    isRowVector: boolean
    isColumnVector: boolean
    rows: number
    columns: number

    //properties
    size: number

    //element Data
    vElements: number[] | number[][]
}
