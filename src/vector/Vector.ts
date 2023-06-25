
// Type imports
import type VectorTypes from "./VectorTypes";

// Importing a custom Error class dedicated for errors related to Vectors
import VectorError from "../errors/VectorError";


/**
* A class that represents a mathemathical Vector.
* @exports Vector
* @class
* @implements {VectorType}
*/
export default class Vector implements VectorTypes {
    //Setting up default information
    public shape: string = "0";
    public isRow: boolean = false;
    public isColumn: boolean = false;
    public rows: number = Infinity;
    public columns: number = Infinity;
    public size: number = Infinity;
    public elements!: number[] | number[][];

    /**
    * Creates an instance of a Vector.
    * @param {number[] | number[][]} elements - The elements of the Vector.
    */
    constructor(elements: number[] | number[][]) {
        try {
            this.elements = elements;
            this.size = elements.length;
            this.validateVector();
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
    * Validates the Vector dimensions and shape.
    * @private
    * @returns {void}
    */
    private validateVector(): void {
        try {
            if (Array.isArray(this.elements[0])) {
                this.isColumn = true;
                this.isRow = false;

                const invalidDimensionIndex = this.elements.findIndex((element: any) => Array.isArray(element) && element.length > 1);

                if (invalidDimensionIndex !== -1) {
                    throw new VectorError(`Dimensions of entries cannot be greater than 1. Invalid entry found at ${invalidDimensionIndex}.`, 601);
                }
            } else {
                this.isColumn = false;
                this.isRow = true;
            }

            this.updateDimensions();
            this.updateShape();
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
    * Updates the dimensions of the Vector.
    * @private
    * @returns {void}
    */
    private updateDimensions(): void {
        try {
            if (this.isRow) {
                this.rows = this.size;
                this.columns = 1;
            } else if (this.isColumn) {
                this.columns = this.size;
                this.rows = 1;
            } else {
                throw new VectorError("Vector must be either a row vector or a column vector.", 602);
            }
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
    * Updates the shape of the Vector.
    * @private
    * @returns {void}
    */
    private updateShape(): void {
        try {
            this.shape = `(${this.rows},${this.columns})`;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
    * Adds an element to the Vector.
    * @public
    * @param {number | number[]} element - The element to be added.
    * @returns {void}
    */
    public addElement(element: number | number[]): void {
        try {
            if (this.isRow && typeof element === 'number') {
                (this.elements as number[]).push(element);
            } else if (this.isColumn && typeof element === 'number') {
                (this.elements as number[][]).push([element]);
            } else if (this.isColumn && Array.isArray(element) && element.length === 1) {
                (this.elements as number[][]).push(element);
            } else {
                throw new VectorError('Invalid element for the vector', 603, { invalidElement: element });
            }

            this.size++;
            this.validateVector();
        } catch (error) {
            console.error(error);
            return;
        }
    }

    /**
    * Adds multiple elements to the Vector.
    * @public
    * @param {number | number[] | (number | number[])[]} elements - The elements to be added.
    * @returns {void}
    */
    public addElements(elements: number | number[] | (number | number[])[]): void {
        try {
            if (typeof elements === 'number' || (Array.isArray(elements) && elements.length === 1 && typeof elements[0] === 'number')) {
                elements = [elements as number];
            }

            if (Array.isArray(elements) && Array.isArray(elements[0])) {
                elements = (elements as any[]).flat();
            }

            (elements as any[]).forEach(element => {
                this.addElement(element);
            });

            this.validateVector();
        } catch (error) {
            console.error(error);
            return;
        }
    }
}
