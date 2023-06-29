import { Vector } from "../vector/Vector"


export enum MTypes {
    square,
    tall,
    wide
}
export interface MatrixTypes {
    //Shape type
    shape: string
    Mtype: MTypes
    isColumnMatrix: boolean
    isRowMatrix: boolean


    //Dimensions
    rows: number
    columns: number

    //properties
    size: number

    //element Data
    elements: Vector[]
}
