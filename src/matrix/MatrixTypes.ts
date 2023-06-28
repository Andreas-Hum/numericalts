import { Vector } from "../vector/Vector"

export default interface Matrix {
    //Shape type
    shape: string
    type: string

    //Dimensions
    rows: number
    columns: number

    //properties
    size: number

    //element Data
    elements: Vector[]
}
