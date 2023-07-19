import { test, fc } from '@fast-check/jest';
import { math } from '../src';



describe('math', () => {

  //Testing the dot product
  test.prop([fc.array(fc.integer())])("Should return the dot product between two vectos", (a) => {
    const dotProduct: number = math.dot(a, a);
    let shouldBe: number = 0;

    for (let i = 0; i < a.length; i++) {
      shouldBe += a[i] * a[i];
    }


    expect(dotProduct).toStrictEqual(shouldBe)
  }, 10000);


  test.prop([fc.array(fc.integer())]("Should return a normalized vector "))



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

