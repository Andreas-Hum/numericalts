import VectorError from "../errors/vector.error";
import { Vector } from "../vector/vector";
import Constants from "./constants";

export {
    vectorArrayCheck,
    vectorShapeCheck,
    vectorSizeCheck,
    vectorScalarCheck,
    vectorZeroError
}



function vectorSizeCheck(vector1: Vector, vector2: Vector): void {
    if (vector1.size !== vector2.size) {
        throw new VectorError("Dimension mismatch: Sizes does not match", 602, { originalVector: vector1.size, errorVector: vector2.size })
    }
}

function vectorShapeCheck(vector1: Vector, vector2: Vector): void {
    if (vector1.shape !== vector2.shape) {
        throw new VectorError(`Dimension mismatch: shapes does not match`,
            703,
            { vectorOne_shape: vector1.shape, vectorTwo_shape: vector2.shape });
    }
}

function vectorArrayCheck(elementToCheck: any): void {
    if (!Array.isArray(elementToCheck)) {
        throw new VectorError('Elements input must be an array.', 601);
    }
}

function vectorScalarCheck(scalar: number) {
    if (typeof scalar !== "number") {
        throw new VectorError("Invalid Scalar for Vector Multiplication Error", 702, { invalidScalar: scalar })
    }
}

function vectorZeroError(property: number, message: string) {
    if (Math.abs(property) < Constants.DELTA) {
        throw new VectorError(message, 704);

    }

}
