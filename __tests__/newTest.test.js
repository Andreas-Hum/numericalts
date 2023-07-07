const { default: expect } = require("expect")
const matrix_module = require("../dist/matrix/newMatrix")
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

        it('Error: out of bounds', () => {
            expect(() => twoByThree.getElement(10, 10)).toThrow()
        })
    })

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

        it('Error: Invalid element', () => {
            expect(() => twoByThree.setElement(0, 0, "error")).toThrow()
        })
    })

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Basic operations add, subtract, scalæ and naiveMultiply
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

    })



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Static boolean methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Static factory methods
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////


})