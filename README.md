
<h1 align="center">
 numerical.ts (Work in Progress)
</h1>
<p align="center">
<a href="https://www.npmjs.com/package/numericalts"><img src="https://img.shields.io/npm/v/numericalts.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/numericalts"><img src="https://img.shields.io/npm/dm/numericalts.svg" alt="Downloads"></a>
<a href="https://github.com/Andreas-Hum/numericalts/actions"><img src="https://github.com/Andreas-Hum/numericalts/workflows/Node.js/badge.svg" alt="Build Status"></a>
<a href="https://codecov.io/gh/Andreas-Hum/numericalts"><img src="https://codecov.io/gh/Andreas-Hum/numericalts/branch/main/graph/badge.svg?token=KM5KFXL4UC" alt="codecov"></a>
<a href="https://github.com//Andreas-Hum/numericalts/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Andreas-Hum/numericalts.svg" alt="License"></a>
</p>


numerical.ts is a TypeScript library that focuses primarily on linear algebra functions, with plans to expand to include other mathematical functions in the future. It aims to provide a comprehensive set of tools for performing various linear algebra operations efficiently in TypeScript-

The library leverages the power of generic types to enable flexible usage with different data types while ensuring type safety. This allows you to perform linear algebra operations on various numeric types, such as `number`, `bigint`, or custom numerical types. The use of generics provides versatility and adaptability to different use cases and data structures.

Please note that numerical.ts is currently a work in progress
## Features (Planned)

- Matrix operations: Addition, subtraction, multiplication, transpose, determinant calculation, and more.
- Eigenvalue and eigenvector calculations.
- Singular value decomposition (SVD).
- LU decomposition.
- QR decomposition.
- Least squares regression.
- Optimization algorithms.
- Parsing mathematical statements
- Complex numbers
- And many more

