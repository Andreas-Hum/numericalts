//Type imports
import type { Vector as VectorType } from "./vector-types";

//Error import
import { VectorError } from "../Errors/validation-error";


class Vector implements VectorType {

    //Shape
    public readonly shape = "0";

    //Row or column
    public readonly rows = Infinity;
    public readonly columns = Infinity;

    //Properties
    public readonly norm = Infinity;
    public readonly size = Infinity

    //Element Data
    public elements;


    constructor(elements: number[]) {
        this.elements = elements;
        this.size = elements.length;

    }

    //Validating the vector
    private ValidateVector() {
        let column_elements = 0

        //Checks weather the array should be a vector or column
        for (let i = 0; i < this.size; i++) {
            if (Array.isArray(this.elements[i])) {
                column_elements++;
            }
        }

        if (column_elements > 0 && column_elements !== this.size) {
            throw new VectorError("The vector should either be a column or row vector")
        }


        return false;
    }


    public Norm() {

    }


}