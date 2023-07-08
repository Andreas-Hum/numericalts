const { default: expect } = require("expect")
const matrix_module = require("../dist/matrix/Matrix")
const Matrix = matrix_module.Matrix


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

            const result = twoByThree.getRow(0);
            const expected = [1, 2, 3];
            expect(result).toEqual(expected);
        });

        it('Error: Oout of bounds', () => {
            expect(() => twoByThree.getRow(23)).toThrow();
        });
    });

    describe('Get column', () => {
        it('Return the first column of a 2x3 matrix', () => {

            const result = twoByThree.getColumn(0);
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

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Basic operations add, subtract, scale and naiveMultiply
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
            expect(twoByThree.naiveMultiply(threeByTwo)).toEqual(compareMatrix)
        })

        it('Multiplying a 2x2 with itself', () => {
            const compareMatrix = new Matrix([[7, 10], [15, 22]])
            expect(twoByTwo.naiveMultiply(twoByTwo)).toEqual(compareMatrix)
        })

        it('Error: Incompatible dimensions', () => {
            expect(() => twoByThree.naiveMultiply(twoByThree)).toThrow()
        })

        it('Error: B not an instance of Matrix', () => {
            expect(() => twoByThree.naiveMultiply("threeByTwo")).toThrow()
        })

    })

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
    * Utility methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

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
            // const tester = new Matrix([[1, 1, 2], [0, 1, 4], [0, 0, 2]])
            // const ne = tester.invertUpper()
            // console.log(ne.toString())
            const upperTriangular = new Matrix([[1, 1, 1], [0, 1, 1], [0, 0, 1]])
            expect(Matrix.isUpperTriangular(upperTriangular)).toBeTruthy()
        })

        it('A non upper triangular matrix', () => {
            // const tester = new Matrix([[1, 0, 0], [4, 1, 0], [1, 1, 2]])
            // const ne = tester.invertLower()
            // console.log(ne.toString())
            const lowerTriangular = new Matrix([[1, 0, 0], [1, 1, 0], [1, 1, 1]])
            expect(Matrix.isUpperTriangular(lowerTriangular)).toBeFalsy()
        })

        it('Error: A not an instance of Matrix', () => {
            expect(() => Matrix.isUpperTriangular("upperTriangular")).toThrow()
        })



    })


})

