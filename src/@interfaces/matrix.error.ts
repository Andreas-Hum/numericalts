export {MatrixError}

interface MatrixError {
  readonly name: string;
  readonly timestamp: string;
  readonly statusCode: number;
  readonly details: string | object | null;
  constructor(message: string, statusCode: number, details?: string | object | null): void;
  toJSON(): object;
  toString(): string;
}