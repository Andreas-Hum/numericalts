//Type imports
import type { Vector as VectorType } from "./vector-types";

//Error import
import { VectorError } from "../Errors/validation-error";


class Vector implements VectorType {

    //Shape
    public shape = "0";

    //Row or column
    public isRow = false;
    public isColumn = false;
    public rows = Infinity;
    public columns = Infinity;


    //Properties
    public norm = Infinity;
    public size = Infinity

    //Element Data
    public elements;


    constructor(elements: number[] | number[][]) {
        this.elements = elements;
        this.size = elements.length;
        this.ValidateVector()


    }


    private ValidateVector(): void {
        if (Array.isArray(this.elements[0])) {
            this.isColumn = true;
            this.isRow = false;
        } else {
            this.isColumn = false;
            this.isRow = true;
        }

        this.ChangeRowsColumns();
        this.ChangeSize(this.rows, this.columns)
    }

    //Validating the vector DEPRICATED
    // private ValidateVector(): void {
    //     let column_elements = 0

    //     //Validates that the vector is either a column or row vector
    //     for (let i = 0; i < this.size; i++) {
    //         if (Array.isArray(this.elements[i])) {
    //             column_elements++;
    //         }
    //     }

    //     if (column_elements > 0 && column_elements !== this.size) {
    //         throw new VectorError("The vector should either be a column or row vector")
    //     } else if (column_elements === this.size) { //Column vector
    //         //Checks if the dimentions of entrys are 1 if the list
    //         const dimention_test: number = this.elements.findIndex((entry: number[]) => entry.length > 0)

    //         if (dimention_test !== -1) {
    //             throw new VectorError(`Dimentions of entries can't be greater than 1: At entry ${this.elements[dimention_test]}`);
    //         }

    //         //Change the type to column;
    //         this.isColumn = true;
    //         this.isRow = false;

    //     } else { //Row vector
    //         this.isColumn = false;
    //         this.isRow = true;
    //     }

    //     this.ChangeRowsColumns();
    //     this.ChangeSize(this.rows, this.columns)
    // }



    //
    // CHANGEING PROPERTIES
    //

    /**
     * Changes the size properties
     * @param rows The amount of rows
     * @param columns  The amount of columns
     */
    private ChangeSize(rows: number, columns: number): void {
        this.shape = `(${rows},${columns})`
    }


    /**
     * Changes the rows and columns properties
     */
    private ChangeRowsColumns(): void {
        let rows = Infinity, columns = Infinity;

        if (this.isRow) { //Row vector
            rows = this.size;
            columns = 1;
        } else if (this.isColumn) { //Column vector
            columns = this.size;
            rows = 1
        } else {
            throw new VectorError("Error changeing rows and columns?")
        }

        this.rows = rows;
        this.columns = columns;

    }

    /**
     * Changes the euclidian norm property
     * @param newNorm The new norm
     */
    private ChangeNorm(newNorm: number): void {
        this.norm = newNorm
    }


    public Norm() {

    }


}


