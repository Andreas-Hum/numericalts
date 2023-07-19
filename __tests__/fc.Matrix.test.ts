import { Numerical } from './../src/@interfaces/Numerical';
import { test, fc } from '@fast-check/jest';
import { math } from '../src';



describe('math', () => {

  describe('dot', () => {
    test('should calculate the dot product of two number vectors', () => {
      fc.property(
        fc.array(fc.integer()), // Generator for the first vector
        fc.array(fc.integer()), // Generator for the second vector
        (vector1, vector2) => {
          // Calculate the expected output
          const expected = vector1.reduce((acc, val, index) => acc + val * vector2[index], 0);
          // Invoke the dot function
          const actual = math.dot(vector1, vector2);
          // Compare the actual output with the expected output
          expect(actual).toEqual(expected);
        }
      );
    });

    test('should calculate the dot product of two bigint vectors', () => {
      fc.property(
        fc.array(fc.bigInt()), // Generator for the first vector
        fc.array(fc.bigInt()), // Generator for the second vector
        (vector1, vector2) => {
          // Calculate the expected output
          const expected = vector1.reduce((acc, val, index) => acc + val * vector2[index], 0n);
          // Invoke the dot function
          const actual = math.dot(vector1, vector2);
          // Compare the actual output with the expected output
          expect(actual).toEqual(expected);
        }
      );
    });
  });



  // for all a, b, c strings
  // b is a substring of a + b + c
  test.prop([fc.string(), fc.string(), fc.string()])('should detect the substring', (a, b, c) => {
    return (a + b + c).includes(b);
  }, 10000);

  // Or the exact same test but based on named parameters
  test.prop({ a: fc.string(), b: fc.string(), c: fc.string() })('should detect the substring', ({ a, b, c }) => {
    return (a + b + c).includes(b);
  }, 10000);
})

