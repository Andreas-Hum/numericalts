## 2023-17-07, version 0.2.8

- First publish of the numericalts package. Package contains an almost complete Matrix data type and a little math functionality

## 2023-22-07, version 0.3.0

- The migration from jest to Fast-check/jest this was done to try property based testing


## 2023-26-07, version 0.4.0

- The implementation of the numerical interface inside the Matrix class making it possible to define a custom class to use for calculations with a custom type

## 2023-29-07, version 0.5.0

- More detailed explinations and more comments added


## 2023-29-07, version 0.6.0

- LUP decomposition added along with a few utility methods.

## 2023-05-08, version 0.6.1

- Updated readme and fixed two small bugs

## 2023-18-08, version 0.7.0


*means the method is static
- abs
- adjugate
- cofactor
- cofactorMatrix
- cond (condition number)
- fourier (a simple implementation with both DFT and FFT as options) ' I plan on improving this in the future
- infNorm (the infinity norm)
- isEmpty*
- isDiagonal*
- isIdentity
- isInvertible
- isSymmetric
- manhattanNorm (the Manhattan norm)
- map
- max
- min
- nullify*
- pNorm
- rank
- removeColumn
- removeRow
- reshape* (now works with instances of Matrix and 1D arrays)
- sum
- trace

- DFT
- FFT
- max
- min
- nthRoot
- pow
- sum
- Complex numbers