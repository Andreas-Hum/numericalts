const vector_module = require("../dist/vector/Vector")
const Vector = vector_module.Vector

describe('Vector', () => {
    describe('When initialized with valid input', () => {
        it('correctly validates a row vector', () => {
            const vector = new Vector([1, 2, 3]);
            expect(vector.isRow).toBe(true);
            expect(vector.size).toBe(3);
            expect(vector.shape).toBe('(1,3)');
        });

        it('correctly validates a column vector', () => {
            const vector = new Vector([[1], [2], [3]]);
            expect(vector.isColumn).toBe(true);
            expect(vector.size).toBe(3);
            expect(vector.shape).toBe('(3,1)');
        });

        it('Throws an error if there are different types of entries', () => {
            expect(() => new Vector([1, [1], 3])).toThrow();
        })
    });

    describe('addElement', () => {
        it('correctly adds element to a row vector', () => {
            const vector = new Vector([1, 2, 3]);
            vector.addElement(4);
            expect(vector.size).toBe(4);
            expect(vector.shape).toBe('(1,4)');
        });

        it('correctly adds element to a column vector', () => {
            const vector = new Vector([[1], [2], [3]]);
            vector.addElement([4]);
            expect(vector.size).toBe(4);
            expect(vector.shape).toBe('(4,1)');
        });

        it('Throws an error if a non valid element is added', () => {
            const vector = new Vector([1, 2, 3]);
            expect(() => vector.addElements("4")).toThrow();
        })


    });

    describe('addElements', () => {
        it('correctly adds multiple elements to a row vector', () => {
            const vector = new Vector([1, 2, 3]);
            vector.addElements([4, 5]);
            expect(vector.size).toBe(5);
            expect(vector.shape).toBe('(1,5)');
        });

        it('correctly adds multiple elements to a column vector', () => {
            const vector = new Vector([[1], [2], [3]]);
            vector.addElements([[4], [5]]);
            expect(vector.size).toBe(5);
            expect(vector.shape).toBe('(5,1)');
        });

        it('Throws an error if non valid elements are added', () => {
            const vector = new Vector([1, 2, 3]);
            expect(() => vector.addElements("4", "2")).toThrow();
        })

    });

    describe('Addition', () => {
        it("correctly add's two row vectors together", () => {
            const vector_one = new Vector([1, 2, 3]);
            const vector_two = new Vector([1, 2, 3]);
            vector_one.add(vector_two)
            expect(vector_one.elements).toStrictEqual([2, 4, 6]);
        });

        it("correctly add's two column vectors together", () => {
            const vector_one = new Vector([[1], [2], [3]]);
            const vector_two = new Vector([[1], [2], [3]]);
            vector_one.add(vector_two)
            expect(vector_one.elements).toStrictEqual([[2], [4], [6]]);
        });

        it("Throws an error when vectors have different shapes", () => {
            const vector_one = new Vector([1, 2, 3]);
            const vector_two = new Vector([[1], [2], [3]]);
            expect(() => vector_one.add(vector_two)).toThrow();
        });

    });

    describe('Adding a vector with an array', () => {
        it("correctly add's two row vectors together", () => {
            const vector_one = new Vector([1, 2, 3]);
            const vector_two = [1, 2, 3];
            vector_one.add(vector_two)
            expect(vector_one.elements).toStrictEqual([2, 4, 6]);
        });

        it("correctly add's two column vectors together", () => {
            const vector_one = new Vector([[1], [2], [3]]);
            const vector_two = [[1], [2], [3]];
            vector_one.add(vector_two)
            expect(vector_one.elements).toStrictEqual([[2], [4], [6]]);
        });
    });

    describe('Adding multiple vector instances together', () => {
        it("Adds multiple row vectors together", () => {
            const vector_one = new Vector([1, 2, 3]);
            const vector_two = new Vector([4, 5, 6]);
            const vector_three = new Vector([7, 8, 9]);
            vector_one.add(vector_two, vector_three);
            expect(vector_one.elements).toStrictEqual([12, 15, 18]);
        });

        it("Adds multiple column vectors together", () => {
            const vector_one = new Vector([[1], [2], [3]]);
            const vector_two = new Vector([[4], [5], [6]]);
            const vector_three = new Vector([[7], [8], [9]]);
            vector_one.add(vector_two, vector_three);
            expect(vector_one.elements).toStrictEqual([[12], [15], [18]]);
        });


        it("Adds a vector and an array together", () => {
            const vector_one = new Vector([1, 2, 3]);
            const array_two = [4, 5, 6];
            const array_three = [7, 8, 9];
            vector_one.add(array_two, array_three);
            expect(vector_one.elements).toStrictEqual([12, 15, 18]);
        });
    });

    describe('Vector subtraction', () => {
        it('Subtracts row vectors correctly', () => {
            const vector1 = new Vector([4, 5, 6]);
            const vector2 = new Vector([1, 2, 3]);
            vector1.subtract(vector2);
            // The result of [4,5,6] - [1,2,3] should be [3,3,3]
            expect(vector1.elements).toStrictEqual([3, 3, 3]);
        });

        it('Subtracts column vectors correctly', () => {
            const vector1 = new Vector([[4], [5], [6]]);
            const vector2 = new Vector([[1], [2], [3]]);
            vector1.subtract(vector2);
            // The result of [[4],[5],[6]] - [[1],[2],[3]] should be [[3],[3],[3]]
            expect(vector1.elements).toStrictEqual([[3], [3], [3]]);
        });

        it('Throws an error for vectors of mismatched size', () => {
            const vector1 = new Vector([1, 2, 3]);
            const vector2 = new Vector([1, 2]);
            expect(() => vector1.subtract(vector2)).toThrow();
        });

        it('Subtracts multiple vectors correctly', () => {
            const vector1 = new Vector([10, 10, 10]);
            const vector2 = new Vector([1, 2, 3]);
            const vector3 = new Vector([5, 5, 5]);
            vector1.subtract(vector2, vector3);
            // The result of [10,10,10] - [1,2,3] - [5,5,5] should be [4,3,2]
            expect(vector1.elements).toStrictEqual([4, 3, 2]);
        });

        it('Subtracts vectors correctly when passed as arrays', () => {
            const vector = new Vector([10, 10, 10]);
            const array1 = [1, 2, 3];
            const array2 = [5, 5, 5];
            vector.subtract(array1, array2);
            // The result of [10,10,10] - [1,2,3] - [5,5,5] should be [4,3,2]
            expect(vector.elements).toStrictEqual([4, 3, 2]);
        });
    });



    describe('Vector norm', () => {
        it('Returns the correct norm for a row vector', () => {
            const vector = new Vector([3, 4]);
            const norm = vector.norm();
            // The norm (or length) of a [3,4] vector is 5
            expect(norm).toBeCloseTo(5);
        });

        it('Returns the correct norm for a column vector', () => {
            const vector = new Vector([[3], [4]]);
            const norm = vector.norm();
            // The norm (or length) of a [[3],[4]] vector is also 5
            expect(norm).toBeCloseTo(5);
        });

        it('Returns the correct norm when vector has multiple dimensions', () => {
            const vector = new Vector([3, 4, 0, -5]);
            const norm = vector.norm();
            // The norm (or length) of a [3,4,0,-5] vector is sqrt(3*3 + 4*4 + 0*0 +(-5)*(-5)) = sqrt(9+16+0+25) = sqrt(50) = 7.071
            expect(norm).toBeCloseTo(Math.sqrt(50));
        });
    });


    describe('Vector scaling', () => {
        it('Scales a row vector correctly', () => {
            const vector = new Vector([1, 2, 3]);
            vector.scale(2);
            // The result of scaling [1,2,3] by 2 should be [2,4,6]
            expect(vector.elements).toStrictEqual([2, 4, 6]);
        });

        it('Scales a column vector correctly', () => {
            const vector = new Vector([[1], [2], [3]]);
            vector.scale(2);
            // The result of scaling [[1],[2],[3]] by 2 should be [[2],[4],[6]]
            expect(vector.elements).toStrictEqual([[2], [4], [6]]);
        });

        it('Throws an error for invalid scalars', () => {
            const vector = new Vector([1, 2, 3]);
            expect(() => vector.scale('two')).toThrow();
        });
    });


    describe('Vector normalization', () => {
        it('Normalizes a row vector correctly', () => {
            const vector = new Vector([1, 2, 2]);
            vector.normalize();
            // The result of normalizing [1,2,2] should be [1/3, 2/3, 2/3]
            const expected = [1 / 3, 2 / 3, 2 / 3];
            expected.forEach((val, i) => expect(vector.elements[i]).toBeCloseTo(val));
        });

        it('Normalizes a column vector correctly', () => {
            const vector = new Vector([[3], [4]]);
            vector.normalize();
            // The result of normalizing [[3],[4]] should be [[3/5], [4/5]]
            const expected = [[3 / 5], [4 / 5]];
            expected.forEach((val, i) => expect(vector.elements[i][0]).toBeCloseTo(val[0]));
        });

        it('Throws an error for zero vector', () => {
            const vector = new Vector([0, 0, 0]);
            expect(() => vector.normalize()).toThrow();
        });
    });


    describe('Vector cross product', () => {
        it('Calculates cross product correctly for row vectors', () => {
            const vector1 = new Vector([1, 2, 3]);
            const vector2 = new Vector([4, 5, 6]);

            // The cross product of [1,2,3] and [4,5,6] is [-3, 6, -3]
            expect(vector1.cross(vector2).elements).toEqual([-3, 6, -3]);
        });

        it('Calculates cross product correctly for column vectors', () => {
            const vector1 = new Vector([[1], [2], [3]]);
            const vector2 = new Vector([[4], [5], [6]]);

            // The cross product of [[1],[2],[3]] and [[4],[5],[6]] is [[-3], [6], [-3]]
            expect(vector1.cross(vector2, true).elements).toEqual([[-3], [6], [-3]]);
        });

        it('Throws an error for vectors of mismatched size', () => {
            const vector1 = new Vector([1, 2, 3]);
            const vector2 = new Vector([1, 2]);
            expect(() => vector1.cross(vector2).elements).toThrow();
        });

        it('Calculates cross product correctly for vectors passed as arrays', () => {
            const vector = new Vector([1, 2, 3]);
            const array = [4, 5, 6];

            // The cross product of [1,2,3] and [4,5,6] is [-3, 6, -3]
            expect(vector.cross(array).elements).toEqual([-3, 6, -3]);
        });
    });


    describe('Vector dot product', () => {
        it('Calculates dot product correctly for row vectors', () => {
            const vector1 = new Vector([1, 2, 3]);
            const vector2 = new Vector([4, 5, 6]);
            const result = vector1.dot(vector2);
            // The dot product of [1,2,3] and [4,5,6] is 1*4 + 2*5 + 3*6 = 32
            expect(result).toBe(32);
        });

        it('Calculates dot product correctly for column vectors', () => {
            const vector1 = new Vector([[1], [2], [3]]);
            const vector2 = new Vector([[4], [5], [6]]);
            const result = vector1.dot(vector2);
            // The dot product of [[1],[2],[3]] and [[4],[5],[6]] is 1*4 + 2*5 + 3*6 = 32
            expect(result).toBe(32);
        });

        it('Throws an error for vectors of mismatched size', () => {
            const vector1 = new Vector([1, 2, 3]);
            const vector2 = new Vector([1, 2]);
            expect(() => vector1.dot(vector2)).toThrow();
        });

        it('Calculates dot product correctly for vectors passed as arrays', () => {
            const vector = new Vector([1, 2, 3]);
            const array = [4, 5, 6];
            const result = vector.dot(array);
            // The dot product of [1,2,3] and [4,5,6] is 1*4 + 2*5 + 3*6 = 32
            expect(result).toBe(32);
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





});
