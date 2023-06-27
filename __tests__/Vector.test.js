const vector_module = require("../dist/vector/Vector")
const Vector = vector_module.Vector

let rowVector123, columnVector123, arrayRow123, arrayColumn123

describe('Vector', () => {


    beforeEach(() => {
        rowVector123 = new Vector([1, 2, 3]);
        columnVector123 = new Vector([[1], [2], [3]]);
        arrayRow123 = [1, 2, 3];
        arrayColumn123 = [[1], [2], [3]]

    });

    describe('Vector initialization', () => {

        it('Validation of a row vector', () => {
            expect(rowVector123.isRow).toBe(true);
            expect(rowVector123.size).toBe(3);
            expect(rowVector123.shape).toBe('(1,3)');
        });

        it('Validation of a column vector', () => {

            expect(columnVector123.isColumn).toBe(true);
            expect(columnVector123.size).toBe(3);
            expect(columnVector123.shape).toBe('(3,1)');
        });

        it('Error: Different types of entries', () => {
            expect(() => new Vector([1, [1], 3])).toThrow();
        })
    });


    // Adding elements

    describe('Vector adding multiple elements', () => {
        it('Add\'s multiple elements to a row vector', () => {
            rowVector123.addElements([4, 5]);
            expect(rowVector123.size).toBe(5);
            expect(rowVector123.shape).toBe('(1,5)');
        });

        it('Add\'s multiple elements to a culumn vector', () => {
            columnVector123.addElements([[4], [5]]);
            expect(columnVector123.size).toBe(5);
            expect(columnVector123.shape).toBe('(5,1)');
        });

        it('Add\'s the elements of two vectors', () => {
            columnVector123.addElements(rowVector123);
            expect(columnVector123.size).toBe(6);
            expect(columnVector123.shape).toBe('(6,1)');
        });

        it('Error: Non valid type is added', () => {
            expect(() => rowVector123.addElements(["4"])).toThrow();
        })

        it('Error: Non array is added', () => {
            expect(() => rowVector123.addElements(4)).toThrow();
        })

        it('Error: Array depth is greater than 1', () => {
            expect(() => rowVector123.addElements([[[1]]])).toThrow();
        })

    });

    // Standard vector operations

    describe('Vector addition', () => {
        it("Add\'s two row vectors together", () => {
            rowVector123.add(rowVector123)
            expect(rowVector123.elements).toStrictEqual([2, 4, 6]);
        });

        it("Add\'s two column vectors together", () => {
            columnVector123.add(columnVector123)
            expect(columnVector123.elements).toStrictEqual([[2], [4], [6]]);
        });

        it("Add\'s a column and a row vector together", () => {
            columnVector123.add(rowVector123)
            expect(columnVector123.elements).toStrictEqual([[2], [4], [6]]);
        });

        it("Add\'s a row vector and an row array", () => {
            rowVector123.add(arrayRow123)
            expect(rowVector123.elements).toStrictEqual([2, 4, 6]);
        });

        it("Add\'s a column vector and an column array", () => {
            columnVector123.add(arrayColumn123)
            expect(columnVector123.elements).toStrictEqual([[2], [4], [6]]);
        });

        it("Add\'s a row vector and an column array", () => {
            rowVector123.add(arrayColumn123)
            expect(rowVector123.elements).toStrictEqual([2, 4, 6]);
        });

        it("Add's multiple row vectors together", () => {
            rowVector123.add(rowVector123, rowVector123);
            expect(rowVector123.elements).toStrictEqual([4, 8, 12]);
        });

        it("Add's multiple column vectors together", () => {
            columnVector123.add(columnVector123, columnVector123);
            expect(columnVector123.elements).toStrictEqual([[4], [8], [12]]);
        });

        it("Add's a row vector, row array and column array together", () => {
            rowVector123.add(arrayRow123, arrayColumn123);
            expect(rowVector123.elements).toStrictEqual([3, 6, 9]);
        });

        it("Error: Non equal sizes", () => {
            const errorVector = new Vector([1, 2, 3, 4])
            expect(() => rowVector123.add(errorVector))
        });

        it("Error: Non equal sizes for multiple vectors", () => {
            const errorVector = new Vector([1, 2, 3, 4])
            expect(() => rowVector123.add(rowVector123, errorVector))
        });


    });


    describe('Vector subtraction', () => {
        it("Subtract\'s two row vectors together", () => {
            rowVector123.subtract(rowVector123)
            expect(rowVector123.elements).toStrictEqual([0, 0, 0]);
        });

        it("Subtract\'s two column vectors together", () => {
            columnVector123.subtract(columnVector123)
            expect(columnVector123.elements).toStrictEqual([[0], [0], [0]]);
        });

        it("Subtract\'s a column and a row vector together", () => {
            columnVector123.subtract(rowVector123)
            expect(columnVector123.elements).toStrictEqual([[0], [0], [0]]);
        });

        it("Subtract\'s a row vector and an row array", () => {
            rowVector123.subtract(arrayRow123)
            expect(rowVector123.elements).toStrictEqual([0, 0, 0]);
        });

        it("Subtract\'s a column vector and an column array", () => {
            columnVector123.subtract(arrayColumn123)
            expect(columnVector123.elements).toStrictEqual([[0], [0], [0]]);
        });

        it("Subtract\'s a row vector and an column array", () => {
            rowVector123.subtract(arrayColumn123)
            expect(rowVector123.elements).toStrictEqual([0, 0, 0]);
        });

        it("Subtract's multiple row vectors together", () => {
            rowVector123.subtract(rowVector123, rowVector123);
            expect(rowVector123.elements).toStrictEqual([0, 0, 0]);
        });

        it("Subtract's multiple column vectors together", () => {
            columnVector123.subtract(columnVector123, columnVector123);
            expect(columnVector123.elements).toStrictEqual([[0], [0], [0]]);
        });

        it("Subtract's a row vector, row array and column array together", () => {
            rowVector123.subtract(arrayRow123, arrayColumn123);
            expect(rowVector123.elements).toStrictEqual([-1, -2, -3]);
        });

        it("Error: Non equal sizes", () => {
            const errorVector = new Vector([1, 2, 3, 4])
            expect(() => rowVector123.subtract(errorVector)).toThrow()
        });

        it("Error: Non equal sizes for multiple vectors", () => {
            const errorVector = new Vector([1, 2, 3, 4])
            expect(() => rowVector123.subtract(rowVector123, errorVector)).toThrow()
        });

    });


    describe('Vector norm', () => {
        it('Euclidean norm of a row vector', () => {
            expect(rowVector123.euclNorm()).toBeCloseTo(Math.sqrt(14));
        });

        it('Euclidean norm of a column vector', () => {
            expect(columnVector123.euclNorm()).toBeCloseTo(Math.sqrt(14));
        });

        it('Infinity norm of a row vector', () => {
            expect(rowVector123.infNorm()).toBeCloseTo(3);
        });

        it('Manhattan norm of a row vector', () => {
            expect(rowVector123.manhNorm()).toBeCloseTo(6);
        });
    });


    describe('Vector normalization', () => {

        it('Normalizing a row vector using Euclidean norm', () => {
            rowVector123.normalize("euclidean");
            const expected = [1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14)];
            expected.forEach((val, i) => expect(rowVector123.elements[i]).toBeCloseTo(val));
        });

        it('Normalizing a column vector using Infinity norm', () => {
            columnVector123.normalize("infinity");
            const expected = [[1 / 3], [2 / 3], [1]];
            expected.forEach((val, i) => expect(columnVector123.elements[i][0]).toBeCloseTo(val[0]));
        });

        it('Normalizing a row vector using Manhattan norm', () => {
            rowVector123.normalize("manhattan");
            const expected = [1 / 6, 2 / 6, 3 / 6];
            expected.forEach((val, i) => expect(rowVector123.elements[i]).toBeCloseTo(val));
        });

        it('Error: Normalizing a zero vector', () => {
            const vector = Vector.zeros(3);
            expect(() => vector.normalize("euclidean")).toThrow();
            expect(() => vector.normalize("infinity")).toThrow();
            expect(() => vector.normalize("manhattan")).toThrow();
        });

        it('Error: Invalid norm type for normalization', () => {
            expect(() => rowVector123.normalize("unknown_type")).toThrow();
        });
    });

    describe('Vector scaling', () => {
        it('Scales a row vector', () => {
            rowVector123.scale(2);
            expect(rowVector123.elements).toStrictEqual([2, 4, 6]);
        });

        it('Scales a column vector', () => {
            columnVector123.scale(2);
            expect(columnVector123.elements).toStrictEqual([[2], [4], [6]]);
        });

        it('Error: Invalid scalar', () => {
            expect(() => columnVector123.scale('two')).toThrow();
        });
    });


    describe('Vector cross product', () => {

        it('Cross product for row vectors', () => {
            expect(rowVector123.cross(rowVector123).elements).toEqual([0, 0, 0]);
        });

        it('Cross product for column vectors', () => {
            expect(columnVector123.cross(columnVector123, true).elements).toEqual([[0], [0], [0]]);
        });

        it('Cross product for column vector and row vector', () => {
            expect(columnVector123.cross(rowVector123, true).elements).toEqual([[0], [0], [0]]);
        });

        it('Cross product for row vector and row array', () => {
            expect(rowVector123.cross(arrayRow123).elements).toEqual([0, 0, 0]);
        });

        it('Error: Mismatched size', () => {
            const vector2 = new Vector([1, 2]);
            expect(() => rowVector123.cross(vector2).elements).toThrow();
        });


    });


    describe('Vector dot product', () => {
        it('Dot product between two row vectors', () => {
            expect(rowVector123.dot(rowVector123)).toBe(14);
        });

        it('Dot product between two column vectors', () => {
            expect(columnVector123.dot(columnVector123)).toBe(14);
        });

        it('Dot product between a row vector and row array', () => {
            expect(rowVector123.dot(arrayRow123)).toBe(14);
        });

        it('Dot product between a row vector and column vector', () => {
            expect(rowVector123.dot(columnVector123)).toBe(14);
        });

        it('Error: ', () => {
            const vector2 = new Vector([1, 2]);
            expect(() => rowVector123.dot(vector2)).toThrow();
        });


    });

    describe('Vector angle', () => {
        it('Calculates angle between two vectors correctly in degrees', () => {
            const vector1 = new Vector([1, 0]);
            const vector2 = new Vector([0, 1]);
            const resultInDegrees = vector1.angle(vector2, true);
            // The angle between [1,0] and [0,1] given in degrees should be 90
            expect(resultInDegrees).toBeCloseTo(90);
        });

        it('Calculates angle between two vectors correctly in radians', () => {
            const vector1 = new Vector([1, 0]);
            const vector2 = new Vector([0, 1]);
            const resultInRadians = vector1.angle(vector2, false);
            // The angle between [1,0] and [0,1] given in radians should be Math.PI / 2
            expect(resultInRadians).toBeCloseTo(Math.PI / 2);
        });

        it('Calculates angle correctly when the inDegrees parameter is not provided', () => {
            const vector1 = new Vector([1, 0]);
            const vector2 = new Vector([0, 1]);
            const result = vector1.angle(vector2);
            // Given no inDegrees parameter, function should default to radians
            // So, the angle between [1,0] and [0,1] should be Math.PI / 2
            expect(result).toBeCloseTo(Math.PI / 2);
        });
        it('Throws an error for vectors of mismatched size', () => {
            const vector1 = new Vector([1, 0, 0]);
            const vector2 = new Vector([0, 1]);
            expect(() => vector1.angle(vector2)).toThrow();
        });

        it('Throws an error for a zero vector', () => {
            const vector1 = new Vector([1, 0]);
            const vector2 = new Vector([0, 0]);
            expect(() => vector1.angle(vector2)).toThrow();
        });

        it('Throws an error for vectors of mismatched size even when inDegrees option is set', () => {
            const vector1 = new Vector([1, 0, 0]);
            const vector2 = new Vector([0, 1]);
            expect(() => vector1.angle(vector2, true)).toThrow();
        });

        it('Throws an error for a zero vector even when inDegrees option is set', () => {
            const vector1 = new Vector([1, 0]);
            const vector2 = new Vector([0, 0]);
            expect(() => vector1.angle(vector2, true)).toThrow();
        });
    });

    describe('Vector distance', () => {
        it('Calculates distance correctly for row vectors', () => {
            const vector1 = new Vector([1, 2, 3]);
            const vector2 = new Vector([4, 5, 6]);
            let distance = vector1.distance(vector2);
            // Calculation of distance needs to be replaced with the correct implementation
            expect(distance).toBeCloseTo(5.2);
        });

        it('Calculates distance correctly for column vectors', () => {
            const vector1 = new Vector([[1], [2], [3]]);
            const vector2 = new Vector([[4], [5], [6]]);
            let distance = vector1.distance(vector2);
            // Calculation of distance needs to be replaced with the correct implementation
            expect(distance).toBeCloseTo(5.2);
        });

        it('Throws an error for vectors of mismatched size', () => {
            const vector1 = new Vector([1, 2, 3]);
            const vector2 = new Vector([1, 2]);
            expect(() => vector1.distance(vector2)).toThrow();
        });

        it('Calculates distance correctly for vectors passed as arrays', () => {
            const vector = new Vector([1, 2, 3]);
            const array = [4, 5, 6];
            let distance = vector.distance(array);
            // Calculation of distance needs to be replaced with the correct implementation
            expect(distance).toBeCloseTo(5.2);
        });
    });

    describe('isOrthogonal', () => {
        const vectorA = new Vector([1, 0]);
        const vectorB = new Vector([[0], [1]]);
        const vectorC = new Vector([1, 2]);

        it('Testing orthogonal vectors', () => {
            expect(vectorA.isOrthogonal(vectorB)).toBe(true);
        });

        it('Testing non-orthogonal vectors', () => {
            expect(vectorA.isOrthogonal(vectorC)).toBe(false);
        });

        it('Throws an error for non-array inputs', () => {
            expect(() => vectorA.isOrthogonal("Test")).toThrow();
        });

        it('Testing array inputs', () => {
            expect(vectorA.isOrthogonal([0, 1])).toBe(true);
            expect(vectorC.isOrthogonal([[1], [2]])).toBe(false);
        });
    });

    describe('isOrthonormal', () => {
        const vectorA = new Vector([1, 0]);
        const vectorB = new Vector([[0], [1]]);
        const unitVector = new Vector([1 / Math.sqrt(2), 1 / Math.sqrt(2)]);

        it('Testing orthonormal vectors', () => {
            expect(vectorA.isOrthonormal(vectorB)).toBe(true);
        });

        it('Testing non-orthogonal vectors', () => {
            expect(vectorA.isOrthonormal(vectorA)).toBe(false);  // Not orthogonal to itself
        });

        it('Testing non-unit vectors', () => {
            const vectorC = new Vector([1, 2]);
            expect(vectorA.isOrthonormal(vectorC)).toBe(false);  // Not a unit vector
        });

        it('Testing unit vectors', () => {
            expect(vectorA.isOrthonormal(unitVector)).toBe(false);  // Unit but not orthogonal
        });

        it('Testing orthonormal array vectors', () => {
            expect(vectorA.isOrthonormal([0, 1])).toBe(true);
            expect(vectorA.isOrthonormal([[1], [2]])).toBe(false);
        });

        it('Throws an error for non-array inputs', () => {
            expect(() => vectorA.isOrthonormal("Test")).toThrow();
        });
    });


    describe('Vector equality ', () => {
        const vector1 = new Vector([[1], [2], [3], [4]]);
        const vector2 = new Vector([1, 2, 3, 4 + 1e-11]);  // a tiny difference on last element
        const vector3 = new Vector([1, 2, 3, 4, 5, 6]);  // different shape
        const vector4 = [1, 2, 3, 4]

        it('Vectors are equal in non-strict mode', () => {
            expect(vector1.equal(vector2)).toBe(true);
        });

        it('Vectors are equal in strict mode', () => {
            expect(vector2.equal(vector4, true)).toBe(true);
        });

        it('Vectors are equal to array', () => {
            expect(vector2.equal(vector4)).toBe(true);
        });

        it('Vectors are not equal in strict mode', () => {
            expect(() => vector1.equal(vector2, true)).toThrow();
        });

        it('Different shapes cause an exception', () => {
            expect(() => vector1.equal(vector3)).toThrow();
        });
    });

    describe('Vector of ones ', () => {
        const vector1 = Vector.ones(4);
        const vector2 = Vector.ones(4, true);
        const vector3 = new Vector([1, 1, 1, 1])
        const vector4 = new Vector([[1], [1], [1], [1]])

        it('Vector equality of ones on row vector', () => {
            expect(vector1.equal(vector3)).toBe(true);
        });

        it('Vector equality of ones on column vector', () => {
            expect(vector2.equal(vector4)).toBe(true);
        });
    });


    describe('Vector of zeros ', () => {
        const vector1 = Vector.zeros(4);
        const vector2 = Vector.zeros(4, true);
        const vector3 = new Vector([0, 0, 0, 0])
        const vector4 = new Vector([[0], [0], [0], [0]])

        it('Vector equality of zeros on row vector', () => {
            expect(vector1.equal(vector3)).toBe(true);
        });

        it('Vector equality of zeros on column vector', () => {
            expect(vector2.equal(vector4)).toBe(true);
        });
    });



    describe('Vector projection', () => {
        const vector1 = new Vector([3, 4]);
        const vector2 = new Vector([5, -12]);
        const vector3 = new Vector([[3], [4]]);
        const vector4 = new Vector([[5], [-12]]);
        const zeroVector = new Vector([0, 0])


        it('Vector projection with two row vectos', () => {
            const expected = [-(165 / 169), 396 / 169];
            const projVector = vector1.proj(vector2)
            expected.forEach((val, i) => expect(projVector.elements[i]).toBeCloseTo(val));

        });

        it('Vector projection with two column vectos', () => {
            const expected = [[-(165 / 169)], [396 / 169]];
            const projVector = vector3.proj(vector4, true)
            expected.forEach((val, i) => expect(projVector.elements[i][0]).toBeCloseTo(val[0]));

        });

        it('Vector projection with one column and one row vector', () => {
            const expected = [-(165 / 169), 396 / 169];
            const projVector = vector1.proj(vector4)
            expected.forEach((val, i) => expect(projVector.elements[i]).toBeCloseTo(val));

        });

        it('Vector projection on zero vector throws an error', () => {
            expect(() => vector1.proj(zeroVector)).toThrow();

        });


    });

    describe('Vector transpose', () => {
        const vector1 = new Vector([3, 4]);
        const vector2 = new Vector([[3], [4]]);

        it('Vector transpose of a row vector', () => {
            vector1.transpose()
            expect(vector1.equal(vector2)).toBe(true);

        });
        it('Vector transpose of a column vector', () => {
            vector2.transpose()
            expect(vector2.equal(vector1)).toBe(true);

        });
    });

    describe('Vector mean', () => {
        const vector1 = new Vector([1, 2, 3, 4, 5, 6, 7, 8]);
        const vector2 = new Vector([[1], [2], [3], [4], [5], [6], [7], [8]]);

        it('Vector mean of a row vector', () => {
            expect(vector1.mean()).toBeCloseTo(4.5);

        });
        it('Vector mean of a column vector', () => {
            expect(vector2.mean()).toBeCloseTo(4.5);

        });
    });

    describe('Vector sum', () => {
        const vector1 = new Vector([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const vector2 = new Vector([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]]);

        it('Vector sum of a row vector', () => {
            expect(vector1.sum()).toEqual(55);

        });
        it('Vector sum of a column vector', () => {
            expect(vector2.sum()).toEqual(55);

        });
    });


    describe('Create unit vector ', () => {
        const vector1 = Vector.createUnitVector(3, 0);
        const vector2 = Vector.createUnitVector(3, 0, true);

        it('Create a row unit vector', () => {
            expect(vector1.equal([1, 0, 0])).toEqual(true);

        });

        it('Create a column unit vector', () => {
            expect(vector2.equal([[1], [0], [0]])).toEqual(true);

        });

        it('Throws an error for index > size', () => {
            expect(() => Vector.createUnitVector(3, 4)).toThrow();

        });

        it('Throws an error for index < 0', () => {
            expect(() => Vector.createUnitVector(3, -1)).toThrow();

        });



    });







});
