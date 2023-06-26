//Type imports
import type MatrixTypes from "./MatrixTypes";

//Error import
import MatrixError from "../errors/MatrixError";

//Vector import
import { Vector } from "../vector/Vector";


export class Matrix implements MatrixTypes {
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

    /**
 * Constructs a matrix object.
 * @class
 * @constructor
 * @param {number[][]} elements - The elements of the matrix.
 */
    constructor(elements: number[][]) {
        this.elements = elements
        this.rows = this.elements.length
        this.validateMatrix()
        this.updateShape()
    }

    /**
     * Validates the dimensions of the matrix.
     * @private
     * @returns {void}
     */
    private validateMatrix(): void {
        if (!this.validDimentions()) {
            throw new MatrixError("Error, missing columns")
        }
    }

    /**
     * Checks if the matrix has valid dimensions.
     * @private
     * @returns {boolean} - True if the dimensions are valid, false otherwise.
     */
    private validDimentions(): boolean {
        if (this.rows === 1) {
            this.columns = this.elements[0].length
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

    /**
     * Sets the shape of the matrix.
     * @private
     * @returns {void}
     */
    private updateShape(): void {
        this.shape = `(${this.rows},${this.columns})`
    }
}
