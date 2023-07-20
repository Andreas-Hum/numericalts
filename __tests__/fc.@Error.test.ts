import fc from 'fast-check';

import { NumericalError } from '../src/@error.types/numerical.error';
import { MatrixError } from '../src/@error.types/matrix.error';

describe('Error test ', () => {
    // Test for constructing NumericalError instances
    test('Creating NumericalError instance', () => {
        fc.assert(
            fc.property(fc.string(), fc.integer(), fc.oneof(fc.string(), fc.constant(null)), (message, statusCode, details) => {
                const error = new NumericalError(message, statusCode, details);

                // Check if the properties are set correctly
                expect(error).toBeInstanceOf(NumericalError);
                expect(error.name).toBe('NumericalError');
                expect(error.message).toBe(message);
                expect(error.statusCode).toBe(statusCode);
                expect(error.details).toBe(details);

                // Check if the timestamp is set correctly
                expect(error.timestamp).toBeDefined();
                expect(new Date(error.timestamp).toISOString()).toBe(error.timestamp);

                // Check if the toJSON method returns the correct object
                const jsonObject = error.toJSON();
                expect(jsonObject).toEqual({
                    name: 'NumericalError',
                    message,
                    timestamp: error.timestamp,
                    statusCode,
                    details,
                    stack: expect.any(String), // The stack is expected to be a string (can't predict the exact value due to dynamic nature)
                });

                // Check if the toString method returns the correct string
                const jsonString = error.toString();
                expect(jsonString).toBe(JSON.stringify(jsonObject));

                return true;
            })
        );
    });


    // Test for constructing MatrixError instances
    test('Creating MatrixError instance', () => {
        fc.assert(
            fc.property(fc.string(), fc.integer(), fc.oneof(fc.string(), fc.constant(null)), (message, statusCode, details) => {
                const error = new MatrixError(message, statusCode, details);

                // Check if the properties are set correctly
                expect(error).toBeInstanceOf(MatrixError);
                expect(error.name).toBe('MatrixError');
                expect(error.message).toBe(message);
                expect(error.statusCode).toBe(statusCode);
                expect(error.details).toBe(details);

                // Check if the timestamp is set correctly
                expect(error.timestamp).toBeDefined();
                expect(new Date(error.timestamp).toISOString()).toBe(error.timestamp);

                // Check if the toJSON method returns the correct object
                const jsonObject = error.toJSON();
                expect(jsonObject).toEqual({
                    name: 'MatrixError',
                    message,
                    timestamp: error.timestamp,
                    statusCode,
                    details,
                    stack: expect.any(String), // The stack is expected to be a string (can't predict the exact value due to dynamic nature)
                });

                // Check if the toString method returns the correct string
                const jsonString = error.toString();
                expect(jsonString).toBe(JSON.stringify(jsonObject));

                return true;
            })
        );
    });
});
