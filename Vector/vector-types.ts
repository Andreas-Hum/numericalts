export type {
    Vector
}


interface Vector {
    //Shape type
    shape: string

    //Column or row
    rows: number
    columns: number

    //properties
    norm: number
    size: number

    //element Data
    elements: number[] | number[][]
}
