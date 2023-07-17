export class MatrixError extends Error {
  constructor(message, statusCode) {
    var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    super(message);
    this.name = 'MatrixError';
    this.timestamp = new Date().toISOString();
    // Matrix Status Codes:
    // 800: Out of bounds
    // 801: Matrix validation error - Occurs when the supplied elements fail to form a proper matrix.
    // 802: Matrix dimensions error - Occurs when attempting operations involving matrices of incompatible dimensions.
    // 803: Invalid element for matrix error - Occurs when the matrix contains a non-numeric value.
    // 804: Not an instance of Matrix.
    // 805: Matrix Addition/Subtraction Error - Occurs when matrices of different dimensions are added or subtracted.
    // 806: Reshape error - Occurs when dimensions are not correct
    // 807: Matrix Multiplication Error - Occurs when trying to multiply matrices of incompatible dimensions.
    // 806: Invalid Scalar for Matrix Multiplication Error - Occurs when a non-numeric value is used for scalar multiplication.
    // 807: Matrix Dot Product Error - Occurs when the dot product of matrices of different dimensions is calculated.
    // 808: Zero Matrix Error - Occurs when an illegal operation is attempted on a zero matrix.
    // 809: Matrix Equality Check Error - Occurs when an equality check is made between matrices of different dimensions.
    // 810: Matrix Multiplication Error - Occurs when trying to multiply matrices of incompatible dimensions.
    // 811: Determinant of Non-Square Matrix Error - Occurs when trying to calculate the determinant of a non-square matrix.
    // 812: Inverse of Non-Square Matrix Error - Occurs when trying to calculate the inverse of a non-square matrix.
    // 813: Matrix Norm Error - Unknown error.
    // 814: Unsolvabe system
    // 815: Back substitution error - matrix is not upper triangular
    // 816: Forward substitution error - matrix is not lower triangular
    //
    this.statusCode = statusCode;
    this.details = details;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      timestamp: this.timestamp,
      statusCode: this.statusCode,
      details: this.details,
      stack: this.stack
    };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
}