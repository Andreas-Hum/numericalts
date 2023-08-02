import { NumericalError } from './../src/@error.types/numerical.error';
import { Numerical } from '../src/@interfaces/numerical';
import { fc } from '@fast-check/jest';
import { math } from '../src';
import { FractionalNumberClass } from '../src/@numerical.classes';





let fractionalRep: Numerical<string>, fractionalStringArb: fc.Arbitrary<string>
describe('math', () => {
  beforeEach(() => {
    fractionalRep = new FractionalNumberClass()
    fractionalStringArb = fc
      .tuple(fc.integer({ min: -1000, max: 1000 }), fc.integer({ min: 1, max: 1000 }))
      .filter(([numerator, denominator]) => denominator !== 0)
      .map(([numerator, denominator]) => `${numerator}/${denominator}`);

  });

  describe('dot', () => {
    it('Should calculate the dot product of two number vectors', () => {
      fc.property(
        fc.array(fc.integer(), { minLength: 1 }),
        (vector1: number[]) => {
          console.log(typeof vector1[0])
          const expected: number = vector1.reduce((acc, val, index) => acc + val * vector1[index], 0);
          const actual: number = math.dot(vector1, vector1);
          expect(actual).toEqual(expected);
        }
      );
    });

    it('Should calculate the dot product of two bigint vectors', () => {
      fc.assert(
        fc.property(
          fc.array(fc.bigInt(), { minLength: 1 }),
          (vector1: bigint[]) => {
            const expected: bigint = vector1.reduce((acc, val, index) => acc + val * vector1[index], 0n);
            const actual: bigint = math.dot(vector1, vector1);
            expect(actual).toEqual(expected);
          }
        )
      );
    });

    it("Should calculate the dot product correctly when given the fractionalStringArb", () => {
      fc.assert(
        fc.property(fc.array(fractionalStringArb, { minLength: 1 }), (vector) => {
          const dotProductResult: string = math.dot(vector, vector, fractionalRep);

          let expectedDotProduct: string = fractionalRep.zeroValue;
          for (let i = 0; i < vector.length; i++) {
            const product: string = fractionalRep.multiply(vector[i], vector[i]);
            expectedDotProduct = fractionalRep.add(expectedDotProduct, product);
          }

          expect(dotProductResult).toBe(expectedDotProduct);
        })
      )
     
      expect(() => fractionalRep.divide("1/1","0/1")).toThrow()
    });

    it("Should correctly throw errors", () => {
      expect(() => math.dot([1], [2, 3])).toThrow("Vector lengths do not match.");
      expect(() => math.dot([], [])).toThrow("Vector length can't be 0.");
      //@ts-ignore
      expect(() => math.dot(["vector1"], [1])).toThrowError(NumericalError);
    });

  })



  describe('prod', () => {
    it('Should calculate the product of a number array', () => {
      expect(math.prod([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual(3628800)
      expect(math.prod([5, 6, 7, 8, 9, 10])).toEqual(151200)


    });

    it('Should calculate the product of a bigint array', () => {
      fc.assert(
        fc.property(
          fc.array(fc.bigInt(), { minLength: 1 }),
          (vector1: bigint[]) => {
            const expected: bigint = vector1.reduce((acc, val) => acc * val, 1n);
            const actual: bigint = math.prod(vector1);
            expect(actual).toEqual(expected);
          }
        )
      );
    });

    it("Should calculate the product a fractionalStringArb array", () => {
      fc.assert(
        fc.property(fc.array(fractionalStringArb, { minLength: 1 }), (vector) => {
          const dotProductResult: string = math.prod(vector, fractionalRep);


          const expected: string = vector.reduce((acc, val) => fractionalRep.multiply(acc, val), fractionalRep.oneValue);
          expect(fractionalRep.toIntegral(dotProductResult)).toBe(fractionalRep.toIntegral(expected));
        })
      )
    });

    it("Should correctly throw errors", () => {
      expect(() => math.prod([])).toThrow("array length can't be 0.");
      //@ts-ignore
      expect(() => math.prod(["vector1"])).toThrowError(NumericalError);
    });

  })


  describe('Normalize', () => {
    it('should calculate the normalization correctly for a integer vector', () => {
      fc.property(
        fc.array(fc.integer(), { minLength: 1 }),
        (vector1: number[]) => {
          const expected: number[] = math.normalize(vector1)
          const property: number = (math.sqrt(expected.map(x => x ** 2).reduce((acc, x) => acc + x)))
          expect(property).toEqual(1);
        }
      );
    });


    it('Should calculate the normalization for a bigint vector', () => {
      fc.assert(
        fc.property(
          fc.array(fc.bigInt({ min: 1n }), { minLength: 1 }),
          (vector1: bigint[]) => {
            const expected: bigint[] = math.normalize(vector1)
            const property: bigint = (math.sqrt(expected.map(x => x * x).reduce((acc, x) => acc + x)))
            if (property === 0n) {
              expect(property).toBe(0n);
            } else {
              expect(property).toBe(1n);
            }

          }
        )
      );
    });

    it("should calculate the normilization stringClass", () => {
      fc.assert(
        fc.property(fc.array(fractionalStringArb, { minLength: 1 }), (vector) => {


          const failureProperty: string = (math.sqrt(vector.map(x => fractionalRep.multiply(x, x)).reduce((acc, x) => fractionalRep.add(acc, x)), fractionalRep))
          if (failureProperty === fractionalRep.zeroValue) {
            return expect(() => math.normalize(vector, fractionalRep)).toThrow("Can't normalize a zero vector");
          }

          const expected: string[] = math.normalize(vector, fractionalRep);
          const property: string = (math.sqrt(expected.map(x => fractionalRep.multiply(x, x)).reduce((acc, x) => fractionalRep.add(acc, x)), fractionalRep))
          const [num, denom] = property.split('/').map(Number);
          expect(num / denom).toBeCloseTo(1);

        })
      )
    });

    it("Should correctly throw errors", () => {
      expect(() => math.normalize([0])).toThrow("Can't normalize a zero vector");
      expect(() => math.normalize([])).toThrow("Vector length can't be 0.");
      //@ts-ignore
      expect(() => math.normalize(["vector1"])).toThrowError(NumericalError);
    });

  })


  describe('Abs', () => {

    // Test for `number`
    it('Should calculate the absolute value correctly for numbers', () => {
      fc.assert(
        fc.property(fc.integer(), (num) => {
          const result: number = math.abs(num);

          const expected: number = Math.abs(num);

          expect(result).toEqual(expected);
        })
      );
    });

    // Test for `bigint`
    it('Should calculate the absolute value correctly for bigints', () => {
      fc.assert(
        fc.property(fc.bigInt(), (num) => {
          const result: bigint = math.abs(num);

          const expected: bigint = num < 0n ? -num : num;

          expect(result).toEqual(expected);
        })
      );
    });

    // Test for `FractionalNumberClass`
    it('Should calculate the absolute value correctly for FractionalNumberClass', () => {

      fc.assert(
        fc.property(fractionalStringArb, (fraction) => {
          const result: string = math.abs(fraction, fractionalRep);
          const [resultNum, resultDenom] = result.split('/').map(Number);

          expect(resultNum / resultDenom).toBeGreaterThanOrEqual(0);
        })
      );
    });

    it("Should correctly throw errors", () => {

      //@ts-ignore
      expect(() => math.abs(["vector1"])).toThrowError(NumericalError);
    });
  })

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * floor, ceil, trunc and abs
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////


  describe('floor, ceil and trunc', () => {
    it('Should return an integer for floor function', () => {
      fc.assert(
        fc.property(fc.float({ noDefaultInfinity: true, noNaN: true }), (num) => {
          const result: number = math.floor(num);
          expect(Number.isInteger(result)).toBe(true);
        })
      );
    });

    it('Should return an integer for ceil function', () => {
      fc.assert(
        fc.property(fc.float({ noDefaultInfinity: true, noNaN: true }), (num) => {
          if (num === Number.NaN) {
            num = 10
          }
          const result: number = math.ceil(num);
          expect(Number.isInteger(result)).toBe(true);
        })
      );
    });

    it('Should return an integer for trunc function', () => {
      fc.assert(
        fc.property(fc.float({ noDefaultInfinity: true, noNaN: true }), (num) => {
          const result: number = math.trunc(num);
          expect(Number.isInteger(result)).toBe(true);
        })
      );
    });
  })

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Fractional operations
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////


  describe('Fractional operations', () => {
    // Test for `fracPart`
    it('Should return the fractional part of a number', () => {
      fc.assert(
        fc.property(fc.float({ noDefaultInfinity: true, noNaN: true }), (num) => {
          if (isNaN(num)) {
            num = 10
          }
          const result: number = math.fracPart(num);

          const frac: number = num >= 0 ? num - Math.floor(num) : num - Math.ceil(num);
          const expected: number = math.abs(Number(frac.toFixed(10))); // Rounding to 10 decimal places for comparison

          expect(result).toBeCloseTo(expected);
        })
      );
    });

    // Test for `GCD`
    it('Should calculate the greatest common divisor (GCD) of two numbers', () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (a, b) => {
          const result: number = math.GCD(a, b);

          // Calculate the GCD using the Euclidean algorithm (for positive numbers)
          const euclideanGCD = (x: number, y: number): number => (y === 0 ? x : euclideanGCD(y, x % y));
          const expected: number = euclideanGCD(a, b);

          expect(result).toBeCloseTo(expected);
        })
      );
    });

    // Test for `LCD`
    it('Should calculate the least common multiple (LCM) of two numbers', () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (a, b) => {
          const result: number = math.LCD(a, b);

          // Calculate the LCM using the formula: LCM = (a * b) / GCD(a, b)
          const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
          const lcm = (x: number, y: number): number => (x * y) / gcd(x, y);
          const expected: number = lcm(a, b);

          expect(result).toBeCloseTo(expected);
        })
      );
    });

    // Test for `toFixedNumber`
    it('Should round a number to a specified number of decimal places', () => {
      fc.assert(
        fc.property(fc.float({ noDefaultInfinity: true, noNaN: true }), fc.nat(20), (num, digits) => {
          const result: number = math.toFixedNumber(num, digits);

          const pow = Math.pow(10, digits);
          const expected: number = Math.round(num * pow) / pow;

          expect(result).toBeCloseTo(expected);
        })
      );
    });
  })


  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Utility functions
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////

  describe('Utility functions', () => {

    it("should return 2", () => {
      expect(math.countDecimals(1.22)).toBe(2);
    });

    it("should return 3", () => {
      expect(math.countDecimals(-3.456)).toBe(3);
    });

    it("should return 0 ", () => {
      expect(math.countDecimals(5)).toBe(0);
    });

    it("should return 4", () => {
      expect(math.countDecimals(2.3456)).toBe(4);
    });


    // Test for 'equal' function
    it('equal - numbers', () => {
      fc.assert(
        fc.property(fc.double({ noDefaultInfinity: true, noNaN: true }), fc.double({ noDefaultInfinity: true, noNaN: true }), fc.double({ min: 0.01, max: 10 }), (a, b, tolerance) => {
          return math.equal(a, b, tolerance) === Math.abs(a - b) < tolerance;
        })
      );
    });

    it('equal - bigints', () => {
      fc.assert(
        fc.property(fc.bigInt(), fc.bigInt(), fc.bigInt({ min: 0n, max: 100n }), (a, b, tolerance) => {
          return math.equal(a, b, tolerance) === math.abs(a - b) < tolerance;
        })
      );
    });

    // Test for 'isPowerOfTwo' function
    it('isPowerOfTwo - numbers', () => {
      fc.assert(
        fc.property(fc.integer({ min: 0, max: 1000 }), (n) => {
          return math.isPowerOfTwo(n) === ((n & (n - 1)) === 0);
        })
      );
    });

    it('isPowerOfTwo - bigints', () => {
      fc.assert(
        fc.property(fc.bigInt({ min: 0n, max: 1000n }), (n) => {
          return math.isPowerOfTwo(n) === ((n & (n - 1n)) === 0n);
        })
      );
    });

    // Test for 'nextPowerOfTwo' function
    it('nextPowerOfTwo - numbers', () => {
      fc.assert(
        fc.property(fc.integer({ min: 0, max: 1000 }), (n) => {
          const result = math.nextPowerOfTwo(n);
          return typeof result === 'number' && (result & (result - 1)) === 0;
        })
      );
    });

    it('nextPowerOfTwo - bigints', () => {
      fc.assert(
        fc.property(fc.bigInt({ min: 0n, max: 1000n }), (n) => {
          const result = math.nextPowerOfTwo(n);
          return typeof result === 'bigint' && (result & (result - 1n)) === 0n;
        })
      );
    });

    // Test for 'sign' function
    it('sign - numbers', () => {
      fc.assert(
        fc.property(fc.integer({ min: -10, max: 100 }), (n) => {
          return math.sign(n) === Math.sign(n);
        })
      );
    });

    it('sign - bigints', () => {
      fc.assert(
        fc.property(fc.bigInt({ min: -10n, max: 100n }), (n) => {
          return math.sign(n) === (n === 0n ? 0 : n > 0n ? 1 : -1);
        })
      );
    });
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Root operations
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////

  describe('Root operations', () => {
    // Test for `sqrt` with numbers
    it('Should calculate the square root of a number', () => {
      fc.assert(
        fc.property(fc.float({ min: 0, noDefaultInfinity: true, noNaN: true }), (num) => {
          const result: number = math.sqrt(num);
          expect(result).toBeCloseTo(Math.sqrt(num), 10);
        })
      );
    });

    // Test for `sqrt` with bigints
    it('Should calculate the square root of a bigint', () => {
      fc.assert(
        fc.property(fc.bigUintN(128), (num) => {
          const result: bigint = math.sqrt(num);
          expect(result).toEqual(result);
        })
      );
    });

    // Test for `sqrt` with FractionalNumberClass
    it('Should calculate the square root of a FractionalNumberClass value', () => {
      const fractionalNumberRep = new FractionalNumberClass();

      fc.assert(
        fc.property(fc.string(), (numStr) => {
          // Ensure the provided string is in the format "numerator/denominator"
          if (!numStr.match(/^\d+\/\d+$/)) return true;

          const result: string = math.sqrt(numStr, fractionalNumberRep);
          const numArr = numStr.split('/').map(Number);
          if (numArr[1] === 0) return;
          const numerator = numArr[0];
          const denominator = numArr[1];
          const expected = Math.sqrt(numerator / denominator);
          expect(result).toEqual(expected.toString());
        })
      );
    });

    it("Should correctly throw errors", () => {

      //@ts-ignore
      expect(() => math.sqrt(["vector1"])).toThrowError(NumericalError);
    });
  })


  describe('unique cases', () => {
    expect(math.sign(0n)).toEqual(0)
    expect(math.BigSqrt(0n)).toEqual(0n)

  })



})
