

export default interface VectorTypes {
    //Shape type
    shape: string

    //Column or row
    isRow: boolean
    isColumn: boolean
    rows: number
    columns: number

    //properties
    size: number

    //element Data
    elements: number[] | number[][]
}
