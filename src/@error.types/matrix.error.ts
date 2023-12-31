
export class MatrixError extends Error {
    public readonly name: string;
    public readonly timestamp: string;
    public readonly statusCode: number;
    public readonly details: string | object | null;

    constructor(message: string, statusCode: number, details: string | object | null = null) {
        super(message);
        this.name = 'MatrixError';
        this.timestamp = new Date().toISOString();
        // Matrix Status Codes:

        // 800: Out of bounds
        // 801: Matrix validation error - Occurs when the supplied elements fail to form a proper matrix.
        // 802: Matrix dimensions error - Occurs when attempting operations involving matrices of incompatible dimensions.
        // 803: Invalid element for matrix error - Occurs when the matrix contains a non valid value.
        // 804: Not an instance of Matrix.

        // 805: Matrix Addition/Subtraction Error - Occurs when matrices of different dimensions or invalid types are added are added or subtracted.
        // 806: Reshape error - Occurs when dimensions are not correct
        // 807: Non numeric matrix used

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
        // 817: Non square matrix error, exept for det
        // 818: Matrix not Power of two error
        // 819: non invertible matrix
        // 820: Singular matrix

        //


        this.statusCode = statusCode;
        this.details = details;
    }

    public toJSON(): object {
        return {
            name: this.name,
            message: this.message,
            timestamp: this.timestamp,
            statusCode: this.statusCode,
            details: this.details,
            stack: this.stack,
        };
    }

    public toString(): string {
        return JSON.stringify(this.toJSON());
    }
}
