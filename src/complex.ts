/**
 * Represents a Complex number with real and imaginary components.
 */
export type ComplexNumber = {
    real: number;
    imaginary: number;
};


export function isComplexNumber(obj: any): obj is ComplexNumber {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "real" in obj && typeof obj.real === "number" &&
        "imaginary" in obj && typeof obj.imaginary === "number" &&
        Object.keys(obj).length === 2
    );
}
