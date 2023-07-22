
export class NumericalError extends Error {
    public readonly name: string;
    public readonly timestamp: string;
    public readonly statusCode: number;
    public readonly details: string | object | null;

    constructor(message: string, statusCode: number, details: string | object | null = null) {
        super(message);
        this.name = 'NumericalError';
        this.timestamp = new Date().toISOString();
        // Numerical Status Codes:

        // 901 No appropriate Numeric implementation was provided.


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
