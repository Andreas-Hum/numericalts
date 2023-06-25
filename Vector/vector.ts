//Type imports
import type { Vector as VectorType } from "./vector-types";

//Error import
import { VectorError } from "../Errors/vector-error";


/**
 * Vector class representing a mathematical vector.
 * @class
 * @implements {VectorType}
 */
export default class Vector implements VectorType {
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
            const dimention_test: number = this.elements.findIndex((entry: any) => entry.length > 1)
            if (dimention_test !== -1) {
                throw new VectorError(`Dimentions of entries can't be greater than 1: At entry ${this.elements[dimention_test]}`);
            }
        } else {
            this.isColumn = false;
            this.isRow = true;
        }

        this.ChangeRowsToColumns();
        this.SetShape()
    }



    //
    // CHANGEING PROPERTIES
    //

    /**
     * Sets the shape property of the vector.
     * @private
     */
    private SetShape(): void {
        this.shape = `(${this.rows},${this.columns})`
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


    //
    // ADDING ELEMENTS
    //

    /**
  * Adds an element to the vector.
  * @public
  * @param {number|number[]} element - The element to be added.
  */
    public addElement(element: number | number[]): void {
        if (this.isRow && typeof element === 'number') {
            // Add to a row vector.
            (this.elements as number[]).push(element);
        } else if (this.isColumn && typeof element === 'number') {
            // Add to a column vector.
            // The element is a number, so we wrap it in an array to make it a single-element array.
            (this.elements as number[][]).push([element]);
        } else if (this.isColumn && Array.isArray(element) && element.length === 1) {
            // Add to a column vector.
            (this.elements as number[][]).push(element);
        } else {
            throw new VectorError('Invalid element for the vector');
        }

        // Update the size of the vector.
        this.size++;

        // Update the vector's properties
        this.ValidateVector();
    }



    /**
     * Adds multiple elements to the vector.
     * @public
     * @param {...(number|number[])} elements - The elements to be added.
     */
    public addElements(elements: number | number[] | (number | number[])[]): void {
        // If it's a single number or single-element array, convert it to an array
        if (typeof elements === 'number' ||
            (Array.isArray(elements) && elements.length === 1 && typeof elements[0] === 'number')) {
            elements = [elements as number];
        }

        // If it's a multidimensional array, flatten the array
        if (Array.isArray(elements) && Array.isArray(elements[0])) {
            elements = (elements as any[]).flat();
        }

        (elements as any[]).forEach(element => {
            this.addElement(element);
        });

        // Update the vector's properties
        this.ValidateVector();
    }




}