## Usage 
Install numerical.ts using [npm](https://www.npmts.com/package/numericalts):


```bash
npm install numericalts
```
For a full list of currently implemented methods and types please see [here](https://andreas-hum.github.io/numericalts/)

### Current native Numerical implementations
- Number
- Bigint
- Complex number

These three Numerical interfaces have been implemented meaning you don't have to create them from scratch. Furthermore you can create matrixes without giving the constuctor the Numerical class

```ts
import { Matrix } from 'numericalts';

const A: Matrix<number> = new Matrix([[1,2],[3,4]])
const B: Matrix<bigint> = new Matrix([[1n,2n],[3n,4n]])
const C: Matrix<ComplexNumber> = new Matrix([
    [{real: 1, imaginary: 1},{real: 2, imaginary: 2}],
    [{real: 3, imaginary: 3},{real: 4, imaginary: 4}]
    ])

```

### Matrix Operations
```ts

import { Matrix } from 'numericalts';

const A: Matrix<number> = new Matrix([[1, 2], [3, 4]]);
const B: Matrix<number> = new Matrix([[5, 6, 7, 8], 2, 2]);
const stringA: Matrix<string>

//A = new Matrix<number>([["1","2"],["3","4"]]) throws a typeerror while new Matrix<string>([["1","2"],["3","4"]]) does not

// Matrix multiplication
const C: Matrix<number> = A.multiply(B);
console.log(C.toArray()); // [[19, 22], [43, 50]]

// Matrix exponentiation
const D: Matrix<number> = A.pow(2);
console.log(D.toArray()); // [[7, 10], [15, 22]]

// Matrix multiplication using Strassen's algorithm
const E: Matrix<number> = A.strassenMultiply(B);
console.log(E.toArray()); // [[19, 22], [43, 50]]

// QR decomposition
const { Q, R } = A.QRDecomposition();
console.log(Q.toArray()); // [[-0.31622776601683794, -0.9486832980505138], [-0.9486832980505138, 0.31622776601683794]]
console.log(R.toArray()); // [[-3.1622776601683795, -4.427188724235731], [0, 0.6324555320336759]]
```

### Example of a Custom Numerical Class
*Notice a complex number Numerical class have since been added*

This section demonstrates how to create a custom class that implements the `Numerical` interface and how to use it with the `Matrix` class.
```ts
// Import The Matrix class and the Numerical interface
import { Matrix, Numerical} from 'numericalts';

// Skeleton for a custom Complex class
class Complex implements Numerical<Complex>{
zeroValue: new Complex(0,0);
oneValue: new Complex(1,0);

constructor(realValue: number, imagValue: number){/*Logic here*/}
public zeroValue(): Complex {/*Logic here*/}
public oneValue(): Complex {/*Logic here*/}
public add(x: Complex, y: Complex): Complex {/*Logic here*/}
public subtract(x: Complex, y: Complex): Complex {/*Logic here*/}
public multiply(x: Complex, y: Complex): Complex {/*Logic here*/}
public divide(x: Complex, y: Complex): Complex {/*Logic here*/}
public sqrt(x: Complex): Complex {/*Logic here*/}
public fromIntegral(n: number): Complex {/*Logic here*/}
public toIntegral(x: Complex): number {/*Logic here*/}
public toString(x:Complex):string {/*Logic here*/}
public signOperator(x: Complex): number {/*Logic here*/}
}


// Now that the custom class has been implemented just use the Matrix class as normal

const c1: Complex = new Complex(1, 1);
const c2: Complex = new Complex(2, 2);
const c3: Complex = new Complex(3, 3);
const c4: Complex = new Complex(4, 4);

const complexMatrix: Matrix<Complex> = new Matrix<Complex>([[c1, c2], [c3, c4]], {numerical: new Complex(0, 0)});

// Matrix multiplication
const A: Matrix<Complex> = complexMatrix.multiply(complexMatrix);
console.log(C.toString());
/*
 *  "14i 20i"
 *  "30i 44i"
 */

// Matrix addition
const B: Matrix<Complex> = complexMatrix.add(complexMatrix);
console.log(B.toString());
/*
 *  "2+2i 4+4i"
 *  "6+6i 8+8i"
 */
```

### Number Manipulation

```ts
import { math } from 'numericalts';

const num: number = 3.14159;

// Get the fractional part of a number
const frac: number = math.fracPart(num);
console.log(frac); // 0.14159

// Calculate the greatest common divisor (GCD) of two numbers
const gcd: number = math.GCD(24, 36);
console.log(gcd); // 12

// Calculate the least common divisor (LCD) of two numbers
const lcd: number = math.LCD(24, 36);
console.log(lcd); // 72

// Round a number to a specified number of decimal places
const rounded: number = math.toFixedNumber(num, 2);
console.log(rounded); // 3.14

// Count the number of decimal places in a number
const decimalPlaces: number = math.countDecimals(num);
console.log(decimalPlaces); // 5

// Calculate the dot product of two vectors
const vector1: number[] = [1, 2, 3];
const vector2: number[] = [4, 5, 6];
const dotProduct: number = math.dot(vector1, vector2);
console.log(dotProduct); // 32

// Normalize a vector
const normalizedVector: number[] = math.normalize(vector1);
console.log(normalizedVector); // [0.2672612419124244, 0.5345224838248488, 0.8017837257372732]

```

## Documentation (Coming Soon)

Once numerical.ts is fully released, detailed documentation and examples will be provided to guide you through the library's usage and functionality. The documentation will cover various linear algebra operations, math operations and so forth, and provide code examples to help you understand how to use numerical.ts effectively.
For now a simple documentation can be see [here](https://andreas-hum.github.io/numericalts/)

## Contributing

Contributions to numerical.ts are welcome! If you are interested in contributing to the development of the library, please stay tuned for updates on how you can get involved. I appreciate your support and contributions to make numerical.ts even better.

## License

numerical.ts is released under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Contact

For any inquiries or questions, please contact me at [Andreas@hummelmose.dk](mailto:Andreas@hummelmose.dk).

Andreas Hummelmose Student at AAU
