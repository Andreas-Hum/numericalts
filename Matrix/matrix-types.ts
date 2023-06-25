export type {
    Matrix
}

interface Matrix {
    //Shape type
    shape: string

    //Dimensions
    rows: number
    columns: number

    //properties
    size: number

    //element Data
    elements: number[] | number[][] | null
}
