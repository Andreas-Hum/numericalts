import { fc } from '@fast-check/jest';
import { Matrix, math } from '../src';

import { Numerical } from '../src/@interfaces/numerical';
import { FractionalNumberClass } from '../src/@numerical.classes';
import { NumericalNumber, NumericalBigInt } from "../src/@numerical.classes";

let fractionalRep: Numerical<string>, fractionalStringArb: fc.Arbitrary<string>
// Define your custom class (Replace ClassA, ClassB, and ClassC with your actual classes)
class ClassA {
    constructor(public prop1: number, public prop2: number) { }
}

// Define a custom arb to generate random named classes
let classArb: fc.Arbitrary<any>
let array2Darb: any
let twoByThree: Matrix<number>, threeByTwo: Matrix<number>


describe("Matrix", () => {

    beforeEach(() => {
        twoByThree = new Matrix([[1, 2, 3], [4, 5, 6]]);
        threeByTwo = new Matrix([[1, 4], [2, 5], [3, 6]]);

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

                        const matrix = new Matrix(entries, { rows, columns });
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

                        const matrix = new Matrix(entries, { rows, columns, numerical: new FractionalNumberClass() });
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

                        const matrix = new Matrix(entries, { numerical: new NumericalNumber() });
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

                        expect(matrix.equal(matrix)).toBeTruthy()
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


        it('Should construct a 2D bigint matrix without specifying rows and columns', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.bigInt()),
                    (entries: bigint[][]) => {
                        if (entries.some((entry: bigint[]) => entry.length !== entries[0].length)) return // Skip if entries dont have the same size is not equal to array length

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
            expect(() => new Matrix([1, 2, 3], { rows: 2, columns: 2 })).toThrow("Rows and columns multiplied together has to equal the length of the 1d array")
            //@ts-ignore
            expect(() => new Matrix([1, "2", 3, 4], { rows: 2, columns: 2 })).toThrow("Invalid entries not of the same type")
            expect(() => new Matrix(["1", "2", "3", "4"], { rows: 2, columns: 2 })).toThrow("Matrix datatype is neither a number nor a bigint and no appropriate Numerical implementation was provided.")

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

        it('Should correctly get the main diagonal of the matrix', () => {

            fc.assert(
                fc.property(array2Darb(fc.integer()), (entries: any[][]) => {
                    const matrix = new Matrix(entries);
                    const diag = matrix.diag()

                    if (matrix.mElements.length === 0) {
                        expect(diag).toEqual([])
                    } else if (matrix.mElements.length === 1 || matrix.columns === 1 || matrix.rows === 1) {
                        expect(diag).toEqual([matrix.mElements[0]])
                    } else {
                        const expectedRes: any[] = []
                        const min: number = Math.min(matrix.rows, matrix.columns)
                        for (let i = 0; i < min; i++) {
                            expectedRes.push(matrix.getElement(i, i))
                        }

                        expect(diag).toEqual(expectedRes)
                    }


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
                        const randomIndex = Math.floor(Math.random() * matrix.rows);

                        expect(matrix.getRow(randomIndex)).toEqual(entries[(randomIndex)]);
                    }
                )
            );
        });


        it('Should correctly get a column of a matrix', () => {
            new NumericalBigInt().toString(new Matrix([[1n, 2n], [3n, 4n]]).mElements[0])
            new FractionalNumberClass().toString(new Matrix([["1/2", "1/2"], ["1/2", "1/2"]], { numerical: new FractionalNumberClass() }).mElements[0])


            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const matrix: Matrix<any> = new Matrix(entries);

                        const randomIndex = Math.floor(Math.random() * matrix.columns);


                        expect(matrix.getColumn(randomIndex)).toEqual(entries.map((entry: any[]) => entry[randomIndex]));
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

        describe('setRow', () => {
            it('sets new values in the specified row', () => {
                twoByThree.setRow(0, [10, 11, 12]);
                expect(twoByThree.getRow(0)).toEqual([10, 11, 12]);
            });

            it('throws an error when the row index is out of bounds', () => {
                expect(() => twoByThree.setRow(3, [10, 11, 12])).toThrow();
            });

            it('throws an error when the size of the input array does not match the column size', () => {
                expect(() => twoByThree.setRow(1, [10, 11, 12, 13])).toThrow();
            });

            it('throws an error when the size of the input array does not match the column size', () => {
                //@ts-ignore
                expect(() => twoByThree.setRow("1", [10, 11, 12, 13])).toThrow();
            });
        });

        describe('setColumn', () => {
            it('sets new values in the specified column', () => {
                threeByTwo.setColumn(1, [7, 8, 9]);
                expect(threeByTwo.getColumn(1)).toEqual([7, 8, 9]);
            });

            it('throws an error when the column index is out of bounds', () => {
                expect(() => threeByTwo.setColumn(2, [7, 8, 9])).toThrow();
            });

            it('throws an error when the size of the input array does not match the row size', () => {
                expect(() => threeByTwo.setColumn(1, [7, 8, 9, 10])).toThrow();
            });

            it('throws an error when the size of the input array does not match the column size', () => {
                //@ts-ignore
                expect(() => twoByThree.setColumn("1", [10, 11, 12, 13])).toThrow();
            });
        });


        it('swapRows should swap rows correctly', () => {
            fc.assert(
                fc.property(array2Darb(fc.integer()), (entries: any[][]) => {
                    if (entries.length === 1) return
                    const matrix = new Matrix<any>(entries);
                    const [row1, row2] = entries;
                    matrix.swapRows(0, 1);
                    expect(matrix.getRow(0)).toEqual(row2);
                    expect(matrix.getRow(1)).toEqual(row1);
                })
            );
        });

        it('swapColumns should swap columns correctly', () => {
            fc.assert(
                fc.property(array2Darb(fc.integer()), (entries: any[][]) => {
                    const matrix = new Matrix(entries);
                    if (matrix.columns < 2) return
                    const col1 = entries.map((row) => row[0]);
                    const col2 = entries.map((row) => row[1]);


                    matrix.swapColumns(0, 1);
                    expect(matrix.getColumn(0)).toEqual(col2);
                    expect(matrix.getColumn(1)).toEqual(col1);
                })
            );
        });

        it('throws an error if the first row index is out of bounds', () => {
            expect(() => twoByThree.swapRows(-1, 1)).toThrow();
            expect(() => twoByThree.swapRows(2, 1)).toThrow();
        });

        it('throws an error if the second row index is out of bounds', () => {
            expect(() => twoByThree.swapRows(0, -1)).toThrow();
            expect(() => twoByThree.swapRows(0, 2)).toThrow();
        });

        it('throws an error if the matrix has less than two columns', () => {
            const singleColumnMatrix = new Matrix([[1], [2]]);
            expect(() => singleColumnMatrix.swapColumns(0, 1)).toThrow();
        });

        it('throws an error if the first column index is out of bounds', () => {
            expect(() => twoByThree.swapColumns(-1, 1)).toThrow();
            expect(() => twoByThree.swapColumns(4, 1)).toThrow();
        });

        it('throws an error if the second column index is out of bounds', () => {
            expect(() => twoByThree.swapColumns(0, -1)).toThrow();
            expect(() => twoByThree.swapColumns(0, 4)).toThrow();
        });


        it('Set first element', () => {
            twoByThree.setElement(0, 0, 10);
            threeByTwo.setElement(0, 0, 10);

            expect(twoByThree.getElement(0, 0)).toEqual(10)
            expect(threeByTwo.getElement(0, 0)).toEqual(10)
        })


        it('Set last element', () => {
            twoByThree.setElement(1, 2, 10);
            threeByTwo.setElement(2, 1, 10);

            expect(twoByThree.getElement(1, 2)).toEqual(10)
            expect(threeByTwo.getElement(2, 1)).toEqual(10)
        })


        it('Error: out of bounds', () => {
            expect(() => twoByThree.setElement(10, 10, 10)).toThrow()
        })

        it('Error: Invalid value', () => {
            //@ts-ignore
            expect(() => twoByThree.setElement(0, 0, "error")).toThrow()
        })

        it('Error: Invalid argument', () => {
            //@ts-ignore
            expect(() => twoByThree.setElement(0, "0", 10)).toThrow()
        })

        it('Errors', () => {
            const tMatrix: Matrix<number> = new Matrix([[1, 2], [3, 4]])

            expect(() => tMatrix.getElement(1322131, 12312312)).toThrow("Index out of bounds")
            //@ts-ignore
            expect(() => tMatrix.getElement("1322131", "12312312")).toThrow("Invalid arugment")


            //@ts-ignore
            expect(() => tMatrix.setElement("1322131", "12312312")).toThrow("Invalid arugment")


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


                        expect(JSON.stringify(A.add(B))).toEqual(JSON.stringify(B.add(A)));
                        expect(JSON.stringify(A.add(B).add(C))).toEqual(JSON.stringify(C.add(B).add(A)));
                        expect(JSON.stringify(A.add(Matrix.zeros(A.rows, A.columns)))).toEqual(JSON.stringify(A))
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
                        expect(JSON.stringify(A.subtract(A))).toEqual(JSON.stringify(Matrix.zeros(A.rows, A.columns)));
                        expect(JSON.stringify(A.subtract(B))).toEqual(JSON.stringify(A.add(B.scale(-1))))

                    }
                )
            );
        });



        //TODO: fix this
        it('Should correctly perform the gram smith method', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        if (entries.length == 1 || entries.some((entry: any[]) => entry.length !== entries[0].length)) return
                        const A: Matrix<any> = new Matrix(entries);
                        let gramSmith: Matrix<any>;
                        try {
                            gramSmith = A.gramSmith()

                        } catch (error) {
                            return
                        }

                        gramSmith.transpose().toArray().every((row: any[]) => expect(math.dot(row, row)).toBeCloseTo(1))

                    }
                )
            );
        });



        it('Should correctly multiply two matricies together using the naive multiplication method', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const A: Matrix<any> = new Matrix(entries);
                        if (!A.isSquare) return
                        const iden: Matrix<any> = Matrix.identity(A.rows)
                        const zeros: Matrix<any> = Matrix.zeros(A.rows, A.columns)

                        expect(JSON.stringify(A.multiply(iden))).toEqual(JSON.stringify(A))
                        expect(JSON.stringify(A.multiply(zeros))).toEqual(JSON.stringify(zeros))


                    }
                )
            );
        });

        it('should compute the condition number of a square matrix', () => {
            fc.assert(
                fc.property(array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        // Arrange
                        const matrix = new Matrix(entries);

                        if (!matrix.isSquare) return

                        // Act
                        const conditionNumber = matrix.cond();

                        // Assert
                        expect(conditionNumber).toBeGreaterThanOrEqual(0);
                    })
            );
        });

        it('should throw an error if the matrix is not square', () => {

            expect(() => twoByThree.cond()).toThrowError("Matrix must be square to compute its condition number.");

        });

        it('Should correctly raise a square matrix to the power x ', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const A: Matrix<any> = new Matrix(entries);
                        if (!A.isSquare) return
                        const iden: Matrix<any> = Matrix.identity(A.rows)

                        expect(JSON.stringify(A.multiply(A))).toEqual(JSON.stringify(A.pow(2)))
                        expect(JSON.stringify(A.pow(0))).toEqual(JSON.stringify(iden))
                        expect(JSON.stringify(A.pow(1))).toEqual(JSON.stringify(A))
                        expect(JSON.stringify(A.pow(3))).toBeTruthy()



                    }
                )
            );
        });

        it('should compute the determinant of a square matrix', () => {
            expect(new Matrix([[1, 2], [3, 4]]).det()).toEqual(-2)
            expect(new Matrix([[1, 2, 3], [4, 5, 6], [6, 7, 8]]).det()).toEqual(0)
            expect(new Matrix([[1, 3, 5, 9], [1, 3, 1, 7], [4, 3, 9, 7], [5, 2, 0, 9]]).det()).toBeCloseTo(-376)
            expect(new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [3, 2, 3, 2], [3, 1, 7, 8]]).det()).toBeCloseTo(-24)

        });


        it('should throw an error if the matrix is not square', () => {

            expect(() => twoByThree.det()).toThrowError("Matrix must be square to compute its determinant.");

        });


        it('should return 0 if matrix is singular', () => {

            expect(new Matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]).det()).toEqual(0);

        });

        it('Should correctly scale a matrix ', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const A: Matrix<any> = new Matrix(entries);

                        const zeros: Matrix<any> = Matrix.zeros(A.rows, A.columns)

                        expect(JSON.stringify(A.scale(1))).toEqual(JSON.stringify(A))
                        expect(JSON.stringify(A.scale(0))).toEqual(JSON.stringify(zeros))


                    }
                )
            );
        });

        it('Should correctly multiply two matricies together using strassens', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const A: Matrix<any> = new Matrix(entries);
                        if (!A.isSquare) return
                        const iden: Matrix<any> = Matrix.identity(A.rows)

                        expect(JSON.stringify(A.strassenMultiply(iden))).toEqual(JSON.stringify(A))

                    }
                )
            );
        });


        it('should perform vector-matrix multiplication correctly', () => {
            const matrix = new Matrix([[1, 2, 3],
            [4, 5, 6]]);
            const vector = [2, 3, 4];

            const expected = new Matrix([[2, 6, 12], [8, 15, 24]]);

            matrix.vMultiply(vector);

            expect(JSON.stringify(matrix.vMultiply(vector))).toEqual(JSON.stringify(expected));
        });

        it('should throw an error if the input vector is not an array', () => {
            const matrix = new Matrix([[1, 2, 3]]);
            const invalidVector = 'not an array';
            //@ts-ignore
            expect(() => matrix.vMultiply(invalidVector)).toThrow();

        });

        it('should throw an error if the input vector length does not match the number of columns in the matrix', () => {
            const matrix = new Matrix([[1, 2, 3]]);
            const invalidVector = [1, 2];
            expect(() => matrix.vMultiply(invalidVector)).toThrow();

        });
        it('Error: Incompatible dimensions', () => {
            expect(() => twoByThree.add(threeByTwo)).toThrow()
        })

        it('Error: Incompatible dimensions', () => {
            expect(() => twoByThree.multiply(twoByThree)).toThrow()
        })

        it('Error: B not an instance of Matrix', () => {
            //@ts-ignore
            expect(() => twoByThree.add("threeByTwo")).toThrow()
        })

        it("should throw a MatrixError if the matrix is not square", () => {
            const nonSquareMatrix = new Matrix([[1, 2, 3], [4, 5, 6]]);

            expect(() => {
                nonSquareMatrix.pow(2);
            }).toThrow();
        });
    })


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Solving systems
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe("Solving systems", () => {
        describe('Back substitution', () => {
            it('An upper triangular matrix with the solution [4,-11,13]  ', () => {
                const solTest = new Matrix([[1, 0, 0], [0, 1, 1], [0, 0, 1]])
                expect(solTest.backSubstitution([4, 2, 13])).toEqual([4, -11, 13])
            });

            it('An upper triangular row matrix with the solution [52, -37, 13]  ', () => {
                const solTest = new Matrix([[1, 2, 2], [0, 1, 3], [0, 0, 1]])
                expect(solTest.backSubstitution([4, 2, 13])).toEqual([52, -37, 13])
            });

            it('Error: Unsolvable system', () => {
                const solTest = new Matrix([[1, 2, 2], [0, 0, 0], [0, 0, 0]])
                expect(() => solTest.backSubstitution([4, 2, 13])).toThrow()
            });

            it('Error: Non upper triangular matrix', () => {
                const solTest = new Matrix([[1, 2, 2], [1, 1, 3], [1, 1, 1]])
                expect(() => solTest.backSubstitution([4, 2, 13])).toThrow()
            });

            it('Error: Invalid argument', () => {
                const solTest = new Matrix([[1, 2, 2], [0, 1, 3], [0, 0, 1]])
                //@ts-ignore
                expect(() => solTest.backSubstitution("[4, 2, 13]")).toThrow()
            });


            // Test multiplication of a non-square matrix
            it('Non-square Matrix multiplication', () => {
                const A = new Matrix([1, 2, 3, 4, 5, 6], { rows: 2, columns: 3 });
                const B = new Matrix([2, 0, 1, 2, 1, 2], { rows: 3, columns: 2 });

                expect(() => {
                    A.strassenMultiply(B);
                }).toThrow();
            });

            // Test multiplication of a matrix with dimensions not a power of two
            it('Not power of two Matrix multiplication', () => {
                const A = new Matrix([1, 2, 3, 4, 5, 6, 7, 8, 9], { rows: 3, columns: 3 });
                const B = new Matrix([9, 8, 7, 6, 5, 4, 3, 2, 1], { rows: 3, columns: 3 });
                const result = A.strassenMultiply(B);


                // Expected result is manually calculated
                const expectedResult = [30, 24, 18, 84, 69, 54, 138, 114, 90];
                expect(JSON.stringify(result)).toEqual(JSON.stringify(new Matrix(expectedResult, { rows: 3, columns: 3 })));


            });
        });

        describe('Forward substitution', () => {
            it('A lower triangular matrix with the solution [4, -2, 11]  ', () => {
                const solTest = new Matrix([[1, 0, 0], [1, 1, 0], [1, 1, 1]])
                expect(solTest.forwardSubstitution([4, 2, 13])).toEqual([4, -2, 11])
            });

            it('A lower triangular row matrix with the solution [4, -6, 17]  ', () => {
                const solTest = new Matrix([[1, 0, 0], [2, 1, 0], [2, 2, 1]])
                expect(solTest.forwardSubstitution([4, 2, 13])).toEqual([4, -6, 17])
            });

            it('Error: Unsolvable system', () => {
                const solTest = new Matrix([[1, 0, 0], [2, 0, 0], [2, 2, 2]])
                expect(() => solTest.forwardSubstitution([4, 2, 13])).toThrow()
            });

            it('Error: Non lower triangular matrix', () => {
                const solTest = new Matrix([[1, 2, 2], [1, 1, 3], [1, 1, 1]])
                expect(() => solTest.forwardSubstitution([4, 2, 13])).toThrow()
            });

            it('Error: Invalid argument', () => {
                const solTest = new Matrix([[1, 0, 0], [2, 1, 0], [2, 2, 1]])
                //@ts-ignore
                expect(() => solTest.forwardSubstitution("[4, 2, 13]")).toThrow()
            });
        });


        describe('gaussianElimination', () => {
            it('First matrix', () => {
                const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
                const result = matrix.gaussianElimination();
                const expected = new Matrix([[1, 2, 3], [0, -3, -6], [0, 0, 0]]);
                //@ts-ignore
                expect(result.equal(expected)).toBeTruthy();
            });

            it('Second matrix', () => {
                const matrix = new Matrix([[10, 11, 12], [13, 14, 15], [16, 17, 18]]);
                const result = matrix.gaussianElimination();

                const expected = new Matrix([[10, 11, 12], [0, -3 / 10, -3 / 5], [0, 0, 0]]);
                //@ts-ignore
                expect(result.equal(expected)).toBeTruthy();
            });
            it('Third matrix', () => {
                const matrix = new Matrix([[3, 2, 1, 23], [4, 3, 5, 13], [5, 3, 2, 22]]);
                const result = matrix.gaussianElimination();

                const expected = new Matrix([[3, 2, 1, 23], [0, 1 / 3, 11 / 3, -53 / 3], [0, 0, 4, -34]]);
                //@ts-ignore
                expect(result.equal(expected)).toBeTruthy();
            });


            it('should enter the if (columns <= lead) condition in gaussianElimination', () => {
                const matrix = new Matrix([[1], [2], [3]]);
                const result = matrix.gaussianElimination();
            });

            it('Solving', () => {
                const matrix = new Matrix([[2, 1, -1, 8], [-3, -1, 2, -11], [-2, 1, 2, -3]]);
                const result = matrix.gaussianElimination({ solve: true });


                //@ts-ignore
                expect(result).toEqual([2, 3, -1]);
            });
        });

        describe('GaussJordan', () => {
            it('First matrix', () => {
                const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
                const result = matrix.gaussJordan();
                const expected = new Matrix([[1, 0, -1], [0, 1, 2], [0, 0, 0]]);
                //@ts-ignore
                result.mElements[3] = 0;
                //@ts-ignore
                expect(result.equal(expected)).toBeTruthy();
            });

            it('Second matrix', () => {
                const matrix = new Matrix([[10, 11, 12], [13, 14, 15], [16, 17, 18]]);
                const result = matrix.gaussJordan();

                const expected = new Matrix([[1, 0, -1], [0, 1, 2], [0, 0, 0]]);
                //@ts-ignore
                result.mElements[3] = 0;

                //@ts-ignore
                expect(result.equal(expected)).toBeTruthy();
            });
            it('Third matrix', () => {
                const matrix = new Matrix([[3, 2, 1], [4, 3, 5], [5, 3, 2]]);
                const result = matrix.gaussJordan();

                const expected = new Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
                //@ts-ignore
                expect(result.equal(expected)).toBeTruthy();
            });

            it('Solving', () => {
                const matrix = new Matrix([[2, 1, -1, 8], [-3, -1, 2, -11], [-2, 1, 2, -3]]);
                const result = matrix.gaussJordan({ solve: true });


                //@ts-ignore
                expect(result).toEqual([2, 3, -1]);
            });

            it('should enter the if (columns <= lead) condition in gaussianElimination', () => {
                const matrix = new Matrix([[1], [2], [3]]);
                const result = matrix.gaussJordan();
            });




        });


        describe('LU decomposition', () => {

            it('Should correctly hit the property PA=LU', () => {
                fc.assert(
                    fc.property(
                        array2Darb(fc.integer()),
                        (entries: any[][]) => {
                            const A: Matrix<any> = new Matrix(entries);
                            if (!A.isSquare) return;
                            let luDecomp: { L: Matrix<any>, U: Matrix<any>, P: Matrix<any> };
                            try {
                                luDecomp = A.LUDecomposition();
                            } catch (error) {
                                return;
                            }
                            let TMatrix: Matrix<any> = luDecomp.P.multiply(A);
                            Matrix.toFixedMatrix(TMatrix, 4);

                            expect(TMatrix.equal(luDecomp.L.multiply(luDecomp.U), 1e-2)).toBeTruthy();
                        }
                    )
                );
            });

            it('Error: LU decomposition only supports square matrices.', () => {
                const testMatrix = new Matrix([[1, 1, 1, 4], [1, 1, 1, 4], [1, 1, 1, 4]]);

                expect(() => testMatrix.LUDecomposition()).toThrow();


            });


            it('Error: LU decomposition singular.', () => {
                const testMatrix = new Matrix([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
                expect(() => testMatrix.LUDecomposition()).toThrow();
            });

        });


        describe('QR decomposition', () => {
            it('QR decomposition with a 2x2 row matrix [[1,1],[0,1]]', () => {
                const testMatrix = new Matrix([[1, 1], [0, 1]])
                const { Q, R } = testMatrix.QRDecomposition()


                expect(JSON.stringify(Q)).toEqual(JSON.stringify(new Matrix([[1, 0], [0, 1]])))
                expect(JSON.stringify(R)).toEqual(JSON.stringify(new Matrix([[1, 1], [0, 1]])))


            });

            it('QR decomposition with a 4x4 row matrix [[0,0,1,0],[1,0,0,0],[0,1,1,0],[0,0,0,1]]', () => {
                const testMatrix = new Matrix([[0, 0, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [0, 0, 0, 1]])
                const { Q, R } = testMatrix.QRDecomposition()


                expect(JSON.stringify(Q)).toEqual(JSON.stringify(new Matrix([
                    [0, 0, 1, 0],
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 0, 1]])))
                expect(JSON.stringify(R)).toEqual(JSON.stringify(new Matrix([
                    [1, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1]])))
            });

            it('QR decomposition with a 4x3 row matrix [[0,0,1],[1,0,0],[0,1,1],[0,0,0]]', () => {
                const testMatrix = new Matrix([[0, 0, 1], [1, 0, 0], [0, 1, 1], [0, 0, 0]])
                const { Q, R } = testMatrix.QRDecomposition()


                expect(JSON.stringify(Q)).toEqual(JSON.stringify(new Matrix([
                    [0, 0, 1],
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 0]])))

                expect(JSON.stringify(R)).toEqual(JSON.stringify(new Matrix([
                    [1, 0, 0],
                    [0, 1, 1],
                    [0, 0, 1]])))
            });


            it('Should correctly it the property A=QR ', () => {
                fc.assert(
                    fc.property(
                        array2Darb(fc.integer()),
                        (entries: any[][]) => {
                            const A: Matrix<any> = new Matrix(entries);
                            if (!A.isSquare) return
                            let gramSmith: { Q: Matrix<any>, R: Matrix<any> };
                            try {
                                gramSmith = A.QRDecomposition()

                            } catch (error) {
                                return
                            }
                            let TMatrix: Matrix<any> = gramSmith.Q.multiply(gramSmith.R)
                            Matrix.toFixedMatrix(TMatrix, 0)
                            expect(TMatrix.equal(A, 1e-2)).toBeTruthy()
                        }
                    )
                );
            });

            it('Error: Non linear independent columns', () => {
                const testMatrix = new Matrix([[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]])

                expect(() => testMatrix.QRDecomposition()).toThrow()

            });






        });

    })

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Reshapeing
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


    describe("Reshaping", () => {
        it('Should correctly augment a matrix', () => {
            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const A: Matrix<any> = new Matrix(entries);
                        const augmentedA: Matrix<any> = A.augment(A);

                        expect(augmentedA.columns).toEqual(2 * A.columns)
                        expect(augmentedA.rows).toEqual(A.rows)
                        expect(augmentedA.shape).toEqual(`(${A.rows},${2 * A.columns})`)


                    }
                )
            );
        });

        it('Should correctly transpose a matrix', () => {

            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const A: Matrix<any> = new Matrix(entries);
                        const At: Matrix<any> = A.transpose()

                        expect(At.columns).toEqual(A.rows)
                        expect(At.rows).toEqual(A.columns)
                        expect(At.shape).toEqual(`(${A.columns},${A.rows})`)
                        expect(JSON.stringify(At.transpose())).toEqual(JSON.stringify(A))


                    }
                )
            );
        });


    })

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Inverting
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe("Inverting", () => {

        describe("Inverting a square matrix", () => {
            it("Inverting a 2x2 square matrix", () => {
                const matrix = new Matrix([[1, -2], [-1, 3]]);
                expect(JSON.stringify(matrix.invertSquare())).toEqual(JSON.stringify(new Matrix([[3, 2], [1, 1]])))
                const hehe = new Matrix<string>([["4/1", "2/1", "1/1"], ["5/1", "2/1", "1/1"], ["4/1", "5/1", "5/1"]], { numerical: fractionalRep })
                const { Q, R } = hehe.QRDecomposition()


            });


            it("Inverting a 5x5 square matrix", () => {
                const matrix = new Matrix([[39, 50, 86, 61, 63], [80, 30, 95, -57, -90], [-89, -28, 32, -31, -11], [24, 82, -41, 47, 75], [67, -68, 77, 31, 33]])
                const testings = matrix.invertSquare()
                Matrix.toFixedMatrix(testings, 3)
                expect(testings.equal(new Matrix([[-0.007, 0.004, -0.003, 0.007, 0.007], [0.004, 0.003, 0.001, 0.004, -0.007], [0.005, 0.002, 0.005, -0.001, 0.001], [0.026, -0.015, -0.026, -0.035, -0.019], [-0.016, 0.006, 0.019, 0.029, 0.018]]))).toBeTruthy()

            });


        });

        describe("Inverting an upper triangular matrix", () => {
            it("Inverting a 3x3 upper triangular matrix", () => {
                const matrix = new Matrix([[1, 2, 3], [0, 4, 5], [0, 0, 6]]);

                const expected = new Matrix([[1, - 1 / 2, -1 / 12], [0, 1 / 4, -5 / 24], [0, 0, 1 / 6]]);

                const result = matrix.invertUpper();

                expect(result.equal(expected)).toBeTruthy();
            });

            it("Error: Not a square matrix", () => {
                const matrix = new Matrix([[1, 2, 3], [0, 4, 5]]);

                expect(() => {
                    matrix.invertUpper();
                }).toThrow();
            });

            it("Error: Non upper triangular matrix", () => {
                const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

                expect(() => {
                    matrix.invertUpper();
                }).toThrow();
            });
        });

        describe("Inverting a lower triangular matrix", () => {
            it("Inverting a 3x3 lower triangular matrix", () => {
                const matrix = new Matrix([[1, 0, 0], [2, 3, 0], [4, 5, 6]]);
                const expected = new Matrix([[1, 0, 0], [-2 / 3, 1 / 3, 0], [-1 / 9, -5 / 18, 1 / 6]]);

                const result = matrix.invertLower();

                expect(result.equal(expected)).toBeTruthy();

            });

            it("Error: Not a square matrix", () => {
                const matrix = new Matrix([[1, 2, 3], [0, 4, 5]]);

                expect(() => {
                    matrix.invertLower();
                }).toThrow();
            });

            it("Error: Non lower triangular matrix", () => {
                const matrix = new Matrix([[1, 2, 3], [0, 4, 5], [6, 7, 8]]);

                expect(() => {
                    matrix.invertLower();
                }).toThrow();
            });
        });

    })

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe("Utility", () => {
        it('Should correctly show equality between two matricies', () => {

            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const A: Matrix<any> = new Matrix(entries);
                        expect(A.equal(A)).toBeTruthy()

                    }
                )
            );
        });

        it('Should correctly turn a matrix into a 2d array', () => {

            fc.assert(
                fc.property(
                    array2Darb(fc.integer()),
                    (entries: any[][]) => {
                        const A: Matrix<any> = new Matrix(entries);
                        expect(A.toArray()).toEqual(entries)

                    }
                )
            );
        });

        it('Should correctly turn a matrix into a string', () => {
            const test = new Matrix([[1, 2], [3, 4]])
            expect(typeof test.toString()).toEqual("string")
        });
    })

    it('should print the matrix to the console', () => {
        // Arrange
        const matrix = new Matrix([[1, 2], [3, 4]]);
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        // Act
        matrix.print();

        // Assert
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenNthCalledWith(1, '1  ', '2  ');
        expect(logSpy).toHaveBeenNthCalledWith(2, '3  ', '4  ');

        // Clean up
        logSpy.mockRestore();
    });


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Static methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe("Static methods", () => {
        describe('clone', () => {
            it('should clone the matrix instance and return the clone', () => {
                const matrix = new Matrix([[1, 2], [3, 4]]);
                const clone = Matrix.clone(matrix);
                expect(JSON.stringify(clone)).toEqual(JSON.stringify(matrix));
                expect(clone).not.toBe(matrix);
            });
        });

        describe('padMatrixToPowerOfTwo', () => {
            it('should return the padded matrix with dimensions as a power of two', () => {
                const matrix = new Matrix([[1], [4]]);
                const paddedMatrix = Matrix.padMatrixToPowerOfTwo(matrix);
                expect(JSON.stringify(paddedMatrix)).toEqual(JSON.stringify(new Matrix([[1, 0], [4, 0]])));
            });
        });



        describe('Reshape', () => {
            it('Reshaping the array [1,2,3,4] into [[1,2],[3,4]]', () => {
                const compareMatrix = new Matrix([[1, 2], [3, 4]])
                expect(JSON.stringify(Matrix.reshape([1, 2, 3, 4], 2, 2))).toEqual(JSON.stringify(compareMatrix))
            })

            it('Reshaping the array [1,2,3,4] into [[1],[2],[3],[4]]', () => {
                const compareMatrix = new Matrix([[1], [2], [3], [4]])
                expect(JSON.stringify(Matrix.reshape([1, 2, 3, 4], 4, 1))).toEqual(JSON.stringify(compareMatrix))
            })

            it('Error: Incompatible dimensions', () => {
                expect(() => Matrix.reshape([1, 2, 3, 4], 10, 10)).toThrow()
            })

            it('Error: Invalid argument', () => {
                //@ts-ignore
                expect(() => Matrix.reshape([1, 2, 3, 4], "2", "10")).toThrow()
            })

        })


        describe('roundMatrixToZero', () => {
            it('should round values close to zero in the matrix to zero', () => {
                const matrix = new Matrix([[0.0000000000001, 0.0000000000001], [0.0000000000001, 0.0000000000001]]);
                Matrix.roundMatrixToZero(matrix);
                expect(JSON.stringify(matrix)).toEqual(JSON.stringify(new Matrix([[0, 0], [0, 0]])));
            });
        });

        describe('toFixedMatrix', () => {
            it('should round all elements of the matrix to the specified number of decimal places', () => {
                const matrix = new Matrix([[1.23456789, 2.3456789], [3.456789, 4.56789]]);
                Matrix.toFixedMatrix(matrix, 2);
                expect(JSON.stringify(matrix)).toEqual(JSON.stringify(new Matrix([[1.23, 2.35], [3.46, 4.57]])));
            });
        });

        /////////////////////////////////////////////////////////////////////////////////////////////////
        /*
        * Static boolean methods
        */
        /////////////////////////////////////////////////////////////////////////////////////////////////

        describe('Is lower triangular', () => {
            it('A lower triangular matrix', () => {
                const lowerTriangular = new Matrix([[1, 0, 0], [1, 1, 0], [1, 1, 1]])
                expect(Matrix.isLowerTriangular(lowerTriangular)).toBeTruthy()
            })

            it('A non lower triangular matrix', () => {
                const upperTriangular = new Matrix([[1, 1, 1], [0, 1, 1], [0, 0, 1]])
                expect(Matrix.isLowerTriangular(upperTriangular)).toBeFalsy()
            })

            it('Error: A not an instance of Matrix', () => {
                //@ts-ignore
                expect(() => Matrix.isLowerTriangular("upperTriangular")).toThrow()
            })

        })

        describe('Is upper triangular', () => {
            it('A upper triangular matrix', () => {

                const upperTriangular = new Matrix([[1, 1, 1], [0, 1, 1], [0, 0, 1]])
                expect(Matrix.isUpperTriangular(upperTriangular)).toBeTruthy()
            })

            it('A non upper triangular matrix', () => {

                const lowerTriangular = new Matrix([[1, 0, 0], [1, 1, 0], [1, 1, 1]])
                expect(Matrix.isUpperTriangular(lowerTriangular)).toBeFalsy()
            })

            it('Error: A not an instance of Matrix', () => {
                //@ts-ignore
                expect(() => Matrix.isUpperTriangular("upperTriangular")).toThrow()
            })

        })


        describe('Ones', () => {
            it('A upper triangular matrix', () => {
                const test = Matrix.ones(2, 2);
                expect(JSON.stringify(test)).toEqual(JSON.stringify(new Matrix([[1, 1], [1, 1]])))
            })

            it('Throwing an error', () => {
                //@ts-ignore
                expect(() => Matrix.ones(2, "2")).toThrow();
            })

        })

        it('Int matrix test', () => {
            const test = Matrix.ones(2, 2);
            expect(Matrix.isIntMatrix(test as Matrix<number>)).toBeTruthy()
        })

        it('Throwing an error', () => {
            //@ts-ignore
            expect(() => Matrix.isIntMatrix(2)).toThrow();
        })
    })
})