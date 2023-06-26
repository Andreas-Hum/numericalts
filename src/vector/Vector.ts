
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
export class Vector implements VectorTypes {
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

        if (!Array.isArray(elements)) {
            throw new VectorError('Elements input must be an array.', 601);
        }

        this.elements = elements;
        this.size = elements.length;
        this.validateVector();

    }

    /**
    * Validates the Vector dimensions and shape.
    * @private
    * @returns {void}
    */
    private validateVector(): void {

        if ((this.elements as number[][]).every((e: number[]) => Array.isArray(e))) {
            this.isColumn = true;
            this.isRow = false;

            const invalidDimensionIndex = this.elements.findIndex((element: any) => Array.isArray(element) && element.length > 1);
            const levelDimentionFailure = this.elements.flat().findIndex((element: any) => Array.isArray(element))
            if (invalidDimensionIndex !== -1) {
                throw new VectorError(`Dimensions of entries cannot be greater than 1. Invalid entry found at ${invalidDimensionIndex}.`, 601, { invalidEntry: this.elements[invalidDimensionIndex] });
            } else if (levelDimentionFailure !== -1) {
                throw new VectorError(`The depth of entries cannot be greater than 1. Invalid entry found at ${levelDimentionFailure}.`, 601, { invalidEntry: this.elements[levelDimentionFailure] })
            }
        } else if ((this.elements as number[]).every((e: number) => !Array.isArray(e))) {
            this.isColumn = false;
            this.isRow = true;

        } else {
            throw new VectorError("Entry missmatch, got columns and row entries", 601, this.elements)
        }

        this.updateDimensions();
        this.updateShape();

    }

    /**
    * Updates the dimensions of the Vector.
    * @private
    * @returns {void}
    */
    private updateDimensions(): void {

        if (this.isRow) {
            this.columns = this.size;
            this.rows = 1;
        } else if (this.isColumn) {
            this.rows = this.size;
            this.columns = 1;
        } else {
            throw new VectorError("Vector must be either a row vector or a column vector.", 602);
        }

    }

    /**
    * Updates the shape of the Vector.
    * @private
    * @returns {void}
    */
    private updateShape(): void {
        this.shape = `(${this.rows},${this.columns})`;
    }

    /**
    * Adds an element to the Vector.
    * @public
    * @param {number | number[]} element - The element to be added.
    * @returns {void}
    */
    public addElement(element: number | number[]): void {

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

    }

    /**
    * Adds multiple elements to the Vector.
    * @public
    * @param {number | number[] | (number | number[])[]} elements - The elements to be added.
    * @returns {void}
    */
    public addElements(elements: number | number[] | (number | number[])[]): void {

        if (typeof elements === 'number' || (Array.isArray(elements) && elements.length === 1 && typeof elements[0] === 'number')) {
            elements = [elements as number];
        }

        if (Array.isArray(elements) && (this.elements as number[][]).every((e: number[]) => Array.isArray(e))) {
            elements = (elements as any[]).flat();
        }

        (elements as any[]).forEach(element => {
            this.addElement(element);
        });

        this.validateVector();


    }



    /**
     *
     *
     * VECTOR OPERATIONS
     *
     *
     */

    /**
  * Add vectors (or arrays of numbers) together. This function can be used with multiple inputs and supports both row and column vectors.
  * @param {...(Vector | number[] | number[][])} vectors - The vectors (or arrays) to add.
  * @throws {VectorError} If the dimensions of the vectors don't match.
  * @returns {void}
  */
    public add(...vectors: (Vector | number[] | number[][])[]): void {
        for (let vector of vectors) {
            if (!(vector instanceof Vector)) {
                vector = new Vector(vector)
            }

            if (this.shape !== vector.shape) {
                throw new VectorError(`Dimension mismatch: can't add a ${this.shape} vector to a ${vector.shape} vector`,
                    701,
                    { vectorOne_shape: this.shape, vectorTwo_shape: vector.shape })
            }

            let vector_one_copy: number[] = this.elements.flat()
            let vector_two_copy: number[] = vector.elements.flat()

            if (this.isColumn) {
                for (let i = 0; i < this.size; i++) {
                    this.elements[i] = [vector_one_copy[i] + vector_two_copy[i]]
                }
            } else {
                for (let i = 0; i < this.size; i++) {
                    this.elements[i] = vector_one_copy[i] + vector_two_copy[i]
                }
            }

            this.validateVector()
        }
    }


    /**
    * Subtract vectors (or arrays of numbers) together. This function can be used with multiple inputs and supports both row and column vectors.
    * @param {...(Vector | number[] | number[][])} vectors - The vectors (or arrays) to subract.
    * @throws {VectorError} If the dimensions of the vectors don't match.
    * @returns {void}
    */
    public subtract(...vectors: (Vector | number[] | number[][])[]): void {
        for (let vector of vectors) {
            if (!(vector instanceof Vector)) {
                vector = new Vector(vector)
            }

            if (this.shape !== vector.shape) {
                throw new VectorError(`Dimension mismatch: can't subtract a ${this.shape} vector to a ${vector.shape} vector`,
                    701,
                    { vectorOne_shape: this.shape, vectorTwo_shape: vector.shape })
            }

            let vector_one_copy: number[] = this.elements.flat()
            let vector_two_copy: number[] = vector.elements.flat()

            if (this.isColumn) {
                for (let i = 0; i < this.size; i++) {
                    this.elements[i] = [vector_one_copy[i] - vector_two_copy[i]]
                }
            } else {
                for (let i = 0; i < this.size; i++) {
                    this.elements[i] = vector_one_copy[i] - vector_two_copy[i]
                }
            }

            this.validateVector()
        }
    }


    /**
     * Scales the vector by the provided scalar.
     * This modifies the original vector.
     * @param {number} scalar - The scalar to multiply the vector by.
     * @throws {VectorError} If the scalar is not a number.
     */
    public scale(scalar: number): void {
        if (typeof scalar !== "number") {
            throw new VectorError("Invalid Scalar for Vector Multiplication Error", 702, { invalidScalar: scalar })
        }

        if (this.isColumn) {
            this.elements = (this.elements as number[][]).map((entry: number[]) => [entry[0] * scalar])
        } else {
            this.elements = (this.elements as number[]).map((entry: number) => entry * scalar)
        }


    }


    /**
     * Normalizes the vector (i.e. scale the vector to unit length).
     * This modifies the original vector.
     * @throws {VectorError} If the vector magnitude or norm is zero.
     */
    public normalize(): void {
        const norm = this.norm();
        if (norm === 0) {
            throw new VectorError("Cannot normalize a zero vector.", 704)
        }
        this.scale(1 / norm);
    }




    /**
     * Returns the norm (magnitude) of the vector.
     * @returns {number} the norm (magnitude) or length of the vector.
     */
    public norm(): number {
        return Math.hypot(...this.elements.flat())
    }


    /**
     * Computes the dot (inner) product with another vector.
     * @param vector - The other vector, which can be an instance of Vector, a number array, or a 2D number array.
     * @returns {number} - The dot product of this vector and the given vector.
     * @throws {VectorError} If the given vector is not of the same size as this vector.
     */
    public dot(vector: Vector | number[] | number[][]): number {
        if (!(vector instanceof Vector)) {
            vector = new Vector(vector)
        }

        if (this.size !== vector.size) {
            throw new VectorError(`Dimension mismatch: Sizes does not match`,
                703,
                { vectorOne_size: this.size, vectorTwo_size: vector.size })
        }

        let vector_one_copy: number[] = this.elements.flat()
        let vector_two_copy: number[] = vector.elements.flat()
        let result: number = 0;

        for (let i = 0; i < vector.size; i++) {
            result += vector_one_copy[i] * vector_two_copy[i]
        }

        return result;
    }





}
