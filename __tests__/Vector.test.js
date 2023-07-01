const vector_module = require("../dist/vector/Vector")
const Vector = vector_module.Vector

let rowVector123, columnVector123, arrayRow123, arrayColumn123, unitVector10, unitVector01, rowVector1234, columnVector1234

describe('Vector', () => {


    beforeEach(() => {
        rowVector123 = new Vector([1, 2, 3]);
        columnVector123 = new Vector([[1], [2], [3]]);
        rowVector1234 = new Vector([1, 2, 3, 4])
        columnVector1234 = new Vector([[1], [2], [3], [4]])

        arrayRow123 = [1, 2, 3];
        arrayColumn123 = [[1], [2], [3]];
        unitVector01 = Vector.createUnitVector(2, 1);
        unitVector10 = Vector.createUnitVector(2, 0);


    });

    describe('Vector initialization', () => {

        it('Validation of a row vector', () => {
            expect(rowVector123.isRowVector).toBeTruthy();
            expect(rowVector123.isColumnVector).toBeFalsy();


            expect(rowVector123.size).toBe(3);
            expect(rowVector123.shape).toBe('(1,3)');
        });

        it('Validation of a column vector', () => {

            expect(columnVector123.isColumnVector).toBeTruthy();
            expect(columnVector123.isRowVector).toBeFalsy();

            expect(columnVector123.size).toBe(3);
            expect(columnVector123.shape).toBe('(3,1)');
        });

        it('Error: Different types of entries', () => {
            expect(() => new Vector([1, [1], 3])).toThrow();
        })
    });


    // Adding vElements

    describe('Vector adding multiple vElements', () => {
        it('Add\'s multiple vElements to a row vector', () => {
            rowVector123.addElements([4, 5]);
            expect(rowVector123.size).toBe(5);
            expect(rowVector123.shape).toBe('(1,5)');
        });

        it('Add\'s multiple vElements to a culumn vector', () => {
            columnVector123.addElements([[4], [5]]);
            expect(columnVector123.size).toBe(5);
            expect(columnVector123.shape).toBe('(5,1)');
        });

        it('Add\'s the vElements of two vectors', () => {
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
            const res = rowVector123.add(rowVector123)
            expect(res.vElements).toStrictEqual([2, 4, 6]);
        });

        it("Add\'s two column vectors together", () => {
            const res = columnVector123.add(columnVector123)
            expect(res.vElements).toStrictEqual([[2], [4], [6]]);
        });

        it("Add\'s a column and a row vector together", () => {
            const res = columnVector123.add(rowVector123)
            expect(res.vElements).toStrictEqual([[2], [4], [6]]);
        });

        it("Add\'s a row vector and an row array", () => {
            const res = rowVector123.add(arrayRow123)
            expect(res.vElements).toStrictEqual([2, 4, 6]);
        });

        it("Add\'s a column vector and an column array", () => {
            const res = columnVector123.add(arrayColumn123)
            expect(res.vElements).toStrictEqual([[2], [4], [6]]);
        });

        it("Add\'s a row vector and an column array", () => {
            const res = rowVector123.add(arrayColumn123)
            expect(res.vElements).toStrictEqual([2, 4, 6]);
        });

        it("Add's multiple row vectors together", () => {
            const res = rowVector123.add(rowVector123, rowVector123);
            expect(res.vElements).toStrictEqual([2, 4, 6]);
        });

        it("Add's multiple column vectors together", () => {
            const res = columnVector123.add(columnVector123, columnVector123);
            expect(res.vElements).toStrictEqual([[2], [4], [6]]);
        });

        it("Add's a row vector, row array and column array together", () => {
            const res = rowVector123.add(arrayRow123, arrayColumn123);
            expect(res.vElements).toStrictEqual([2, 4, 6]);
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
            const res = rowVector123.subtract(rowVector123)
            expect(res.vElements).toStrictEqual([0, 0, 0]);
        });

        it("Subtract\'s two column vectors together", () => {
            const res = columnVector123.subtract(columnVector123)
            expect(res.vElements).toStrictEqual([[0], [0], [0]]);
        });

        it("Subtract\'s a column and a row vector together", () => {
            const res = columnVector123.subtract(rowVector123)
            expect(res.vElements).toStrictEqual([[0], [0], [0]]);
        });

        it("Subtract\'s a row vector and an row array", () => {
            const res = rowVector123.subtract(arrayRow123)
            expect(res.vElements).toStrictEqual([0, 0, 0]);
        });

        it("Subtract\'s a column vector and an column array", () => {
            const res = columnVector123.subtract(arrayColumn123)
            expect(res.vElements).toStrictEqual([[0], [0], [0]]);
        });

        it("Subtract\'s a row vector and an column array", () => {
            const res =  rowVector123.subtract(arrayColumn123)
            expect(res.vElements).toStrictEqual([0, 0, 0]);
        });

        it("Subtract's multiple row vectors together", () => {
            const res = rowVector123.subtract(rowVector123, rowVector123);
            expect(res.vElements).toStrictEqual([0, 0, 0]);
        });

        it("Subtract's multiple column vectors together", () => {
            const res = columnVector123.subtract(columnVector123, columnVector123);
            expect(res.vElements).toStrictEqual([[0], [0], [0]]);
        });

        it("Subtract's a row vector, row array and column array together", () => {
            const res = rowVector123.subtract(arrayRow123, arrayColumn123);
            expect(res.vElements).toStrictEqual([0, 0, 0]);
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
            const res =  rowVector123.normalize("euclidean");
            const expected = [1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14)];
            expected.forEach((val, i) => expect(res.vElements[i]).toBeCloseTo(val));
        });

        it('Normalizing a column vector using Infinity norm', () => {
            const res =  columnVector123.normalize("infinity");
            const expected = [[1 / 3], [2 / 3], [1]];
            expected.forEach((val, i) => expect(res.vElements[i][0]).toBeCloseTo(val[0]));
        });

        it('Normalizing a row vector using Manhattan norm', () => {
            const res =  rowVector123.normalize("manhattan");
            const expected = [1 / 6, 2 / 6, 3 / 6];
            expected.forEach((val, i) => expect(res.vElements[i]).toBeCloseTo(val));
        });

        it('Error: Normalizing a zero vector', () => {
            const vector = Vector.zeros(3);
            // expect(() => vector.normalize("euclidean")).toThrow();
            expect(() => vector.normalize("infinity")).toThrow();
            expect(() => vector.normalize("manhattan")).toThrow();
        });

        it('Error: Invalid norm type for normalization', () => {
            expect(() => rowVector123.normalize("unknown_type")).toThrow();
        });
    });

    describe('Vector scaling', () => {
        it('Scales a row vector', () => {
            const res =  rowVector123.scale(2);
            expect(res.vElements).toStrictEqual([2, 4, 6]);
        });

        it('Scales a column vector', () => {
            const res =  columnVector123.scale(2);
            expect(res.vElements).toStrictEqual([[2], [4], [6]]);
        });

        it('Error: Invalid scalar', () => {
            expect(() => columnVector123.scale('two')).toThrow();
        });
    });


    describe('Vector cross product', () => {

        it('Cross product for row vectors', () => {
            expect(rowVector123.cross(rowVector123).vElements).toEqual([0, 0, 0]);
        });

        it('Cross product for column vectors', () => {
            expect(columnVector123.cross(columnVector123, true).vElements).toEqual([[0], [0], [0]]);
        });

        it('Cross product for column vector and row vector', () => {
            expect(columnVector123.cross(rowVector123, true).vElements).toEqual([[0], [0], [0]]);
        });

        it('Cross product for row vector and row array', () => {
            expect(rowVector123.cross(arrayRow123).vElements).toEqual([0, 0, 0]);
        });

        it('Error: Mismatched size', () => {
            expect(() => rowVector123.cross(rowVector1234).vElements).toThrow();
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

        it('Error: Missmatches size', () => {
            expect(() => rowVector123.dot(rowVector1234)).toThrow();
        });


    });


    describe('Vector angle', () => {
        it('Angle between two row vectors in degrees', () => {
            expect(unitVector10.angle(unitVector01, true)).toBeCloseTo(90);
        });

        it('Angle between two row vectors in radians', () => {
            expect(unitVector10.angle(unitVector01, false)).toBeCloseTo(Math.PI / 2);
        });

        it('Angle between a row vector and column vector in radians', () => {
            unitVector01.transpose()
            expect(unitVector10.angle(unitVector01)).toBeCloseTo(Math.PI / 2);
        });


        it('Angle between a row vector and row array', () => {
            expect(unitVector10.angle([0, 1])).toBeCloseTo(Math.PI / 2);
        });


        it('Error: Mismatched size', () => {
            expect(() => rowVector123.angle(unitVector01)).toThrow();
        });

        it('Error: Zero vector', () => {
            const errorVector = Vector.zeros(2)
            expect(() => unitVector10.angle(errorVector)).toThrow();
        });
    });

    describe('Vector distance', () => {
        it('Distance between two row vectors', () => {
            const vector2 = new Vector([4, 5, 6]);
            expect(rowVector123.distance(vector2)).toBeCloseTo(5.2);
        });

        it('Distance between two column vectors', () => {
            const vector2 = new Vector([[4], [5], [6]]);
            expect(columnVector123.distance(vector2)).toBeCloseTo(5.2);
        });

        it('Distance between row vector and column vector', () => {
            const vector2 = new Vector([[4], [5], [6]]);
            expect(rowVector123.distance(vector2)).toBeCloseTo(5.2);
        });


        it('Distance between row vector and row array ', () => {
            const array = [4, 5, 6];
            expect(rowVector123.distance(array)).toBeCloseTo(5.2);
        });

        it('Error: mismatched size', () => {
            expect(() => rowVector123.distance(rowVector1234)).toThrow();
        });


    });

    describe('isOrthogonal', () => {

        it('Orthogonal row vectors', () => {
            expect(unitVector10.isOrthogonal(unitVector01)).toBeTruthy();
        });

        it('Non-orthogonal row vectors', () => {
            expect(unitVector10.isOrthogonal(unitVector10)).toBeFalsy();
        });

        it('Orthogonal row vector and row array', () => {
            expect(unitVector10.isOrthogonal([0, 1])).toBeTruthy();
        });

        it('Error: Invalid element', () => {
            expect(() => unitVector01.isOrthogonal("Test")).toThrow();
        });
        it('Error: Mismatched size', () => {
            expect(() => unitVector01.isOrthogonal(rowVector123)).toThrow();
        });



    });

    describe('isOrthonormal', () => {
        const unitVector = new Vector([1 / Math.sqrt(2), 1 / Math.sqrt(2)]);

        it('Orthonormal row vectors', () => {
            expect(unitVector10.isOrthonormal(unitVector01)).toBeTruthy();
        });

        it('Non-orthogonal row vectors', () => {
            expect(unitVector10.isOrthonormal(unitVector10)).toBeFalsy();  // Not orthogonal to itself
        });

        it('Orthonormal row vector and row array', () => {
            expect(unitVector10.isOrthonormal([0, 1])).toBeTruthy();
        });

        it('Error: Invalid element', () => {
            expect(() => unitVector01.isOrthonormal("Test")).toThrow();
        });
        it('Error: Mismatched size', () => {
            expect(() => unitVector01.isOrthonormal(rowVector123)).toThrow();
        });


    });


    describe('isPositive', () => {
        it('No negative numbers in the array', () => {
            expect(rowVector123.isPositive()).toBeTruthy();
        });

        it('Is a negative number in the array', () => {
            expect(rowVector123.scale(-1).isPositive()).toBeFalsy();
        });
    });

    describe('isProbability', () => {
        it('Sum of vElements equals to 1 in the range of DELTA', () => {
            const propVector = new Vector([0.4, 0.2, 0.4]);
            expect(propVector.isProbability()).toBeTruthy();
        });

        it('Sum of vElements is not equal to 1 in the range of DELTA', () => {
            expect(rowVector123.isProbability()).toBeFalsy();
        });
    });

    describe('isUnitVector', () => {
        it('Is a unit vector', () => {
            const propVector = Vector.createUnitVector(3, 0);
            expect(propVector.isUnitVector()).toBeTruthy();
        });

        it('Non-unit vector', () => {
            expect(rowVector123.isUnitVector()).toBeFalsy();
        });
    });


    describe('Vector equality ', () => {
        const vector1 = new Vector([[1], [2], [3], [4]]);
        const vector2 = new Vector([1, 2, 3, 4 + 1e-11]);  // a tiny difference on last element
        const vector3 = new Vector([1, 2, 3, 4, 5, 6]);  // different shape
        const vector4 = [1, 2, 3, 4]

        it('Vectors are equal in non-strict mode', () => {
            expect(vector1.equal(vector2)).toBeTruthy();
        });

        it('Vectors are equal in strict mode', () => {
            expect(vector2.equal(vector4, true)).toBeTruthy();
        });

        it('Vectors are equal to array', () => {
            expect(vector2.equal(vector4)).toBeTruthy();
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
            expect(vector1.equal(vector3)).toBeTruthy();
        });

        it('Vector equality of ones on column vector', () => {
            expect(vector2.equal(vector4)).toBeTruthy();
        });
    });


    describe('Vector of zeros ', () => {
        const vector1 = Vector.zeros(4);
        const vector2 = Vector.zeros(4, true);
        const vector3 = new Vector([0, 0, 0, 0])
        const vector4 = new Vector([[0], [0], [0], [0]])

        it('Vector equality of zeros on row vector', () => {
            expect(vector1.equal(vector3)).toBeTruthy();
        });

        it('Vector equality of zeros on column vector', () => {
            expect(vector2.equal(vector4)).toBeTruthy();
        });
    });



    describe('Vector projection', () => {
        const vector1 = new Vector([3, 4]);
        const vector2 = new Vector([5, -12]);
        const vector3 = new Vector([[3], [4]]);
        const vector4 = new Vector([[5], [-12]]);
        const zeroVector = new Vector([0, 0])


        it('Projection with two row vectos', () => {
            const expected = [-(165 / 169), 396 / 169];
            const projVector = vector1.proj(vector2)
            expected.forEach((val, i) => expect(projVector.vElements[i]).toBeCloseTo(val));

        });

        it('Vector projection with two column vectos', () => {
            const expected = [[-(165 / 169)], [396 / 169]];
            const projVector = vector3.proj(vector4, true)
            expected.forEach((val, i) => expect(projVector.vElements[i][0]).toBeCloseTo(val[0]));

        });

        it('Vector projection with one column and one row vector', () => {
            const expected = [-(165 / 169), 396 / 169];
            const projVector = vector1.proj(vector4)
            expected.forEach((val, i) => expect(projVector.vElements[i]).toBeCloseTo(val));

        });

        it('Vector projection on zero vector throws an error', () => {
            expect(() => vector1.proj(zeroVector)).toThrow();

        });


    });

    describe('Vector transpose', () => {
        it('Transpose of a row vector', () => {
            rowVector123.transpose()
            expect(rowVector123.equal(columnVector123)).toBeTruthy();

        });
        it('Transpose of a column vector', () => {
            columnVector123.transpose()
            expect(columnVector123.equal(rowVector123)).toBeTruthy();

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

    describe('Linear combination of unit vectors', () => {
        it('Linear combination of unit vectors and scalars', () => {

            const result = rowVector123.linUnitComb();

            // Form the expected result
            const expectedResult = [
                { scalar: 1, unitVector: Vector.createUnitVector(rowVector123.size, 0) },
                { scalar: 2, unitVector: Vector.createUnitVector(rowVector123.size, 1) },
                { scalar: 3, unitVector: Vector.createUnitVector(rowVector123.size, 2) },
            ];

            expect(result).toEqual(
                expect.arrayContaining(expectedResult)
            );
        });

        it('Return empty array if vector is empty', () => {
            const rowVector123 = new Vector([]);
            const result = rowVector123.linUnitComb();

            expect(result).toEqual([]);
        });
    });

});
