
// Type imports
import type VectorTypes from "./VectorTypes";

// Importing a custom Error class dedicated for errors related to Vectors
import VectorError from "../errors/VectorError";

// Importing constants;
import { DELTA } from "../utils/constants";

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
        let invalidEntry: any;

        const validationVector: any[] = this.elements.flat()

        invalidEntry = validationVector.find((e: any) => typeof e !== "number")
        if (invalidEntry !== undefined) {
            throw new VectorError(`Invalid element for vector. Expected number, got: ${typeof invalidEntry}.`, 603, { invalidEntry: invalidEntry });
        } else if ((this.elements as number[][]).every((e: number[]) => Array.isArray(e))) {
            this.isColumn = true;
            this.isRow = false;

            const invalidDimensionIndex = this.elements.findIndex((element: any) => Array.isArray(element) && element.length > 1);
            const levelDimensionFailure = this.elements.flat().findIndex((element: any) => Array.isArray(element))
            if (invalidDimensionIndex !== -1) {
                throw new VectorError(`Dimensions of entries cannot be greater than 1. Invalid entry found at ${invalidDimensionIndex}.`, 601, { invalidEntry: this.elements[invalidDimensionIndex] });
            } else if (levelDimensionFailure !== -1) {
                throw new VectorError(`The depth of entries cannot be greater than 1. Invalid entry found at ${levelDimensionFailure}.`, 601, { invalidEntry: this.elements[levelDimensionFailure] })
            }
        } else if ((this.elements as number[]).every((e: number) => !Array.isArray(e))) {
            this.isColumn = false;
            this.isRow = true;
        } else {
            throw new VectorError("Entry mismatch, got columns and row entries", 601, this.elements)
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

    // /** DEPRICATED 
    // * Adds an element to the Vector.
    // * @public
    // * @param {number | number[]} element - The element to be added.
    // * @returns {void}
    // */
    // public addElement(element: number | number[]): void {

    //     if (this.isRow && typeof element === 'number') {
    //         (this.elements as number[]).push(element);
    //     } else if (this.isColumn && typeof element === 'number') {
    //         (this.elements as number[][]).push([element]);
    //     } else if (this.isColumn && Array.isArray(element) && element.length === 1) {
    //         (this.elements as number[][]).push(element);
    //     } else {
    //         throw new VectorError('Invalid element for the vector', 603, { invalidElement: element });
    //     }

    //     this.size++;
    //     this.validateVector();

    // }

    /**
    * Adds multiple elements to the Vector.
    * @public
    * @param {number | number[] | (number | number[])[]} elements - The elements to be added.
    * @returns {void}
    */
    public addElements(elementsToAdd: Vector | number[] | number[][], strict: boolean = false): void {
        if (!(elementsToAdd instanceof Vector)) {
            elementsToAdd = new Vector(elementsToAdd)
        }

        console.log(elementsToAdd)

        if (this.isColumn) {
            if (elementsToAdd.isColumn) {
                this.elements = (this.elements as number[][]).concat(elementsToAdd.elements)
            } else {
                if (strict) {
                    throw new VectorError(`Dimension mismatch: shapes does not match`,
                        703,
                        { vectorOne_shape: this.shape, vectorTwo_shape: elementsToAdd.shape });
                }
                //@ts-ignore
                this.elements = (this.elements as number[][]).concat(elementsToAdd.elements.map((e: number) => [e]))
            }

        } else {
            if (strict && elementsToAdd.isColumn) {
                throw new VectorError(`Dimension mismatch: shapes does not match`,
                    703,
                    { vectorOne_shape: this.shape, vectorTwo_shape: elementsToAdd.shape });
            } else if (elementsToAdd.isColumn) {
                //@ts-ignore
                this.elements = this.elements.concat(elementsToAdd.elements.flat())
            } else {
                //@ts-ignore
                this.elements = this.elements.concat(elementsToAdd.elements)
            }


        }
        this.size += elementsToAdd.size

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

            if (vector.size !== this.size) {
                throw new VectorError("Dimension mismatch: Sizes does not match", 602, { originalVector: this.size, errorVector: vector.size })
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

            if (vector.size !== this.size) {
                throw new VectorError("Dimension mismatch: Sizes does not match", 602, { originalVector: this.size, errorVector: vector.size })
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
     * Calculate the Euclidean norm of the vector.
     * @return {number} The Euclidean norm.
     */
    public euclNorm(): number {
        const array = this.elements.flat();
        return Math.sqrt(array.map(x => x ** 2).reduce((acc, x) => acc + x));
    }

    /**
    * Calculate the infinity norm of the vector. 
    * @return {number} The infinity norm (maximum absolute value).
    */
    public infNorm(): number {
        const array = this.elements.flat();
        return Math.max(...array.map(x => Math.abs(x)));
    }

    /**
    * Calculate the Manhattan norm of the vector.
    * @return {number} The Manhattan norm (sum of absolute values).
    */
    public manhNorm(): number {
        const array = this.elements.flat();
        return array.map(x => Math.abs(x)).reduce((acc, x) => acc + x);
    }


    /**
     * Normalizes the vector (i.e., scale the vector to unit length) using the specified norm type.
     * This modifies the original vector.
     * @param {string} type The type of norm to use for normalization. Defaults to "euclidean".
     * @throws {VectorError} If the vector norm is zero.
     */
    public normalize(type: "euclidean" | "infinity" | "manhattan" = "euclidean"): void {
        let norm;
        switch (type) {
            case "euclidean":
                norm = this.euclNorm();
                break;
            case "infinity":
                norm = this.infNorm();
                break;
            case "manhattan":
                norm = this.manhNorm();
                break;
            default:
                throw new VectorError(`Unknown norm type: ${type}`, 708, { type });
        }

        if (Math.abs(norm) < DELTA) {
            throw new VectorError("Cannot normalize a zero vector.", 704);
        }
        this.scale(1 / norm);
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

    /**
     * Cross product operation between the current vector and the provided vector.
     *
     * @param {Vector | number[] | number[][]} vector - The second vector to calculate the cross product with. It can be a Vector instance or a 2D/3D array.
     * @param {boolean} [columnVector=false] - Setting this to `true` will return the cross product as s column vector. Default is `false`.
     * @returns {void} - The function doesn't return a value, it mutates the `elements` property of the class with the result of the cross product.
     * @throws {VectorError} - Throws an error if the vectors aren't both 3D.
     */
    public cross(vector: Vector | number[] | number[][], columnVector: boolean = false): Vector {
        if (!(vector instanceof Vector)) {
            vector = new Vector(vector)
        }

        if (this.size !== 3 || vector.size !== 3) {
            throw new VectorError("Vectors should be 3-dimensional for the cross product", 707, { vectorOne_size: this.size, vectorTwo_size: vector.size })
        }

        let vector_one_copy: number[] = this.elements.flat()
        let vector_two_copy: number[] = vector.elements.flat()

        const first: number = vector_one_copy[1] * vector_two_copy[2] - vector_one_copy[2] * vector_two_copy[1];
        const second: number = vector_one_copy[2] * vector_two_copy[0] - vector_one_copy[0] * vector_two_copy[2];
        const third: number = vector_one_copy[0] * vector_two_copy[1] - vector_one_copy[1] * vector_two_copy[0];



        if (columnVector) {

            return new Vector([[first], [second], [third]])

        } else {

            return new Vector([first, second, third])

        }

    }


    /**
     * Computes the angle between this vector and another vector.
     * @param vector - The other vector, which can be an instance of Vector, a number array, or a 2D number array.
     * @param {boolean} [inDegrees=false] - Setting this to `true` will return the angle in degrees. Default is `false`.
     * @returns {number} - The angle between this vector and the given vector.
     * @throws {VectorError} If the sizes of the vectors do not match, or if either vector is a zero vector.
     */
    public angle(vector: Vector | number[] | number[][], inDegrees: boolean = false): number {
        if (!(vector instanceof Vector)) {
            vector = new Vector(vector);
        }

        if (this.size !== vector.size) {
            throw new VectorError(`Dimension mismatch: Sizes does not match`,
                703,
                { vectorOne_size: this.size, vectorTwo_size: vector.size });
        }

        const denominator: number = this.euclNorm() * vector.euclNorm();

        if (Math.abs(denominator) < DELTA) {
            throw new VectorError("Cannot take the angle of a zero vector.", 704);
        }

        const numerator: number = this.dot(vector);
        const angleInRadians: number = Math.acos(numerator / denominator);

        return inDegrees ? angleInRadians * (180 / Math.PI) : angleInRadians;
    }


    /**
     * Calculates the Euclidean distance between the current vector and the provided vector.
     *
     * @param {Vector | number[] | number[][]} vector - The other vector to calculate the distance with. It can be a Vector instance or a 2D/3D array.
     * @returns {number} - The Euclidean distance between the two vectors.
     * @throws {VectorError} - Throws an error if the dimensions of the vectors do not match.
     */
    public distance(vector: Vector | number[] | number[][]): number {
        if (!(vector instanceof Vector)) {
            vector = new Vector(vector);
        }

        if (this.size !== vector.size) {
            throw new VectorError(`Dimension mismatch: Sizes does not match`,
                703,
                { vectorOne_size: this.size, vectorTwo_size: vector.size });
        }

        let vector_one_copy: number[] = this.elements.flat()
        let vector_two_copy: number[] = vector.elements.flat()
        let distance: number = vector_one_copy.reduce((acc: number, cur: number, index: number) => acc + Math.pow(vector_two_copy[index] - cur, 2), 0);

        return Math.sqrt(distance);
    }


    /**
     *
     *
     * BOOLEAN TEST
     *
     *
     */

    /**
     * Checks if the given vector is orthogonal to the vector instance
     * @param {Vector | number[] | number[][]} vector - The vector object, one-dimensional number array or two-dimensional number array to compare.
     * @returns {boolean} True if the dot product of this vector and the given vector is zero, otherwise false.
     */
    public isOrthogonal(vector: Vector | number[] | number[][]): boolean {
        return Math.abs(this.dot(vector)) < DELTA;
    }

    /**
     * Checks if the given vector is orthonormal to the vector instance
     * @param {Vector | number[] | number[][]} vector - The vector object, one-dimensional number array or two-dimensional number array to compare.
     * @returns {boolean} True if the dot product of this vector and the given vector is zero
     * and both the vectors have unit length, otherwise returns False.
     */
    public isOrthonormal(vector: Vector | number[] | number[][]): boolean {
        if (!(vector instanceof Vector)) {
            vector = new Vector(vector);
        }
        return Math.abs(this.dot(vector)) < DELTA && Math.abs(this.euclNorm()) - 1 < DELTA && Math.abs(vector.euclNorm()) - 1 < DELTA;

    }

    /**
    * Checks if two vectors are equal within a defined tolerance.
    *
    * @param {Vector | number[] | number[][]} vector - The vector to be compared with.
    * @param {boolean} [strict=false] - Setting this to `true` will also check if their shapes are equal. Default is `false`.
    *
    * @throws {VectorError} If the vectors' sizes or, when strict is set to true, their shapes do not match.
    *
    * @returns {boolean} Returns `true` if the elements of the two vectors are equal within the tolerance, `false` otherwise.
    */
    public equal(vector: Vector | number[] | number[][], strict: boolean = false): boolean {
        if (!(vector instanceof Vector)) {
            vector = new Vector(vector);
        }

        if (this.size !== vector.size) {
            throw new VectorError(`Dimension mismatch: Sizes does not match`,
                703,
                { vectorOne_size: this.size, vectorTwo_size: vector.size });
        }

        if (strict && this.shape !== vector.shape) {
            throw new VectorError(`Dimension mismatch: shapes does not match`,
                703,
                { vectorOne_shape: this.shape, vectorTwo_shape: vector.shape });
        }
        let vector_one_copy: number[] = this.elements.flat()
        let vector_two_copy: number[] = vector.elements.flat()

        for (let i = 0; i < this.size; i++) {
            if (vector_one_copy[i] - vector_two_copy[i] > DELTA) {
                return false
            }
        }

        return true;

    }

    /**
     * Returns the projection of the current vector onto another vector.
     *
     * @param {(Vector | number[] | number[][])} vector - The vector to project onto. This can be an instance of the Vector class, a 1D number array representing a vector, or a 2D number array representing a matrix.
     * @param {boolean} [columnVector=false] - A boolean indicating if the vector to be returned is a column vector. When true, the method returns a 2D array structure.
     * @returns {Vector} The returned projected vector.
     * @throws {VectorError} Throws an error if the norm of the projection vector is zero (as projection onto a zero-vector is not defined).
     */
    public proj(vector: Vector | number[] | number[][], columnVector: boolean = false): Vector {
        if (!(vector instanceof Vector)) {
            vector = new Vector(vector);
        }
        const norm: number = vector.euclNorm();
        if (Math.abs(norm) < DELTA) {
            throw new VectorError("Cannot project onto a zero vector", 704);
        }


        const scalar: number = this.dot(vector) / Math.pow(norm, 2)
        let result: Vector;
        if (columnVector) {
            result = new Vector(vector.elements.flat().map((ele: number) => [ele]));
        } else {
            result = new Vector(vector.elements.flat());

        }

        result.scale(scalar)
        return result;
    }

    /**
     * Calculates and returns the mean of the the values in the vector.
     * @returns {number} The mean (average) of the values in the vector.
     */
    public mean(): number {
        const meanVector: Vector = Vector.ones(this.size);
        meanVector.scale(1 / this.size)

        return this.dot(meanVector)
    }


    /**
    * Calculates and returns the sum the vector
    * @returns {number} The sum of the values in the vector.
    */
    public sum(): number {
        return this.dot(Vector.ones(this.size))
    }

    /**
     * Transposes the vector. Changes a row vector into a column vector and vice versa.
     * @returns  {void}
     */
    public transpose(): void {
        if (this.isColumn) {
            this.elements = this.elements.flat()
        } else {
            this.elements = this.elements.flat().map((e: number) => [e])
        }
    }

    public isPropablity(): boolean {

        if (this.sum() <= (DELTA + 1) && (1 - DELTA) <= this.sum()) {
            return true;
        } else {
            return false;
        }
    }






    /**
     * 
     * 
     * STATIC METHODS
     * 
     * 
     */

    /**
     * Returns a new vector of a given size, filled with ones.
     *
     * @param {number} size - The size of the required vector.
     * @param {boolean} [columnVector=false] - A boolean indicating if the returned vector is a column vector. When true, a 2D array structure is returned.
     * @returns {Vector} The newly created vector filled with ones.
     */
    public static ones(size: number, columnVector: boolean = false): Vector {
        if (columnVector) {
            return new Vector((new Array(size)).fill(1, 0).map((ele: number) => [ele]))
        } else {
            return new Vector((new Array(size)).fill(1, 0))
        }
    }


    /**
     * CReturns a new vector of a given size, filled with zeros.
     * @param {number} size - The size of the required vector.
     * @param {boolean} [columnVector=false] - A boolean indicating if the returned vector is a column vector. When true, a 2D array structure is returned.
     * @returns {Vector} The newly created vector filled with zeros.
     */
    public static zeros(size: number, columnVector: boolean = false): Vector {
        if (columnVector) {
            return new Vector((new Array(size)).fill(0, 0).map((ele: number) => [ele]))
        } else {
            return new Vector((new Array(size)).fill(0, 0))
        }
    }


    /**
     * Creates a unit vector of the specified size with a 1 at the specified index.
     * This could be a row vector or a column vector.
     *
     * @param {number} size - The size or dimension of the unit vector to be created.
     * @param {number} index - The index at which the value of 1 should be placed.
     * @param {boolean} columnVector - Optional. A boolean to indicate if the unit vector should be a column vector. Defaults to false, indicating a row vector.
     * 
     * @throws {VectorError} If the supplied index is less than 0 or greater than the size.
     * 
     * @return {Vector} The created unit vector.
     */
    public static createUnitVector(size: number, index: number, columnVector: boolean = false): Vector {
        if (index > size || index < 0) {
            throw new VectorError("Dimention missmatch: index is less than or equal to zero or the index is greater than the size", 602, { size, index })
        }

        let unitVector: Vector;
        if (columnVector) {
            unitVector = Vector.zeros(size, true);
            (unitVector.elements as number[][])[index][0] = 1;
        } else {
            unitVector = Vector.zeros(size)
            unitVector.elements[index] = 1;
        }

        return unitVector;

    }




}
