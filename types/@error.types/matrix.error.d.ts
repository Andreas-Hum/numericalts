export declare class MatrixError extends Error {
    readonly name: string;
    readonly timestamp: string;
    readonly statusCode: number;
    readonly details: string | object | null;
    constructor(message: string, statusCode: number, details?: string | object | null);
    toJSON(): object;
    toString(): string;
}
