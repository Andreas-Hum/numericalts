const { default: expect } = require("expect")
const matrix_module = require("../dist/matrix/newMatrix")
const Matrix = matrix_module.Matrix


let twoByThree, threeByTwo
describe('Matrix', () => {


    beforeEach(() => {
        twoByThree = new Matrix([[1, 2, 3], [4, 5, 6]]);
        threeByTwo = new Matrix([[1, 4], [2, 5], [3, 6]]);
    });


    
})