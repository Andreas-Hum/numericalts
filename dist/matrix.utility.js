// Matrix class
import Matrix from "./matrix";
// Math utility class
import Constants from "./constants";
import math from "./math";
import { MatrixError } from "./@error.types";
export default class MatrixUtils {
  /**
   * Clones the matrix instance and returns the clone
   * @public
   * @static
   * @returns {Matrix<any>} The cloned matrix
   */
  static clone(A) {
    return new Matrix(A.toArray());
  }
  /**
   * Method used to pad the matrix dimensions to the nearest power of two.
   * @public
   * @static
   * @param {Matrix<number>} A - The matrix to pad
   * @returns {Matrix<number>} The padded matrix with dimensions as a power of two.
   */
  static padMatrixToPowerOfTwo(A) {
    var rows = A.rows;
    var columns = A.columns;
    var maxDimension = Math.max(rows, columns);
    var nextPower = math.nextPowerOfTwo(maxDimension);
    if (nextPower === rows && nextPower === columns) {
      return A; // No padding required as the matrix is already a power of two.
    }

    var paddedMatrix = Array(nextPower * nextPower).fill(0);
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        paddedMatrix[i * nextPower + j] = A.mElements[i * columns + j];
      }
    }
    return new Matrix(paddedMatrix, nextPower, nextPower);
  }
  /**
   * Rounds values close to zero in the given array and modifies the matrix in place
   * @public
   * @static
   * @param { Matrix<number>} A - Matrix consisting of numbers
   * @param {number} threshold - The threshold value for rounding to zero. Default is 1e-7.
   * @returns {void}
   */
  static roundMatrixToZero(A) {
    var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Constants.DELTA;
    var size = A.size;
    for (var i = 0; i < size; i++) {
      if (Math.abs(A.mElements[i]) < threshold) {
        A.mElements[i] = 0;
      }
    }
  }
  /**
   * Rounds all elements of a matrix in place to a specified number of decimal places using a specified base.
   * @public
   * @static
   * @param {Matrix} A - The matrix to round.
   * @param {number} digits - The number of decimal places to round to.
   * @param {number} base - The base to use for rounding. Defaults to 10 if not provided.
   * @returns {void}
   */
  static toFixedMatrix(A, digits) {
    var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
    A.mElements = A.mElements.map(entry => math.toFixedNumber(entry, digits, base));
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Static factory methods
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Creates an identity matrix with the specified dimension.
   * @public
   * @static
   * @param {number} dimension - The dimension of the identity matrix.
   * @returns {Matrix} The identity matrix.
   * @throws {MatrixError} - If the dimension is less than or equal to 0.
   */
  static identity(dimension) {
    if (dimension <= 0 || typeof dimension !== "number") throw new MatrixError("Invalid argument", 606, {
      dimension
    });
    var entries = [];
    for (var i = 0; i < dimension; i++) {
      var row = [];
      for (var j = 0; j < dimension; j++) {
        if (i === j) {
          row.push(1);
        } else {
          row.push(0);
        }
      }
      entries.push(row);
    }
    return new Matrix(entries);
  }
  /**
   * Creates a matrix filled with ones with the specified number of rows and columns.
   * @public
   * @static
   * @param {number} rows - The number of rows in the matrix.
   * @param {number} columns - The number of columns in the matrix.
   * @returns {Matrix} - The matrix filled with ones.
   * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
   */
  static ones(rows, columns) {
    if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, {
      rows,
      columns
    });
    return new Matrix(new Array(rows).fill(1).map(() => new Array(columns).fill(1)));
  }
  /**
   * Creates a random matrix with the specified number of rows and columns.
   * @public
   * @static
   * @param {number} rows - The number of rows in the matrix.
   * @param {number} columns - The number of columns in the matrix
   * @returns {Matrix} The randomized matrix
   * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
   */
  static random(rows, columns) {
    if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, {
      rows,
      columns
    });
    var entries = [];
    for (var i = 0; i < rows; i++) {
      var row = [];
      for (var j = 0; j < columns; j++) {
        var randomValue = Math.random() * 100;
        row.push(randomValue);
      }
      entries.push(row);
    }
    return new Matrix(entries);
  }
  /**
   * Creates a matrix filled with zeros with the specified number of rows and columns.
   * @public
   * @static
   * @param {number} rows - The number of rows in the matrix.
   * @param {number} columns - The number of columns in the matrix.
   * @returns {Matrix} - The matrix filled with zeros.
   * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
   */
  static zeros(rows, columns) {
    if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, {
      rows,
      columns
    });
    return new Matrix(new Array(rows).fill(0).map(() => new Array(columns).fill(0)));
  }
}