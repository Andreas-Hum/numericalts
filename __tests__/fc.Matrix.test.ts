import { fc } from '@fast-check/jest';
import { Matrix, math } from '../src';

import { Numerical } from '../src/@interfaces/numerical';
import { FractionalNumberClass } from '../src/@t.classes/classes';

let fractionalRep: Numerical<string>, fractionalStringArb: fc.Arbitrary<string>
// Define your custom class (Replace ClassA, ClassB, and ClassC with your actual classes)
class ClassA {
    constructor(public prop1: number, public prop2: number) { }
}

// Define a custom arb to generate random named classes
let classArb: fc.Arbitrary<any>
let array2Darb: any


describe("Matrix", () => {

    beforeEach(() => {
        //Class reps 
        fractionalRep = new FractionalNumberClass()


        //Arbitraries
        fractionalStringArb = fc
            .tuple(fc.integer({ min: -1000, max: 1000 }), fc.integer({ min: 1, max: 1000 }))
            .filter(([numerator, denominator]) => denominator !== 0)
            .map(([numerator, denominator]) => `${numerator}/${denominator}`);
        classArb = fc.oneof(
            fc.record({ prop1: fc.integer(), prop2: fc.integer() }, { withDeletedKeys: true }).map(({ prop1, prop2 }) => new ClassA(prop1!, prop2!)),
        );

        array2Darb = (valueArb: fc.Arbitrary<any>) =>
            fc.array(
                fc.array(valueArb, { minLength: 1, maxLength: 200 }),
                { minLength: 1, maxLength: 200 }
            ).map(arr => {
                // Find the length of the shortest subarray
                const minLength = Math.min(...arr.map(subArr => subArr.length));

                // Trim all subarrays to the length of the shortest subarray
                return arr.map(subArr => subArr.slice(0, minLength));
            });

    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Validation and updating
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe("Initialization", () => {
        it('Should construct a 1D matrix with specified rows and columns', () => {
            fc.assert(
                fc.property(
                    fc.array(fc.integer()), //
                    fc.integer({ min: 1, max: 1000000 }),
                    fc.integer({ min: 1, max: 1000000 }),
                    (entries, rows, columns) => {
                        if (rows * columns !== entries.length) return; // Skip if rows * columns is not equal to array length

                        const matrix = new Matrix(entries, rows, columns);
                        expect(matrix.rows).toEqual(rows);
                        expect(matrix.columns).toEqual(columns);
                        expect(matrix.size).toEqual(rows * columns);
                        expect(matrix.shape).toEqual(`(${rows},${columns})`)

                        if (rows > columns) {
                            expect(matrix.isTall).toBeTruthy()
                            expect(matrix.isWide).toBeFalsy()
                            expect(matrix.isSquare).toBeFalsy()

                        } else if (rows < columns) {
                            expect(matrix.isTall).toBeFalsy()
                            expect(matrix.isWide).toBeTruthy()
                            expect(matrix.isSquare).toBeFalsy()
                        } else {
                            expect(matrix.isTall).toBeFalsy()
                            expect(matrix.isWide).toBeFalsy()
                            expect(matrix.isSquare).toBeTruthy()
                        }
                    }
                )
            );
        });

        it('Should construct a 1D matrix with specified rows and columns and costom interface', () => {
            fc.assert(
                fc.property(
                    fc.array(fractionalStringArb), //
                    fc.integer({ min: 1, max: 1000000 }),
                    fc.integer({ min: 1, max: 1000000 }),
                    (entries, rows, columns) => {
                        if (rows * columns !== entries.length) return; // Skip if rows * columns is not equal to array length

                        const matrix = new Matrix(entries, rows, columns);
                        expect(matrix.rows).toEqual(rows);
                        expect(matrix.columns).toEqual(columns);
                        expect(matrix.size).toEqual(rows * columns);
                        expect(matrix.shape).toEqual(`(${rows},${columns})`)

                        if (rows > columns) {
                            expect(matrix.isTall).toBeTruthy()
                            expect(matrix.isWide).toBeFalsy()
                            expect(matrix.isSquare).toBeFalsy()

                        } else if (rows < columns) {
                            expect(matrix.isTall).toBeFalsy()
                            expect(matrix.isWide).toBeTruthy()
                            expect(matrix.isSquare).toBeFalsy()
                        } else {
                            expect(matrix.isTall).toBeFalsy()
                            expect(matrix.isWide).toBeFalsy()
                            expect(matrix.isSquare).toBeTruthy()
                        }
                    }
                )
            );
        });



        it('Should construct a 2D matrix without specifying rows and columns and with a custom class', () => {
            fc.assert(
                fc.property(
                    array2Darb(classArb),
                    (entries: any[][]) => {

                        const matrix = new Matrix(entries);
                        expect(matrix.rows).toEqual(entries.length);
                        expect(matrix.columns).toEqual(entries[0].length);
                        expect(matrix.size).toEqual(entries.length * entries[0].length);
                        expect(matrix.shape).toEqual(`(${entries.length},${entries[0].length})`)

                        if (entries.length > entries[0].length) {
                            expect(matrix.isTall).toBeTruthy()
                            expect(matrix.isWide).toBeFalsy()
                            expect(matrix.isSquare).toBeFalsy()

                        } else if (entries.length < entries[0].length) {
                            expect(matrix.isTall).toBeFalsy()
                            expect(matrix.isWide).toBeTruthy()
                            expect(matrix.isSquare).toBeFalsy()
                        } else {
                            expect(matrix.isTall).toBeFalsy()
                            expect(matrix.isWide).toBeFalsy()
                            expect(matrix.isSquare).toBeTruthy()
                        }
                    }
                )
            );
        });


        it('Should construct a 2D matrix without specifying rows and columns', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: number[][]) => {
                        if (entries.some((entry: number[]) => entry.length !== entries[0].length)) return // Skip if entries dont have the same size is not equal to array length

                        const matrix = new Matrix(entries);
                        expect(matrix.rows).toEqual(entries.length);
                        expect(matrix.columns).toEqual(entries[0].length);
                        expect(matrix.size).toEqual(entries.length * entries[0].length);
                        expect(matrix.shape).toEqual(`(${entries.length},${entries[0].length})`)

                        if (entries.length > entries[0].length) {
                            expect(matrix.isTall).toBeTruthy()
                            expect(matrix.isWide).toBeFalsy()
                            expect(matrix.isSquare).toBeFalsy()

                        } else if (entries.length < entries[0].length) {
                            expect(matrix.isTall).toBeFalsy()
                            expect(matrix.isWide).toBeTruthy()
                            expect(matrix.isSquare).toBeFalsy()
                        } else {
                            expect(matrix.isTall).toBeFalsy()
                            expect(matrix.isWide).toBeFalsy()
                            expect(matrix.isSquare).toBeTruthy()
                        }
                    }
                )
            );
        });

        it('Errors', () => {
            expect(() => new Matrix([[new FractionalNumberClass(), new FractionalNumberClass(), "2133"]])).toThrow("Invalid entries not of the same type")
            expect(() => new Matrix([1, 32, 3, [2]])).toThrow("Invalid Matrix format")
            expect(() => new Matrix([[1, 32], [3, [4]]])).toThrow("Matrix cannot be of a depth greater than one")
            expect(() => new Matrix([[1, 32, 2], [3, [4]]])).toThrow("Matrix rows are now of the same length")
            //@ts-ignore
            expect(() => new Matrix(123)).toThrow("Matrix has to be an array")
            //@ts-ignore
            expect(() => new Matrix([1, 2, 3], "sda", 2312)).toThrow("Rows and columns must be defined for 1D array entries, rows and columns must be of type number and not be 0 or negative")
            //@ts-ignore
            expect(() => new Matrix([1, 2, 3], 2, 2)).toThrow("Rows and columns multiplied together has to equal the length of the 1d array")
            //@ts-ignore
            expect(() => new Matrix([1, "2", 3, 4], 2, 2,)).toThrow("Invalid entries not of the same type")
        });



    })
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Set- and getter methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe("Getting and setting", () => {
        it('getElement should return the correct element', () => {
            fc.assert(
                fc.property(array2Darb(fc.integer()), (entries: any[][]) => {
                    const matrix = new Matrix(entries);

                    const row = Math.floor(Math.random() * matrix.rows);
                    const column = Math.floor(Math.random() * matrix.columns);

                    const result = matrix.getElement(row, column);
                    const index = row * matrix.columns + column;
                    const expected = matrix.mElements[index];

                    expect(result).toEqual(expected);
                })
            );
        });

        it('Should correctly get a row of a matrix', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const matrix: Matrix<any> = new Matrix(entries);

                        // Create a random index between 1 and this.rows (inclusive).
                        const randomIndex = Math.floor(Math.random() * matrix.rows + 1);

                        expect(matrix.getRow(randomIndex)).toEqual(entries[(randomIndex - 1)]);
                    }
                )
            );
        });


        it('Should correctly get a column of a matrix', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const matrix: Matrix<any> = new Matrix(entries);

                        // Create a random index between 1 and this.rows (inclusive).
                        const randomIndex = Math.floor(Math.random() * matrix.columns + 1);

                        expect(matrix.getColumn(randomIndex)).toEqual(entries.map((entry: any[]) => entry[(randomIndex - 1)]));
                    }
                )
            );
        });


        it('should return the correct submatrix', () => {
            const matrix = new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);

            const submatrix = matrix.getSubMatrix(0, 2, 0, 2);

            expect(submatrix.toArray()).toEqual([
                [1, 2],
                [4, 5],
            ]);
        });

        it('should set the elements of the submatrix correctly', () => {
            const matrix = new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);

            const submatrix = new Matrix([
                [10, 11],
                [12, 13],
            ]);

            matrix.setSubMatrix(0, 1, 0, 1, submatrix);

            expect(matrix.toArray()).toEqual([
                [10, 11, 3],
                [12, 13, 6],
                [7, 8, 9],
            ]);
        });


        it('Errors', () => {
            const tMatrix: Matrix<number> = new Matrix([[1, 2], [3, 4]])

            expect(() => tMatrix.getElement(1322131, 12312312)).toThrow("Index out of bounds")
            //@ts-ignore
            expect(() => tMatrix.getElement("1322131", "12312312")).toThrow("Invalid arugment")

            expect(() => tMatrix.getRow(1322131)).toThrow("Row index out of bounds")
            //@ts-ignore
            expect(() => tMatrix.getRow("sdad")).toThrow("Invalid argument")

            expect(() => tMatrix.getColumn(1322131)).toThrow("Column index out of bounds")
            //@ts-ignore
            expect(() => tMatrix.getColumn("sdad")).toThrow("Invalid argument")

            //@ts-ignore
            expect(() => tMatrix.getSubMatrix("1322131", "12312312")).toThrow("Invalid arugment")
            expect(() => tMatrix.setSubMatrix(1322131, 323232, 11, 22, tMatrix)).toThrow("Invalid submatrix indices")
            expect(() => tMatrix.setSubMatrix(0, 1, 0, 1, new Matrix([[2]]))).toThrow("Submatrix dimensions do not match")
        });
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Mathematical operations, example, add, subtract, multiply and so forth
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    describe("Mathematical operations", () => {
        it('Should correctly add two matrices together', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const A: Matrix<any> = new Matrix(entries);
                        const B: Matrix<any> = Matrix.random(A.rows, A.columns)
                        const C: Matrix<any> = Matrix.random(A.rows, A.columns)


                        expect(A.add(B)).toEqual(B.add(A));
                        expect(A.add(B).add(C)).toEqual(C.add(B).add(A));
                        expect(A.add(Matrix.zeros(A.rows, A.columns))).toEqual(A)
                    }
                )
            );
        });


        it('Should correctly subtract two matrices', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const A: Matrix<any> = new Matrix(entries);
                        const B: Matrix<any> = Matrix.random(A.rows, A.columns)
                        expect(A.subtract(A)).toEqual(Matrix.zeros(A.rows, A.columns));
                        expect(A.subtract(B)).toEqual(A.add(B.scale(-1)))

                    }
                )
            );
        });



        //TODO: fix this 
        it('Should correctly perform the gram smith method', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer({ min: 1 })),
                    (entries: any[][]) => {
                        if(entries.length == 1 || entries.some((entry:any[]) => entry.length !== entries[0].length)) return
                        const A: Matrix<any> = new Matrix(entries);
                        const gramSmith: Matrix<any> = A.gramSmith()

                        gramSmith.transpose().toArray().every((row: any[]) => expect(math.dot(row, row)).toBeCloseTo(1))



                    }
                )
            );
        });

    })
}) 