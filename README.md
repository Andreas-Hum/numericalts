# numerical.ts (Work in Progress)

numerical.ts is a TypeScript library that focuses primarily on linear algebra functions, with plans to expand to include other mathematical functions in the future. It aims to provide a comprehensive set of tools for performing various linear algebra operations efficiently in TypeScript-

The library leverages the power of generic types to enable flexible usage with different data types while ensuring type safety. This allows you to perform linear algebra operations on various numeric types, such as `number`, `bigint`, or custom numerical types. The use of generics provides versatility and adaptability to different use cases and data structures.

Please note that numerical.ts is currently a work in progress

[![Version](https://img.shields.io/npm/v/numericalts.svg)](https://www.npmts.com/package/numericalts)
[![Downloads](https://img.shields.io/npm/dm/numericalts.svg)](https://www.npmts.com/package/numericalts)
[![Build Status](https://github.com/Andreas-Hum/numericalts/workflows/Node.yaml/badge.svg)](https://github.com/Andreas-Hum/numericalts/actions)
[![codecov](https://codecov.io/gh/Andreas-Hum/numericalts/branch/main/graph/badge.svg?token=KM5KFXL4UC)](https://codecov.io/gh/Andreas-Hum/numericalts)
[![License](https://img.shields.io/github/license/Andreas-Hum/numericalts.svg)](https://github.com//Andreas-Hum/numericalts/blob/master/LICENSE)

## Features (Planned)

- Vector operations: Addition, subtraction, dot product, cross product, and more.
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
### Matrix Operations
```ts

import { Matrix } from 'numericalts';
// The matrix class can also be imported directly with 'numericalts/matrix'

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
const E = A.strassenMultiply(B);
console.log(E.toArray()); // [[19, 22], [43, 50]]

// QR decomposition
const { Q, R } = A.QRDecomposition();
console.log(Q.toArray()); // [[-0.31622776601683794, -0.9486832980505138], [-0.9486832980505138, 0.31622776601683794]]
console.log(R.toArray()); // [[-3.1622776601683795, -4.427188724235731], [0, 0.6324555320336759]]
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
