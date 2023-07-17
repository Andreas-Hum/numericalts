# numerical.js (Work in Progress)

numerical.js is a TypeScript/JavaScript library that focuses primarily on linear algebra functions, with plans to expand to include other mathematical functions in the future. It aims to provide a comprehensive set of tools for performing various linear algebra operations efficiently in JavaScript or TypeScript.

Please note that numerical.js is currently a work in progress and is not available for download as a package yet. However, I are actively working on developing and refining the library, and it will be released as a package soon.

[![Version](https://img.shields.io/npm/v/numericaljs.svg)](https://www.npmjs.com/package/numericaljs)
[![Downloads](https://img.shields.io/npm/dm/numericaljs.svg)](https://www.npmjs.com/package/numericaljs)
[![Build Status](https://github.com/Andreas-Hum/numericaljs/workflows/Node.js/badge.svg)](https://github.com/Andreas-Hum/numericaljs/actions)
[![codecov](https://codecov.io/gh/Andreas-Hum/numericaljs/branch/main/graph/badge.svg?token=KM5KFXL4UC)](https://codecov.io/gh/Andreas-Hum/numericaljs)
[![License](https://img.shields.io/github/license/Andreas-Hum/numericaljs.svg)](https://github.com//Andreas-Hum/numericaljs/blob/master/LICENSE)

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

## Usage (Coming Soon)
Install numerical.js using [npm](https://www.npmjs.com/package/numericaljs):


```bash
npm install numericaljs
```
For a full list of currently implemented methods and types please see [here](https://andreas-hum.github.io/numerical.js/)
### Matrix Operations
```js

import { Matrix } from 'numericaljs'; // Can also be imported as import Matrix  from 'numericaljs/matrix'

const A = new Matrix([[1, 2], [3, 4]]);
const B = new Matrix([[5, 6], [7, 8]]);

// Matrix multiplication
const C = A.multiply(B);
console.log(C.toArray()); // [[19, 22], [43, 50]]

// Matrix exponentiation
const D = A.pow(2);
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

```js
import { math } from 'numericaljs'; // Can also be imported as import Matrix  from 'numericaljs/matrix'

const num = 3.14159;

// Get the fractional part of a number
const frac = math.fracPart(num);
console.log(frac); // 0.14159

// Calculate the greatest common divisor (GCD) of two numbers
const gcd = math.GCD(24, 36);
console.log(gcd); // 12

// Calculate the least common divisor (LCD) of two numbers
const lcd = math.LCD(24, 36);
console.log(lcd); // 72

// Round a number to a specified number of decimal places
const rounded = math.toFixedNumber(num, 2);
console.log(rounded); // 3.14

// Count the number of decimal places in a number
const decimalPlaces = math.countDecimals(num);
console.log(decimalPlaces); // 5

// Calculate the dot product of two vectors
const vector1 = [1, 2, 3];
const vector2 = [4, 5, 6];
const dotProduct = math.dot(vector1, vector2);
console.log(dotProduct); // 32

// Normalize a vector
const normalizedVector = math.normalize(vector1);
console.log(normalizedVector); // [0.2672612419124244, 0.5345224838248488, 0.8017837257372732]
```

## Documentation (Coming Soon)

Once numerical.js is fully released, detailed documentation and examples will be provided to guide you through the library's usage and functionality. The documentation will cover various linear algebra operations and provide code examples to help you understand how to use math.ts effectively.
For now a simple documentation can be see [here](https://andreas-hum.github.io/numerical.js/)

## Contributing

Contributions to numerical.js are welcome! If you are interested in contributing to the development of the library, please stay tuned for updates on how you can get involved. I appreciate your support and contributions to make numerical.js even better.

## License

numerical.js is released under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Contact

For any inquiries or questions, please contact me at [Andreas@hummelmose.dk](mailto:Andreas@hummelmose.dk).

Andreas Hummelmose Student at AAU
