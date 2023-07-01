import { Vector } from "../vector/Vector"


export enum MTypes {
    square,
    tall,
    wide
}
export interface MatrixTypes {
    //Shape type
    shape: string
    isColumnMatrix: boolean
    isRowMatrix: boolean
    isSquare: boolean
    isTall: boolean
    isWide: boolean


    //Dimensions
    rows: number
    columns: number

    //properties
    size: number

    //element Data
    mElements: Vector[]
}
