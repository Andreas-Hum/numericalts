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

    describe('Adding two vector instances together', () => {
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


});
