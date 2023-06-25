export class VectorError extends Error {
    public readonly timestamp: string;

    constructor(message: string) {
        super(message);
        this.timestamp = new Date().toISOString();
    }

    public toJSON(): object {
        return {
            message: this.message,
            timestamp: this.timestamp,
            stack: this.stack,
        };
    }

}
