import { Numerical } from './src/@interfaces/numerical';



class Fraction {

    oneValue: Fraction = new Fraction(1, 1);
    zeroValue: Fraction = new Fraction(0, 1);

    numerator: number;
    denominator: number;


    constructor(fraction: string);
    constructor(numerator: number, denominator: number);
    constructor(a: string | number, b?: number) {
        if (typeof a === 'string') {
            // Parse the fraction string and set numerator and denominator
        } else if (typeof a === 'number' && typeof b === 'number') {
            this.numerator = a;
            this.denominator = b;
        } else {
            throw new Error("Invalid arguments");
        }
    }

}