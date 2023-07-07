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

    describe('Matrix initialization', () => {

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
            expect(() => new Matrix([1,3,[3]])).toThrow()
        });

    });


})