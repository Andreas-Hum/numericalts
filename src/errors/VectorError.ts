
export default class VectorError extends Error {
    public readonly name: string;
    public readonly timestamp: string;
    public readonly statusCode: number;
    public readonly details: string | object | null;

    constructor(message: string, statusCode: number, details: string | object | null = null) {
        super(message);
        this.name = 'VectorError';
        this.timestamp = new Date().toISOString();
        // Status Codes:
        // 601: Vector validation error
        // 602: Vector dimension error
        // 603: Invalid element for vector error
        // 604: Not an instance of vector
        // 605: Invalid boolean

        // 701: Vector Addition/Subtraction Error - Occurs when vectors of different dimensions are added or subtracted
        // 702: Invalid Scalar for Vector Multiplication Error - Occurs when a non-numeric value is used for scalar multiplication
        // 703: Vector Dot Product Error - Occurs when the dot product of vectors of different dimensions is calculated
        // 704: Zero Vector Error - Occurs when an illigal operation is attempted on a zero vector 
        // 705: Vector Equality Check Error - Occurs when an equality check is made between vectors of different dimensions
        // 706: Vector Orthogonality Check Error - Occurs when an orthogonality check is made between vectors of different dimensions
        // 707: Vector cross product error
        // 708: Vector norm error - Unknown error


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
