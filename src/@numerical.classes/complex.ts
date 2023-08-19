import { Numerical } from "../@interfaces";
import { ComplexNumber } from "../complex";


export class NumericalComplex implements Numerical<ComplexNumber> {

    zeroValue: ComplexNumber = { real: 0, imaginary: 0 };
    oneValue: ComplexNumber = { real: 1, imaginary: 0 };

    add(x: ComplexNumber, y: ComplexNumber): ComplexNumber {
        const real: number = x.real + y.real;
        const imaginary: number = x.imaginary + y.imaginary;
        return { real, imaginary };
    }

    subtract(x: ComplexNumber, y: ComplexNumber): ComplexNumber {
        const real = x.real - y.real;
        const imaginary = x.imaginary - y.imaginary;
        return { real, imaginary };
    }

    multiply(x: ComplexNumber, y: ComplexNumber): ComplexNumber {
        const real = x.real * y.real - x.imaginary * y.imaginary;
        const imaginary = x.real * y.imaginary + x.imaginary * y.real;
        return { real, imaginary };
    }

    divide(x: ComplexNumber, y: ComplexNumber): ComplexNumber {
        const divisor: number = y.real * y.real + y.imaginary * y.imaginary;
        const real: number = (x.real * y.real + x.imaginary * y.imaginary) / divisor;
        const imaginary: number = (x.imaginary * y.real - x.real * y.imaginary) / divisor;
        return { real, imaginary };
    }

    sqrt(x: ComplexNumber): ComplexNumber {
        const A: number = x.real;
        const B: number = x.imaginary;

        const real: number = Math.sqrt((A + Math.sqrt(A * A + B * B)) / 2);
        const imaginary: number = B >= 0 ? Math.sqrt((-A + Math.sqrt(A * A + B * B)) / 2) : -Math.sqrt((-A + Math.sqrt(A * A + B * B)) / 2);

        return { real, imaginary };
    }


    fromIntegral(n: number): ComplexNumber {
        return { real: n, imaginary: 0 };
    }

    toIntegral(n: ComplexNumber): number {
        return n.real;
    }

    toString(n: ComplexNumber): string {
        return `${n.real} + ${n.imaginary}i`;
    }

    signOperator(x: ComplexNumber): number {
        return Math.sign(x.real);
    }


}
