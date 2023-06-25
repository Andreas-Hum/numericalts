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
     * Number of entries in the matrix.
     * @type {number}
     */
    public size: number = Infinity;

    /**
     * Element data of the vector.
     * @type {number[] | number[][]}
     *
     */
    public elements: number[][]

    constructor(elements: number[][]) {
        this.elements = elements
        this.rows = this.elements.length

    }

    private ValidateMatrix(): void {
        if (!this.ValidDimentions()) {
            throw new MatrixError("Error, missing columns")
        }

    }

    private ValidDimentions(): boolean {
        if (!this.elements.some(Array.isArray)) {
            return true;
        }


        const first_sub_vector: number = this.elements[0].length;
        let amount_of_entries: number = first_sub_vector;

        for (let i = 1; i < this.rows; i++) {
            let current_sub_vector: number = this.elements[i].length
            if (first_sub_vector !== current_sub_vector) {
                return false;
            }
            amount_of_entries += current_sub_vector
        }

        this.size = amount_of_entries;
        this.columns = amount_of_entries / this.rows
        return true;

    }

    private SetShape() {
        this.shape = `(${this.rows},${this.columns})`
    }

}