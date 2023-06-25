//Type imports
import type { Vector as VectorType } from "./vector-types";

//Error import
import { VectorError } from "../Errors/validation-error";


/**
 * Vector class representing a mathematical vector.
 * @class
 * @implements {VectorType}
 */
class Vector implements VectorType {
    /**
     * Shape of the vector, represented as a string.
     * @type {string}
     */
    public shape: string = "0";

    /**
     * Indicates if the vector is a row vector.
     * @type {boolean}
     */
    public isRow: boolean = false;

    /**
     * Indicates if the vector is a column vector.
     * @type {boolean}
     */
    public isColumn: boolean = false;

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
    public elements: number[] | number[][]


    /**
       * Creates a new Vector instance.
       * @constructor
       * @param {number[] | number[][]} elements - Elements of the vector.
       */
    constructor(elements: number[] | number[][]) {
        this.elements = elements;
        this.size = elements.length;
        this.ValidateVector()


    }


    /**
       * Validates the vector, updating its properties accordingly.
       * @private
       */
    private ValidateVector(): void {
        if (Array.isArray(this.elements[0])) {
            this.isColumn = true;
            this.isRow = false;
        } else {
            this.isColumn = false;
            this.isRow = true;
        }

        this.ChangeRowsToColumns();
        this.ChangeSize(this.rows, this.columns)
    }



    //
    // CHANGEING PROPERTIES
    //

    /**
     * Changes the size property of the vector.
     * @private
     * @param {number} rows - The number of rows.
     * @param {number} columns - The number of columns.
     */
    private ChangeSize(rows: number, columns: number): void {
        this.shape = `(${rows},${columns})`
    }


    /**
      * Changes the rows and columns properties of the vector.
      * @private
      */
    private ChangeRowsToColumns(): void {
        let rows = Infinity, columns = Infinity;

        if (this.isRow) { //Row vector
            rows = this.size;
            columns = 1;
        } else if (this.isColumn) { //Column vector
            columns = this.size;
            rows = 1
        } else {
            throw new VectorError("Error changeing rows and columns?")
        }

        this.rows = rows;
        this.columns = columns;

    }


    //Validating the vector DEPRICATED
    // private ValidateVector(): void {
    //     let column_elements = 0

    //     //Validates that the vector is either a column or row vector
    //     for (let i = 0; i < this.size; i++) {
    //         if (Array.isArray(this.elements[i])) {
    //             column_elements++;
    //         }
    //     }

    //     if (column_elements > 0 && column_elements !== this.size) {
    //         throw new VectorError("The vector should either be a column or row vector")
    //     } else if (column_elements === this.size) { //Column vector
    //         //Checks if the dimentions of entrys are 1 if the list
    //         const dimention_test: number = this.elements.findIndex((entry: number[]) => entry.length > 0)

    //         if (dimention_test !== -1) {
    //             throw new VectorError(`Dimentions of entries can't be greater than 1: At entry ${this.elements[dimention_test]}`);
    //         }

    //         //Change the type to column;
    //         this.isColumn = true;
    //         this.isRow = false;

    //     } else { //Row vector
    //         this.isColumn = false;
    //         this.isRow = true;
    //     }

    //     this.ChangeRowsColumns();
    //     this.ChangeSize(this.rows, this.columns)
    // }
}

