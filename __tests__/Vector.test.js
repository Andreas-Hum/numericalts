const vector_module = require("../dist/vector/Vector")
const Vector = vector_module.Vector

describe('Vector', () => {
    describe('When initialized with valid input', () => {
        it('correctly validates a row vector', () => {
            const vector = new Vector([1, 2, 3]);
            console.log(vector)
            expect(vector.isRow).toBe(true);
            expect(vector.size).toBe(3);
            expect(vector.shape).toBe('(3,1)');
        });

        it('correctly validates a column vector', () => {
            const vector = new Vector([[1], [2], [3]]);
            expect(vector.isColumn).toBe(true);
            expect(vector.size).toBe(3);
            expect(vector.shape).toBe('(1,3)');
        });
    });

    describe('addElement', () => {
        it('correctly adds element to a row vector', () => {
            const vector = new Vector([1, 2, 3]);
            vector.addElement(4);
            expect(vector.size).toBe(4);
            expect(vector.shape).toBe('(4,1)');
        });

        it('correctly adds element to a column vector', () => {
            const vector = new Vector([[1], [2], [3]]);
            vector.addElement([4]);
            expect(vector.size).toBe(4);
            expect(vector.shape).toBe('(1,4)');
        });
    });

    describe('addElements', () => {
        it('correctly adds multiple elements to a row vector', () => {
            const vector = new Vector([1, 2, 3]);
            vector.addElements([4, 5]);
            expect(vector.size).toBe(5);
            expect(vector.shape).toBe('(5,1)');
        });

        it('correctly adds multiple elements to a column vector', () => {
            const vector = new Vector([[1], [2], [3]]);
            vector.addElements([[4], [5]]);
            expect(vector.size).toBe(5);
            expect(vector.shape).toBe('(1,5)');
        });
    });
});
