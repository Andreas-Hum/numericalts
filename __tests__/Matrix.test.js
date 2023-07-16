const { default: expect } = require("expect")
const Matrix = require("../dist/matrix").default

let twoByThree, threeByTwo, twoByTwo
describe('Matrix', () => {


    beforeEach(() => {
        twoByThree = new Matrix([[1, 2, 3], [4, 5, 6]]);
        threeByTwo = new Matrix([[1, 4], [2, 5], [3, 6]]);
        twoByTwo = new Matrix([[1, 2], [3, 4]]);

    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Validation
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////s

    describe('Initialization and validation', () => {

        it('Validation of a 2x3 matrix', () => {
            expect(twoByThree.isWide).toBeTruthy();
            expect(twoByThree.isTall).toBeFalsy();
            expect(twoByThree.isSquare).toBeFalsy();

            expect(twoByThree.size).toBe(6);
            expect(twoByThree.shape).toBe('(2,3)');
        });

        it('Validation of a 3x2 matrix', () => {
            expect(threeByTwo.isWide).toBeFalsy();
            expect(threeByTwo.isTall).toBeTruthy();
            expect(threeByTwo.isSquare).toBeFalsy();

            expect(threeByTwo.size).toBe(6);
            expect(threeByTwo.shape).toBe('(3,2)');
        });


        it('Validation of a 2x2 matrix', () => {
            expect(twoByTwo.isWide).toBeFalsy();
            expect(twoByTwo.isTall).toBeFalsy();
            expect(twoByTwo.isSquare).toBeTruthy();

            expect(twoByTwo.size).toBe(4);
            expect(twoByTwo.shape).toBe('(2,2)');
        });


        it('Error: Invalid elements', () => {
            expect(() => new Matrix([1, 3, [3]])).toThrow()
        });

    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Set and get element
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe('Get element', () => {

        it('Get first element', () => {
            expect(twoByThree.getElement(0, 0)).toEqual(1)
            expect(threeByTwo.getElement(0, 0)).toEqual(1)
        })


        it('Get last element', () => {
            expect(twoByThree.getElement(1, 2)).toEqual(6)
            expect(threeByTwo.getElement(2, 1)).toEqual(6)
        })

        it('Error: Out of bounds', () => {
            expect(() => twoByThree.getElement(10, 10)).toThrow()
        })

        it('Error: Invalid arguments', () => {
            expect(() => twoByThree.getElement("10", 10)).toThrow()
        })
    })

    describe('Get row', () => {
        it('Return the first row of a 2x3 matrix', () => {

            const result = twoByThree.getRow(1);
            const expected = [1, 2, 3];
            expect(result).toEqual(expected);
        });

        it('Error: Oout of bounds', () => {
            expect(() => twoByThree.getRow(23)).toThrow();
        });
    });

    describe('Get column', () => {
        it('Return the first column of a 2x3 matrix', () => {

            const result = twoByThree.getColumn(1);
            const expected = [1, 4];
            expect(result).toEqual(expected);
        });

        it('Error: out of bounds', () => {
            expect(() => twoByThree.getColumn(23)).toThrow();
        });
    });

    describe('Set element', () => {
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
            expect(() => twoByThree.setElement(0, 0, "error")).toThrow()
        })

        it('Error: Invalid argument', () => {
            expect(() => twoByThree.setElement(0, "0", 10)).toThrow()
        })
    })

    describe('getSubMatrix', () => {
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
    });

    describe('setSubMatrix', () => {
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
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Basic operations add, subtract, scale and multiply
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe('Addition', () => {
        it('Adding a 2x3 matrix with itself', () => {
            const compareMatrix = new Matrix([[2, 4, 6], [8, 10, 12]])
            expect(twoByThree.add(twoByThree)).toEqual(compareMatrix)
        })

        it('Adding a 2x2 matrix with itself', () => {
            const compareMatrix = new Matrix([[2, 4], [6, 8]])
            expect(twoByTwo.add(twoByTwo)).toEqual(compareMatrix)
        })

        it('Error: Incompatible dimensions', () => {
            expect(() => twoByThree.add(threeByTwo)).toThrow()
        })

        it('Error: B not an instance of Matrix', () => {
            expect(() => twoByThree.add("threeByTwo")).toThrow()
        })

    })



    describe("pow", () => {
        it("should raise the matrix to the specified power", () => {
            const matrix = new Matrix([[1, 2], [3, 4]]);

            // Test with exponent 0
            expect(matrix.pow(0)).toEqual(new Matrix([[1, 0], [0, 1]]));

            // Test with exponent 1
            expect(matrix.pow(1)).toEqual(matrix);

            // // Test with positive exponent
            expect(matrix.pow(2)).toEqual(new Matrix([[7, 10], [15, 22]]));

            // // Test with negative exponent
            // expect(matrix.pow(-1)).toEqual(new Matrix([[-2, 1], [1.5, -0.5]]));

            // // Test with larger exponent
            // expect(matrix.pow(5)).toEqual(new Matrix([[1069, 1558], [2337, 3406]]));
        });

        it("should throw a MatrixError if the matrix is not square", () => {
            const nonSquareMatrix = new Matrix([[1, 2, 3], [4, 5, 6]]);

            expect(() => {
                nonSquareMatrix.pow(2);
            }).toThrow();
        });
    });

    describe('Scaling', () => {
        it('Scaling a 2x3 matrixwith 2', () => {
            const compareMatrix = new Matrix([[2, 4, 6], [8, 10, 12]])
            expect(twoByThree.scale(2)).toEqual(compareMatrix)
        })

        it('Adding a 2x2 matrix with 3', () => {
            const compareMatrix = new Matrix([[3, 6], [9, 12]])
            expect(twoByTwo.scale(3)).toEqual(compareMatrix)
        })

        it('Error: Invalid scalar', () => {
            expect(() => twoByThree.scale("invalid")).toThrow()
        })

    })

    describe('Strassens', () => {

        // Test multiplication of 2x2 matrices
        test('2x2 Matrix multiplication', () => {
            const A = new Matrix(new Float32Array([1, 2, 3, 4]), 2, 2);
            const B = new Matrix(new Float32Array([2, 0, 1, 2]), 2, 2);
            const result = A.strassenMultiply(B);

            // Expected result is a new Matrix with elements [4, 4, 10, 8]
            expect(result).toEqual(new Matrix(new Float32Array([4, 4, 10, 8]), 2, 2));
        });

        // Test multiplication of matrices of size that is a power of two
        test('Power of two Matrix multiplication', () => {
            const A = new Matrix(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]), 4, 4);
            const B = new Matrix(new Float32Array([16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]), 4, 4);
            const result = A.strassenMultiply(B);

            // Expected result is manually calculated
            const expectedResult = new Float32Array([80, 70, 60, 50, 240, 214, 188, 162, 400, 358, 316, 274, 560, 502, 444, 386]);
            expect(result).toEqual(new Matrix(expectedResult, 4, 4));
        });

        // Test multiplication of a non-square matrix
        test('Non-square Matrix multiplication', () => {
            const A = new Matrix(new Float32Array([1, 2, 3, 4, 5, 6]), 2, 3);
            const B = new Matrix(new Float32Array([2, 0, 1, 2, 1, 2]), 3, 2);

            expect(() => {
                A.strassenMultiply(B);
            }).toThrow();
        });

        // Test multiplication of a matrix with dimensions not a power of two
        test('Not power of two Matrix multiplication', () => {
            const A = new Matrix(new Float32Array([1, 2, 3, 4, 5, 6, 7, 8, 9]), 3, 3);
            const B = new Matrix(new Float32Array([9, 8, 7, 6, 5, 4, 3, 2, 1]), 3, 3);
            const result = A.strassenMultiply(B);


            // Expected result is manually calculated
            const expectedResult = new Float32Array([30, 24, 18, 84, 69, 54, 138, 114, 90]);
            expect(result).toEqual(new Matrix(expectedResult, 3, 3));
        });
    });


    describe('Subtraction', () => {
        it('Subtracting a 2x3 with itself', () => {
            const compareMatrix = new Matrix([[0, 0, 0], [0, 0, 0]])
            expect(twoByThree.subtract(twoByThree)).toEqual(compareMatrix)
        })

        it('Adding a 2x2 with itself', () => {
            const compareMatrix = new Matrix([[0, 0], [0, 0]])
            expect(twoByTwo.subtract(twoByTwo)).toEqual(compareMatrix)
        })

        it('Error: Incompatible dimensions', () => {
            expect(() => twoByThree.subtract(threeByTwo)).toThrow()
        })

        it('Error: B not an instance of Matrix', () => {
            expect(() => twoByThree.subtract("threeByTwo")).toThrow()
        })

    })

    describe('Naive multiplication', () => {
        it('Multiplying a 2x3 matrix with a 3x2', () => {
            const compareMatrix = new Matrix([[14, 32], [32, 77]])

            expect(twoByThree.multiply(threeByTwo)).toEqual(compareMatrix)
        })

        it('Multiplying a 2x2 with itself', () => {
            const compareMatrix = new Matrix([[7, 10], [15, 22]])
            expect(twoByTwo.multiply(twoByTwo)).toEqual(compareMatrix)
        })

        it('Error: Incompatible dimensions', () => {
            expect(() => twoByThree.multiply(twoByThree)).toThrow()
        })

        it('Error: B not an instance of Matrix', () => {
            expect(() => twoByThree.multiply("threeByTwo")).toThrow()
        })

    })

    describe('Vector matrix multiply', () => {

        it('should perform vector-matrix multiplication correctly', () => {
            const matrix = new Matrix([[1, 2, 3],
            [4, 5, 6]]);
            const vector = [2, 3, 4];

            const expected = new Matrix([[2, 6, 12], [8, 15, 24]]);

            matrix.vMultiply(vector);

            expect(matrix.vMultiply(vector)).toEqual(expected);
        });

        it('should throw an error if the input vector is not an array', () => {
            const matrix = new Matrix([[1, 2, 3]]);
            const invalidVector = 'not an array';

            expect(() => matrix.vMultiply(invalidVector)).toThrow();

        });

        it('should throw an error if the input vector length does not match the number of columns in the matrix', () => {
            const matrix = new Matrix([[1, 2, 3]]);
            const invalidVector = [1, 2];
            expect(() => matrix.vMultiply(invalidVector)).toThrow();

        });
    });


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Solving systems
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


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
            expect(() => solTest.backSubstitution("[4, 2, 13]")).toThrow()
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
            expect(() => solTest.forwardSubstitution("[4, 2, 13]")).toThrow()
        });
    });



    describe('QR decomposition', () => {
        it('QR decomposition with a 2x2 row matrix [[1,1],[0,1]]', () => {
            const testMatrix = new Matrix([[1, 1], [0, 1]])
            const { Q, R } = testMatrix.QRDecomposition()


            expect(Q).toEqual(new Matrix([[1, 0], [0, 1]]))
            expect(R).toEqual(new Matrix([[1, 1], [0, 1]]))
        });

        it('QR decomposition with a 4x4 row matrix [[0,0,1,0],[1,0,0,0],[0,1,1,0],[0,0,0,1]]', () => {
            const testMatrix = new Matrix([[0, 0, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [0, 0, 0, 1]])
            const { Q, R } = testMatrix.QRDecomposition()


            expect(Q).toEqual(new Matrix([
                [0, 0, 1, 0],
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 1]]))
            expect(R).toEqual(new Matrix([
                [1, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]]))
        });

        it('QR decomposition with a 4x3 row matrix [[0,0,1],[1,0,0],[0,1,1],[0,0,0]]', () => {
            const testMatrix = new Matrix([[0, 0, 1], [1, 0, 0], [0, 1, 1], [0, 0, 0]])
            const { Q, R } = testMatrix.QRDecomposition()

            expect(Q).toEqual(new Matrix([
                [0, 0, 1],
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 0]]))

            expect(R).toEqual(new Matrix([
                [1, 0, 0],
                [0, 1, 1],
                [0, 0, 1]]))
        });

        it('Error: Non linear independent columns', () => {
            const testMatrix = new Matrix([[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]])
            expect(() => testMatrix.QRDecomposition()).toThrow()

        });



    });


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Inverting
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe("Inverting an upper triangular matrix", () => {
        test("Inverting a 3x3 upper triangular matrix", () => {
            const matrix = new Matrix([[1, 2, 3], [0, 4, 5], [0, 0, 6]]);

            const expected = new Matrix([[1, - 1 / 2, -1 / 12], [0, 1 / 4, -5 / 24], [0, 0, 1 / 6]]);

            const result = matrix.invertUpper();

            expect(result).toEqual(expected);
        });

        test("Error: Not a square matrix", () => {
            const matrix = new Matrix([[1, 2, 3], [0, 4, 5]]);

            expect(() => {
                matrix.invertUpper();
            }).toThrow();
        });

        test("Error: Non upper triangular matrix", () => {
            const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

            expect(() => {
                matrix.invertUpper();
            }).toThrow();
        });
    });

    describe("Inverting a lower triangular matrix", () => {
        test("Inverting a 3x3 lower triangular matrix", () => {
            const matrix = new Matrix([[1, 0, 0], [2, 3, 0], [4, 5, 6]]);
            const expected = new Matrix([[1, 0, 0], [-2 / 3, 1 / 3, 0], [-1 / 9, -5 / 18, 1 / 6]]);

            const result = matrix.invertLower();

            expect(result).toEqual(expected);
        });

        test("Error: Not a square matrix", () => {
            const matrix = new Matrix([[1, 2, 3], [0, 4, 5]]);

            expect(() => {
                matrix.invertLower();
            }).toThrow();
        });

        test("Error: Non lower triangular matrix", () => {
            const matrix = new Matrix([[1, 2, 3], [0, 4, 5], [6, 7, 8]]);

            expect(() => {
                matrix.invertLower();
            }).toThrow();
        });
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe('Augment', () => {
        it('Converting a 2x3 Matrix to a 2d array', () => {
            const compareArray = new Matrix([[1, 2, 3], [3, 4, 7], [6, 5, 9]])
            const compareArray2 = new Matrix([[0], [2], [11]])

            expect(compareArray.augment(compareArray2)).toEqual(new Matrix([[1, 2, 3, 0], [3, 4, 7, 2], [6, 5, 9, 11]]))
        })

    })

    describe('To array', () => {
        it('Converting a 2x3 Matrix to a 2d array', () => {
            const compareArray = [[1, 2, 3], [4, 5, 6]]
            expect(twoByThree.toArray()).toEqual(compareArray)
        })

        it('Converting a 3x2 Matrix to a 2d array', () => {
            const compareArray = [[1, 4], [2, 5], [3, 6]]
            expect(threeByTwo.toArray()).toEqual(compareArray)
        })

        it('Converting a 2x2 Matrix to a 2d array', () => {
            const compareArray = [[1, 2], [3, 4]]
            expect(twoByTwo.toArray()).toEqual(compareArray)
        })

    })

    describe('gaussianElimination', () => {
        it('First matrix', () => {
            const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            const result = matrix.gaussianElimination();
            const expected = new Matrix([[1, 2, 3], [0, -3, -6], [0, 0, 0]]);
            expect(result).toEqual(expected);
        });

        it('Second matrix', () => {
            const matrix = new Matrix([[10, 11, 12], [13, 14, 15], [16, 17, 18]]);
            const result = matrix.gaussianElimination();

            const expected = new Matrix([[10, 11, 12], [0, -3 / 10, -3 / 5], [0, 0, 0]]);
            expect(result).toEqual(expected);
        });
        test('Third matrix', () => {
            const matrix = new Matrix([[3, 2, 1, 23], [4, 3, 5, 13], [5, 3, 2, 22]]);
            const result = matrix.gaussianElimination();

            const expected = new Matrix([[3, 2, 1, 23], [0, 1 / 3, 11 / 3, -53 / 3], [0, 0, 4, -34]]);
            expect(result).toEqual(expected);
        });
    });

    describe('GaussJordan', () => {
        it('First matrix', () => {
            const matrix = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
            const result = matrix.gaussJordan();
            const expected = new Matrix([[1, 0, -1], [0, 1, 2], [0, 0, 0]]);
            result.mElements[3] = 0;
            expect(result).toEqual(expected);
        });

        it('Second matrix', () => {
            const matrix = new Matrix([[10, 11, 12], [13, 14, 15], [16, 17, 18]]);
            const result = matrix.gaussJordan();

            const expected = new Matrix([[1, 0, -1], [0, 1, 2], [0, 0, 0]]);
            result.mElements[3] = 0;

            expect(result).toEqual(expected);
        });
        test('Third matrix', () => {
            const matrix = new Matrix([[3, 2, 1], [4, 3, 5], [5, 3, 2]]);
            const result = matrix.gaussJordan();

            const expected = new Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
            expect(result).toEqual(expected);
        });
    });

    describe('Transpose', () => {
        it('Transposing a 2x2 matrix', () => {
            const compareMatrix = new Matrix([[1, 3], [2, 4]])
            expect(twoByTwo.transpose()).toEqual(compareMatrix)
        })

        it('Transposing a 2x3 matrix', () => {
            expect(twoByThree.transpose(twoByThree)).toEqual(threeByTwo)
        })

    })



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Static methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    describe('Reshape', () => {
        it('Reshaping the array [1,2,3,4] into [[1,2],[3,4]]', () => {
            const compareMatrix = new Matrix([[1, 2], [3, 4]])
            expect(Matrix.reshape([1, 2, 3, 4], 2, 2)).toEqual(compareMatrix)
        })

        it('Reshaping the array [1,2,3,4] into [[1],[2],[3],[4]]', () => {
            const compareMatrix = new Matrix([[1], [2], [3], [4]])
            expect(Matrix.reshape([1, 2, 3, 4], 4, 1)).toEqual(compareMatrix)
        })

        it('Error: Incompatible dimensions', () => {
            expect(() => Matrix.reshape([1, 2, 3, 4], 10, 10)).toThrow()
        })

        it('Error: Invalid argument', () => {
            expect(() => Matrix.reshape([1, 2, 3, 4], "2", "10")).toThrow()
        })

    })





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
            expect(() => Matrix.isUpperTriangular("upperTriangular")).toThrow()
        })



    })


})

