//Type imports
import type { Matrix as MatrixType } from "./matrix-types";

//Error import
import { MatrixError } from "../Errors/matrix-error";

//Vector import
import Vector from "../Vector/vector";


export default class Matrix implements MatrixType {
    /**
    * Shape of the vector, represented as a string.
    * @type {string}
    */
    public shape: string = "0";

    /**
     * Number of rows in the vector.
     * @type {number}
     */
    public rows: number = Infinity;

    /**
     * Number of columns in the vector.
     * @type {number}
     */
    public columns: number = Infinity;

    /**
     * Size of the vector.
     * @type {number}
     */
    public size: number = Infinity;

    /**
     * Element data of the vector.
     * @type {number[] | number[][]}
     *
     */
    public elements: number[][] | number[][][]

    constructor(elements:number[][] | number[][]){
        this.elements = elements
    }
}