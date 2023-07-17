// Error import
import { MatrixError } from "./@error.types";
// Math class  import
import math from "./math";
// Utility import
import Constants from "./constants";
export default class Matrix {
  /**
   * Constructs a matrix object.
   * @param {T[][] | T[]} entries - The entries of the matrix.
   * @param {number} rows - The number of rows in the matrix.
   * @param {number} columns - The number of columns in the matrix.
   */
  constructor(entries, rows, columns) {
    this.shape = "0";
    this.isSquare = false;
    this.isTall = false;
    this.isWide = false;
    this.rows = Infinity;
    this.columns = Infinity;
    this.size = Infinity;
    this.dataType = "none";
    if (!Array.isArray(entries)) {
      throw new MatrixError("Matrix has to be an array", 801, {
        entries
      });
    }
    if (this.is1dArray(entries)) {
      if (rows === undefined || columns === undefined || typeof rows !== "number" || typeof columns !== "number" || columns <= 0 || rows <= 0) {
        throw new MatrixError("Rows and columns must be defined for 1D array entries, rows and columns must be of type number and not be 0 or negative", 804);
      }
      this.valida1Dentries(entries);
      this.mElements = entries;
      this.rows = rows;
      this.columns = columns;
      this.size = rows * columns;
    } else {
      var numRows = entries.length;
      var numCols = entries[0].length;
      this.mElements = new Array(numRows * numCols);
      for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
          var index = i * numCols + j;
          this.mElements[index] = entries[i][j];
        }
      }
      this.valida1Dentries(this.mElements);
      this.rows = numRows;
      this.columns = numCols;
      this.size = numRows * numCols;
    }
    this.updateMatrix();
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Typeguards
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////s
  isNumberMatrix(matrix) {
    return matrix.mElements.every(element => typeof element === "number");
  }
  isBigIntMatrix(matrix) {
    return matrix.mElements.every(element => typeof element === "bigint");
  }
  isNumberArray(arr) {
    return arr.every(element => typeof element === "number");
  }
  isBigIntArray(arr) {
    return arr.every(element => typeof element === "number");
  }
  getInterfaceName(value) {
    //@ts-ignore
    return value.constructor.name;
  }
  getType(value) {
    return typeof value;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Validation and updating
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////s
  /**
   * Validates the entries of a matrix to ensure they are of the correct form.
   * @private
   * @param {T[][]} entries - The entries of the matrix.
   * @returns {boolean} True if the entries are valid, false otherwise.
   */ //TODO: make better typecheck
  validateMatrixEntries(entries) {
    var numRows = entries.length;
    if (numRows === 0) {
      return false;
    }
    var numCols = entries[0].length;
    if (numCols === 0) {
      return false;
    }
    var typeName;
    for (var i = 0; i < numRows; i++) {
      if (!Array.isArray(entries[i]) || entries[i].length !== numCols) {
        return false;
      }
      for (var j = 0; j < numCols; j++) {
        if (typeof entries[i][j] !== typeof entries[0][0]) {
          return false;
        }
      }
    }
    return true;
  }
  is1dArray(entries) {
    return !entries.some(entry => Array.isArray(entry));
  }
  /**
   * Validates the entries of a 1d T array to ensure they are valid.
   * @private
   * @param {T} entries - The entries of the matrix.
   * @returns {void}
   */ //TODO: make better typecheck
  valida1Dentries(entries) {
    var typeName;
    if (typeof entries[0] === "object") {
      typeName = this.getInterfaceName(entries[0]);
      for (var i = 0; i < entries.length; i++) {
        if (this.getInterfaceName(entries[i]) !== typeName) {
          throw new MatrixError("Invalid entries not of the same type", 805, {
            entry: entries[i]
          });
        }
      }
    } else {
      typeName = this.getType(entries[0]);
      for (var _i = 0; _i < entries.length; _i++) {
        if (this.getType(entries[_i]) !== typeName) {
          console.log(entries[15]);
          throw new MatrixError("Invalid entries not of the same type", 805, {
            entry: entries[_i]
          });
        }
      }
    }
    this.dataType = typeName;
  }
  /**
  * Updates all aspects of Matrix.
  * @private
  * @returns {void}
  */
  updateMatrix() {
    this.updateSpecification();
    this.updateShape();
  }
  /**
   * Updates matrix-related specifcation
   * @private
   * @returns {void}
   */
  updateSpecification() {
    if (this.rows > this.columns) {
      this.isTall = !this.isTall;
    } else if (this.columns > this.rows) {
      this.isWide = !this.isWide;
    } else {
      this.isSquare = !this.isSquare;
    }
  }
  /**
   * Updates the shape of the Matrix.
   * @private
   * @returns {void}
   */
  updateShape() {
    this.shape = "(".concat(this.rows, ",").concat(this.columns, ")");
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Set- and getter methods
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
  * Gets the value of an element in the matrix.
  * @public
  * @param {number} row - The row index of the element starts from zero.
  * @param {number} column - The row index of the element starts from zero.
  * @returns {T} The value of the element.
  * @throws {MatrixError} - If index is out of bounds
  */
  getElement(row, column) {
    if (typeof row !== "number" || typeof column !== "number") throw new MatrixError("Invalid arugment", 606, {
      row,
      column
    });
    var index = row * this.columns + column;
    if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, {
      row,
      column
    });
    return this.mElements[index];
  }
  /**
   * Gets a specific row of the matrix.
   * @public
   * @param {number} rowIndex - The index of the row to retrieve (starting from 1).
   * @returns {T[]} An array representing the specified row of the matrix.
   * @throws {MatrixError} If the rowIndex is out of bounds.
   */
  getRow(rowIndex) {
    if (typeof rowIndex !== "number") throw new MatrixError("Invalid argument", 606, {
      rowIndex
    });
    if (rowIndex <= 0 || rowIndex > this.rows) throw new MatrixError("Row index out of bounds", 800, {
      rowIndex
    });
    var row = [];
    var startIndex = (rowIndex - 1) * this.columns;
    var endIndex = startIndex + this.columns;
    for (var i = startIndex; i < endIndex; i++) {
      row.push(this.mElements[i]);
    }
    return row;
  }
  /**
   * Gets a specific column of the matrix.
   * @public
   * @param {number} columnIndex - The index of the column to retrieve (starting from 1).
   * @returns {T[]} An array representing the specified column of the matrix.
   * @throws {MatrixError} If the columnIndex is out of bounds.
   */
  getColumn(columnIndex) {
    if (typeof columnIndex !== "number") throw new MatrixError("Invalid argument", 606, {
      columnIndex
    });
    if (columnIndex <= 0 || columnIndex > this.columns) throw new MatrixError("Column index out of bounds", 800, {
      columnIndex
    });
    var column = [];
    var startIndex = columnIndex - 1;
    var endIndex = this.rows * this.columns + (columnIndex - 1);
    for (var i = startIndex; i < endIndex; i += this.columns) {
      column.push(this.mElements[i]);
    }
    return column;
  }
  /**
   * Sets the value of an element in the matrix.
   * @public
   * @param {number} row - The row index of the element starts from zero.
   * @param {number} column - The row index of the element starts from zero.
   * @param {T} value - The value to set.
   * @returns {void}
   * @throws {MatrixError} - If the value is an invalid element or index is out of bounds
   */
  setElement(row, column, value) {
    if (typeof value !== typeof this.mElements[0] || typeof row !== "number" || typeof column !== "number") throw new MatrixError("Invalid arugment", 606, {
      value,
      row,
      column
    });
    var index = row * this.columns + column;
    if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, {
      row,
      column
    });
    this.mElements[index] = value;
  }
  /**
   * Retrieves a submatrix from the current matrix.
   * @public
   * @param {number} startRow - The starting row index of the submatrix.
   * @param {number} startCol - The starting column index of the submatrix.
   * @param {number} endRow - The ending row index of the submatrix (exclusive).
   * @param {number} endCol - The ending column index of the submatrix (exclusive).
   * @returns {Matrix<T>} A new Matrix object representing the submatrix.
   */
  getSubMatrix(startRow, endRow, startCol, endCol) {
    var numRows = endRow - startRow;
    var numCols = endCol - startCol;
    var submatrixElements = new Array(numRows * numCols);
    for (var i = 0; i < numRows; i++) {
      for (var j = 0; j < numCols; j++) {
        var index = i * numCols + j;
        var originalIndex = (startRow + i) * this.columns + (startCol + j);
        submatrixElements[index] = this.mElements[originalIndex];
      }
    }
    return new Matrix(submatrixElements, numRows, numCols);
  }
  /**
  * @public
  * @param {number} startRow - The starting row index of the submatrix.
    @param {number} endRow - The ending row index of the submatrix.
  * @param {number} startCol - The starting column index of the submatrix.
  * @param {number} endCol - The ending column index of the submatrix.
  * @param {Matrix<T>} subMatrix - The elements of the submatrix to be set.
  */
  setSubMatrix(startRow, endRow, startCol, endCol, subMatrix) {
    if (startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows || startCol < 0 || startCol >= this.columns || endCol < 0 || endCol >= this.columns) {
      throw new MatrixError("Invalid submatrix indices", 805);
    }
    var subMatrixRows = endRow - startRow + 1;
    var subMatrixColumns = endCol - startCol + 1;
    if (subMatrixRows !== subMatrix.rows || subMatrixColumns !== subMatrix.columns) {
      throw new MatrixError("Submatrix dimensions do not match", 806);
    }
    var subMatrixElements = subMatrix.mElements;
    for (var i = startRow; i <= endRow; i++) {
      for (var j = startCol; j <= endCol; j++) {
        var subMatrixRowIndex = i - startRow;
        var subMatrixColumnIndex = j - startCol;
        var subMatrixValue = subMatrixElements[subMatrixRowIndex * subMatrix.columns + subMatrixColumnIndex];
        var index = i * this.columns + j;
        this.mElements[index] = subMatrixValue;
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Mathematical operations, example, add, subtract, multiply and so forth
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Adds another matrix to this matrix.
   * @public
   * @param { Matrix<number> } B - The matrix to add.
   * @returns {Matrix<number>} The resulting matrix.
   */
  add(B) {
    if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for addition", 805, {
      ARows: this.rows,
      AColumns: this.columns,
      BRows: B.rows,
      BColumns: B.columns
    });
    if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
      B
    });
    if (this.dataType !== B.dataType) {
      throw new MatrixError("Matrices have different element types", 806, {
        AType: typeof this.mElements[0],
        BType: typeof B.mElements[0]
      });
    }
    var resultElements = JSON.parse(JSON.stringify(this.mElements));
    var size = this.size;
    for (var i = 0; i < size; i++) {
      resultElements[i] += B.mElements[i];
    }
    return new Matrix(resultElements, this.rows, this.columns);
  }
  // /**
  //  * Adds another matrix to this matrix. is async and faster
  //  * @public
  //  * @param {Matrix} B - The matrix to add.
  //  * @returns {Matrix} The resulting matrix.
  //  */
  // public async addasync(B: Matrix): Promise<Matrix> {
  //     if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for addition", 805, { ARows: this.rows, AColumns: this.columns, BRows: B.rows, BColumns: B.columns });
  //     if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, { B });
  //     const resultElements: Float32Array = new Float32Array(this.mElements);
  //     const size: number = this.size;
  //     // Calculate the chunk size based on the number of available processors
  //     const numProcessors: number = os.cpus().length;
  //     const chunkSize: number = Math.ceil(size / numProcessors);
  //     const promises: any[] = [];
  //     for (let i = 0; i < numProcessors; i++) {
  //         const start: number = i * chunkSize;
  //         const end: number = Math.min(start + chunkSize, size);
  //         promises.push(
  //             new Promise<void>((resolve) => {
  //                 // Perform addition in parallel for the chunk
  //                 for (let j = start; j < end; j++) {
  //                     resultElements[j] += B.mElements[j];
  //                 }
  //                 resolve();
  //             })
  //         );
  //     }
  //     // Wait for all promises to resolve
  //     await Promise.all(promises);
  //     return new Matrix(resultElements, this.rows, this.columns);
  // }
  /**
       * Performs the Gram-Schmidt process for the columns of the given matrix. The process is an algorithm
       * to orthonormalize a set of vectors in an inner product space, generally Euclidean n-space.
       *
       * The method takes the columns (considered as vectors) of the current matrix instance and generates an orthogonal
       * set of vectors that spans the same column space as the original set. The set of orthonormal vectors is computed
       * sequentially by subtracting the projections of a matrix column vector onto the previously computed orthogonal
       * vectors from the column vector itself.
       *
       * @returns {Matrix<number>} A new Matrix instance constructed using the orthonormal vectors as columns.
       *
       * @throws {MatrixError} If any column obtained during the process is nearly zero (having euclidean norm lesser than a small
       * constant - `DELTA`). In this case, this means that the provided set is not linearly independent.
       *
       * @public
       */
  gramSmith() {
    var _this = this;
    var orthogonalColumns = [];
    orthogonalColumns.push(this.getColumn(1));
    var columns = this.columns;
    for (var i = 1; i < columns; i++) {
      var orthogonalProjection = [...this.getColumn(i + 1)]; // Initialize orthogonalProjection as a copy of the current column
      var _loop = function _loop() {
        var u = orthogonalColumns[j];
        var v = _this.getColumn(i + 1);
        var uv = math.dot(u, v);
        var uu = math.dot(u, u);
        var scalar = uv / uu;
        var projectionOf_I_onto_J = u.map(entry => entry * scalar);
        orthogonalProjection = orthogonalProjection.map((entry, index) => entry - projectionOf_I_onto_J[index]);
      };
      for (var j = 0; j < i; j++) {
        _loop();
      }
      if (Math.sqrt(orthogonalProjection.map(x => Math.pow(x, 2)).reduce((acc, x) => acc + x)) < Constants.DELTA) {
        throw new MatrixError("Cannot normalize a nearly-zero column. The given columns are not linearly independent.", 704);
      }
      orthogonalColumns.push(orthogonalProjection);
    }
    var normalizedColumns = orthogonalColumns.map(column => math.normalize(column));
    var transposedArray = normalizedColumns[0].map((_, colIndex) => normalizedColumns.map(row => row[colIndex]));
    return new Matrix(transposedArray);
  }
  /**
   * Multiplies this matrix with another matrix using the naive algorithm
   * @public
   * @param {Matrix<number>} B - The matrix to multiply with.
   * @returns {Matrix<number>} The resulting matrix.
   */
  multiply(B) {
    if (this.columns !== B.rows) {
      throw new MatrixError("Invalid matrix dimensions for multiplication", 807, {
        rows: B.rows,
        columns: this.columns
      });
    }
    var rows = this.rows;
    var columns = this.columns;
    var matrixColumns = B.columns;
    var multipliersA = JSON.parse(JSON.stringify(this.mElements));
    ;
    var multipliersB = B.transpose().mElements;
    var result = new Array(rows * matrixColumns);
    var unrollingFactor = Math.min(columns, 16);
    for (var i = 0; i < rows; i++) {
      var rowOffsetA = i * columns;
      var rowOffsetResult = i * matrixColumns;
      for (var j = 0; j < matrixColumns; j++) {
        var sum = 0;
        var colOffsetB = j * unrollingFactor;
        for (var k = 0; k < columns; k += unrollingFactor) {
          var limit = Math.min(k + unrollingFactor, columns);
          for (var u = k; u < limit; u++) {
            sum += multipliersA[rowOffsetA + u] * multipliersB[colOffsetB + u];
          }
        }
        result[rowOffsetResult + j] = sum;
      }
    }
    return new Matrix(result, rows, matrixColumns);
  }
  //TODO: fix the negative pow
  /**
   * Raises the matrix to the power of `exp`.
   *
   * @param exp - The exponent to raise the matrix to.
   * @returns { Matrix<number>} The resulting matrix after raising it to the power of `exp`.
   * @throws {MatrixError} if the matrix is not square.
   */
  pow(exp) {
    if (!this.isSquare) {
      throw new MatrixError("Can't multiply a non-square matrix with itself.", 810, {
        A: this.isSquare
      });
    }
    if (exp === 0) {
      // Return the identity matrix if the exponent is 0
      return Matrix.identity(this.rows);
    }
    if (exp === 1) {
      // Return the matrix itself if the exponent is 1
      return this;
    }
    if (exp % 2 === 0) {
      // If the exponent is even, recursively calculate the square root of the matrix
      var sqrtMatrix = this.pow(exp / 2);
      return sqrtMatrix.multiply(sqrtMatrix);
    } else {
      // If the exponent is odd, recursively calculate the square root of the matrix and multiply it with the matrix itself
      var _sqrtMatrix = this.pow((exp - 1) / 2);
      return this.multiply(_sqrtMatrix.multiply(_sqrtMatrix));
    }
  }
  /**
   * Scales the matrix and returns a new matrix with the result of the scaling
   * @public
   * @param {number} scalar - The scalar to scale the matrix with
   * @returns { Matrix<number>} The scaled matrix
   */
  scale(scalar) {
    if (typeof scalar !== "number") throw new MatrixError("Invalid scalar", 606, {
      scalar
    });
    var scaledMatrix = Matrix.clone(this);
    scaledMatrix.mElements = scaledMatrix.mElements.map(entry => entry * scalar);
    return scaledMatrix;
  }
  /**
     * Performs matrix multiplication using the Strassen's algorithm.
     * @public
     * @param { Matrix<number>} B - The matrix to multiply with.
     * @returns { Matrix<number>} The result of matrix multiplication.
     */
  strassenMultiply(B) {
    if (!this.isSquare && !B.isSquare) {
      throw new MatrixError("Both matrices has to be square", 810, {
        A: this.isSquare,
        B: B.isSquare
      });
    }
    // Base case: If matrices are 1x1, perform simple multiplication
    if (this.rows === 1 && this.columns === 1 && B.rows === 1 && B.columns === 1) {
      var resultElement = this.mElements[0] * B.mElements[0];
      return new Matrix([resultElement], 1, 1);
    }
    // Pad matrices to the nearest power of two
    var A = Matrix.padMatrixToPowerOfTwo(this);
    var C = Matrix.padMatrixToPowerOfTwo(B);
    var n = A.rows;
    var halfN = n / 2;
    // Create submatrices for A and B
    var A11 = A.getSubMatrix(0, halfN, 0, halfN);
    var A12 = A.getSubMatrix(0, halfN, halfN, n);
    var A21 = A.getSubMatrix(halfN, n, 0, halfN);
    var A22 = A.getSubMatrix(halfN, n, halfN, n);
    var B11 = C.getSubMatrix(0, halfN, 0, halfN);
    var B12 = C.getSubMatrix(0, halfN, halfN, n);
    var B21 = C.getSubMatrix(halfN, n, 0, halfN);
    var B22 = C.getSubMatrix(halfN, n, halfN, n);
    // Compute intermediate matrices
    var P1 = A11.strassenMultiply(B12.subtract(B22));
    var P2 = A11.add(A12).strassenMultiply(B22);
    var P3 = A21.add(A22).strassenMultiply(B11);
    var P4 = A22.strassenMultiply(B21.subtract(B11));
    var P5 = A11.add(A22).strassenMultiply(B11.add(B22));
    var P6 = A12.subtract(A22).strassenMultiply(B21.add(B22));
    var P7 = A11.subtract(A21).strassenMultiply(B11.add(B12));
    // Compute submatrices of the result
    var C11 = P5.add(P4).subtract(P2).add(P6);
    var C12 = P1.add(P2);
    var C21 = P3.add(P4);
    var C22 = P5.add(P1).subtract(P3).subtract(P7);
    // Create the result matrix
    var result = new Matrix(new Array(n * n), n, n);
    result.setSubMatrix(0, halfN - 1, 0, halfN - 1, C11);
    result.setSubMatrix(0, halfN - 1, halfN, n - 1, C12);
    result.setSubMatrix(halfN, n - 1, 0, halfN - 1, C21);
    result.setSubMatrix(halfN, n - 1, halfN, n - 1, C22);
    return result.getSubMatrix(0, this.rows, 0, B.columns);
  }
  /**
   * Subtracts another matrix from this matrix.
   * @public
   * @param { Matrix<number>} B - The matrix to subtract.
   * @returns { Matrix<number>} The resulting matrix.
   */
  subtract(B) {
    if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for subtraction", 805, {
      ARows: this.rows,
      AColumns: this.columns,
      BRows: B.rows,
      BColumns: B.columns
    });
    if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
      B
    });
    var resultElements = JSON.parse(JSON.stringify(this.mElements));
    var size = this.size;
    for (var i = 0; i < size; i++) {
      resultElements[i] -= B.mElements[i];
    }
    return new Matrix(resultElements, this.rows, this.columns);
  }
  /**
   * Performs vector-matrix multiplication by multiplying each element of the matrix by the corresponding element in the input vector.
   * @param {number[]} vector - The input vector.
   * @returns {Matrix<number>} A new matrix resulting from the vector-matrix multiplication.
   * @throws {MatrixError} If the input vector is not an array or if its length doesn't match the number of columns in the matrix.
   */
  vMultiply(vector) {
    if (!Array.isArray(vector)) throw new MatrixError("The input vector is not an array", 606, {
      vector
    });
    if (vector.length !== this.columns) throw new MatrixError("The length of the input vector must be equal to the number of columns in the matrix", 802, {
      matrixColumns: this.columns,
      vectorLength: vector.length
    });
    var resultMatrix = Matrix.clone(this);
    var rows = resultMatrix.rows;
    var columns = resultMatrix.columns;
    for (var i = 0; i < columns; i++) {
      var multiplier = vector[i];
      for (var j = 0; j < rows; j++) {
        resultMatrix.mElements[j * columns + i] = resultMatrix.mElements[j * columns + i] * multiplier;
      }
    }
    return resultMatrix;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Solving systems
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Performs back-substitution on an upper triangular matrix to solve
   * a system of linear equations.
   * @public
   * @returns {number[]} Solution to the system of linear equations
   *
   * @throws {MatrixError} if the matrix is not upper traiangluar, if b is not an array or if the matrix contains a zero on the diagonal (unsolvable system)
   */
  backSubstitution(b) {
    if (!Matrix.isUpperTriangular(this)) throw new MatrixError("Matrix is not upper triangular", 815, {
      matrix: this
    });
    if (!Array.isArray(b)) throw new MatrixError("b is not an array", 606, {
      b
    });
    if (b.length !== this.rows) throw new MatrixError("b does not have the same number of entries as the amount of rows of the matrix A", 802, {
      rowsOfA: this.rows,
      entriesOfb: b.length
    });
    var sol = [];
    var rows = this.rows;
    var columns = this.columns;
    for (var i = rows - 1; i >= 0; i--) {
      var currentDiag = this.getElement(i, i);
      if (currentDiag === 0) throw new MatrixError("Unsolvable system: zero on diagonal", 814, {
        matrix: this
      });
      var sum = 0;
      for (var j = columns - 1; j > i; j--) {
        sum += sol[j] * this.getElement(i, j);
      }
      sol[i] = (b[i] - sum) / currentDiag;
    }
    return sol;
  }
  /**
   * Performs forward-substitution on an lower triangular matrix to solve
   * a system of linear equations.
   * @public
   *
   * @returns {number[]} Solution to the system of linear equations
   * @throws {MatrixError} if the matrix is not lowerf traiangluar, if b is not an array or if the matrix contains a zero on the diagonal (unsolvable system)
   */
  forwardSubstitution(b) {
    if (!Matrix.isLowerTriangular(this)) throw new MatrixError("Matrix is not lower triangular", 816, {
      matrix: this
    });
    if (!Array.isArray(b)) throw new MatrixError("b is not an array", 606, {
      b
    });
    if (b.length !== this.rows) throw new MatrixError("b does not have the same number of entries as the amount of rows of the matrix A", 802, {
      rowsOfA: this.rows,
      entriesOfb: b.length
    });
    var sol = [];
    var rows = this.rows;
    for (var i = 0; i < rows; i++) {
      var currentDiag = this.getElement(i, i);
      if (currentDiag === 0) throw new MatrixError("Unsolvable system: zero on diagonal", 814, {
        matrix: this
      });
      var sum = 0;
      for (var j = 0; j < i; j++) {
        sum += sol[j] * this.getElement(i, j);
      }
      sol[i] = (b[i] - sum) / currentDiag;
    }
    return sol;
  }
  /**
   * Converts the matrix to Reduced Row Echelon Form (RREF).
   * This method does not modify the original matrix.
   * @public
   * @param {Object} options - The options for the Gauss-Jordan elimination.
   * @param {boolean} options.solve - Indicates whether to solve the system of equations after performing Gauss-Jordan elimination. Default is false.
   * @returns {Matrix<number> | number[]} A new matrix that is the REF of the original matrix if `options.solve` is false. If `options.solve` is true, it returns the solution to the system of equations as an array.
  */ //TODO: lav en type til normale options
  gaussianElimination() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      solve: false
    };
    var lead = 0;
    var matrixClone = new Float64Array(this.mElements); // clone the matrix
    var rows = this.rows;
    var columns = this.columns;
    for (var r = 0; r < rows; r++) {
      if (columns <= lead) {
        break;
      }
      var i = r;
      while (matrixClone[i * columns + lead] === 0) {
        i++;
        if (rows === i) {
          i = r;
          lead++;
          if (columns === lead) {
            return new Matrix(Array.from(matrixClone), rows, columns);
          }
        }
      }
      // Swap rows i and r
      //TODO: hehehehehehhehehehheehehehehehehe
      var tmp = matrixClone.subarray(i * columns, (i + 1) * columns);
      matrixClone.set(matrixClone.subarray(r * columns, (r + 1) * columns), i * columns);
      matrixClone.set(tmp, r * columns);
      // Subtract multiples of row r from the other rows to make the rest of the entries of the current column as zero
      for (var _i2 = r + 1; _i2 < rows; _i2++) {
        var val = matrixClone[_i2 * columns + lead] / matrixClone[r * columns + lead];
        for (var j = 0; j < columns; j++) {
          matrixClone[_i2 * columns + j] -= val * matrixClone[r * columns + j];
        }
      }
      lead++;
    }
    matrixClone = new Matrix(Array.from(matrixClone), rows, columns);
    Matrix.roundMatrixToZero(matrixClone);
    if (options.solve) {
      var augmentedColumn = matrixClone.getColumn(columns);
      return matrixClone.getSubMatrix(0, rows, 0, columns - 1).backSubstitution(augmentedColumn);
    }
    return matrixClone;
  }
  /**
   * Converts the matrix to Reduced Row Echelon Form (RREF).
   * This method does not modify the original matrix.
   * @public
    * @param {boolean} options.solve - Indicates whether to solve the system of equations after performing Gauss-Jordan elimination. Default is false.
   * @returns { Matrix<number>  | number[]} A new matrix that is the REF of the original matrix if `options.solve` is false. If `options.solve` is true, it returns the solution to the system of equations as an array.
  */ //TODO: lav en type til normale options
  gaussJordan() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      solve: false
    };
    var lead = 0;
    var matrixClone = new Float64Array(this.mElements); // clone the matrix
    var rows = this.rows;
    var columns = this.columns;
    for (var r = 0; r < rows; r++) {
      if (columns <= lead) {
        break;
      }
      var i = r;
      while (matrixClone[i * columns + lead] === 0) {
        i++;
        if (rows === i) {
          i = r;
          lead++;
          if (columns === lead) {
            return new Matrix(Array.from(matrixClone), rows, columns);
            ;
          }
        }
      }
      // Swap rows i and r
      // TODO: heheheheheheheheheheasdiashduhasdhlsdahadhjhjiasdjasdjioajadjda
      var tmp = matrixClone.subarray(i * columns, (i + 1) * columns);
      matrixClone.set(matrixClone.subarray(r * columns, (r + 1) * columns), i * columns);
      matrixClone.set(tmp, r * columns);
      var val = matrixClone[r * columns + lead];
      // Scale row r to make the leading coefficient = 1
      for (var j = 0; j < columns; j++) {
        matrixClone[r * columns + j] /= val;
      }
      // Subtract multiples of row r from the other rows to make the rest of the entries of current column as zero
      for (var _i3 = 0; _i3 < rows; _i3++) {
        if (_i3 === r) continue;
        val = matrixClone[_i3 * columns + lead];
        for (var _j = 0; _j < columns; _j++) {
          matrixClone[_i3 * columns + _j] -= val * matrixClone[r * columns + _j];
        }
      }
      lead++;
    }
    matrixClone = new Matrix(Array.from(matrixClone), rows, columns);
    Matrix.roundMatrixToZero(matrixClone);
    if (options.solve) {
      return matrixClone.getColumn(columns);
    }
    return matrixClone;
  }
  /**
   * Performs QR decomposition on the matrix.
   * @returns { { Q: Matrix, R: Matrix } } An object containing the Q and R matrices.
   */
  QRDecomposition() {
    var Q = this.gramSmith();
    var QT = Q.transpose();
    var R = QT.multiply(this);
    Matrix.roundMatrixToZero(this);
    return {
      Q: Q,
      R: R
    };
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Reshapeing
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Augments the current matrix with another matrix.
   * @param {Matrix<T>} B  - The matrix to be augmented with.
   * @returns {Matrix<T>} A new matrix that is the result of augmenting the current matrix with the provided matrix.
   * @throws {MatrixError} If the argument is not an instance of Matrix, or if the current matrix and the provided matrix do not have the same number of rows.
   */
  augment(B) {
    if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
      B
    });
    if (B.rows !== this.rows) throw new MatrixError("A and B does not have the same number of rows", 802, {
      ARows: this.rows,
      BRows: B.rows
    });
    var AA = this.toArray();
    var BA = B.toArray();
    return new Matrix(AA.map((row, index) => row.concat(BA[index])));
  }
  /**
   * Transposes a matrix.
   * @public
   * @returns {Matrix<T>} The transposed matrix.
   */
  transpose() {
    var transposedMatrix = Matrix.clone(this);
    var rows = transposedMatrix.rows;
    var columns = transposedMatrix.columns;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        transposedMatrix.mElements[j * rows + i] = this.mElements[i * columns + j];
      }
    }
    transposedMatrix.rows = columns;
    transposedMatrix.columns = rows;
    if (transposedMatrix.isTall) {
      transposedMatrix.isTall = false;
      transposedMatrix.isWide = true;
    } else if (transposedMatrix.isWide) {
      transposedMatrix.isTall = true;
      transposedMatrix.isWide = false;
    }
    transposedMatrix.updateShape();
    return transposedMatrix;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Inverting
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
  Inverts a square matrix.
  @returns { Matrix<number>} The inverse of the square matrix.
  @throws {MatrixError} If the matrix is not square.
  */
  invertSquare() {
    if (!this.isSquare) throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, {
      isSquare: this.isSquare
    });
    var squareIdentity = Matrix.identity(this.rows);
    var augmented = this.augment(squareIdentity);
    var inverse = augmented.gaussJordan();
    return inverse.getSubMatrix(0, this.rows, this.columns, inverse.columns);
  }
  /**
   * Inverts an upper triangular matrix.
   *
   * This function computes the inverse of an upper triangular matrix. If the matrix
   * is not square (meaning, the number of rows doesn't match the number of columns),
   * an error is thrown. To perform this inversion, an identity matrix is created
   * first. Then the function applies back substitution on each element in the
   * identity matrix, storing the results in a separate array. These results are
   * transposed, reversed, and returned
   *
   * @returns { Matrix<number>} The inverted upper triangular matrix.
   *
   * @throws {MatrixError} If the original matrix is not square or an upper triangular matrix, an error is thrown.
   */
  invertUpper() {
    //TODO: Psudo inverse
    if (!this.isSquare) throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, {
      matrix: this
    });
    if (!Matrix.isUpperTriangular(this)) throw new MatrixError("Matrix is not upper triangular", 815, {
      matrix: this
    });
    var identityMatrix = Matrix.identity(this.rows);
    var invertedMatrixElements = [];
    for (var i = this.rows - 1; i >= 0; i--) {
      invertedMatrixElements[i] = this.backSubstitution(identityMatrix.getRow(this.rows - i));
    }
    invertedMatrixElements.reverse();
    return new Matrix(invertedMatrixElements).transpose();
  }
  /**
   * Inverts a lower triangular matrix.
   *
   * This function computes the inverse of an upper lower matrix. If the matrix
   * is not square (meaning, the number of rows doesn't match the number of columns),
   * an error is thrown. To perform this inversion, an identity matrix is created
   * first. Then the function applies foward substitution on each element in the
   * identity matrix, storing the results in a separate array. These results are
   * transposed, reversed, and returned.
   *
   * @returns { Matrix<number>} The inverted lower triangular matrix.
   *
   * @throws {MatrixError} If the original matrix is not square or a lower triangular matrix , an error is thrown.
   */
  invertLower() {
    //TODO: Psudo inverse
    if (!this.isSquare) throw new MatrixError("Can't use this method for inverting a non square matrix, see the inverse method instead", 812, {
      matrix: this
    });
    if (!Matrix.isLowerTriangular(this)) throw new MatrixError("Matrix is not lower triangular", 815, {
      matrix: this
    });
    var identityMatrix = Matrix.identity(this.rows);
    var invertedMatrixElements = [];
    for (var i = 0; i < this.rows; i++) {
      invertedMatrixElements[i] = this.forwardSubstitution(identityMatrix.getRow(i + 1));
    }
    // invertedMatrixElements.reverse()
    return new Matrix(invertedMatrixElements).transpose();
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Utility methods
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Checks if the current matrix is equal to another matrix.
   * @param {Matrix<T>} B - The matrix to compare with.
   * @returns {boolean} 'true' if the matrices are equal, 'false' otherwise.
   */
  equal(B) {
    if (B.dataType !== this.dataType || B.shape !== this.shape) return false;
    if (B.dataType === "number") {
      return this.mElements.every((entry, index) => math.equal(entry, B.mElements[index]));
    }
    return this.mElements.every((entry, index) => entry === B.mElements[index]);
  }
  /**
   * Prints the matrix in a formatted way.
   * @public
   * @returns {void}
   */
  print() {
    var shape = [this.rows, this.columns];
    function col(mat, i) {
      return mat.map(row => row[i]);
    }
    var colMaxes = [];
    for (var i = 0; i < shape[1]; i++) {
      //@ts-ignore
      colMaxes.push(Math.max(...col(this.toArray(), i).map(n => n.toString().length)));
    }
    this.toArray().forEach(row => {
      console.log(...row.map((val, j) => {
        return (
          //@ts-ignore
          new Array(colMaxes[j] - val.toString().length + 1).join(" ") +
          //@ts-ignore
          val.toString() + "  "
        );
      }));
    });
  }
  /**
   * Converts the matrix to a 2D array.
   * @public
   * @returns {TexImageSource[][]} The matrix as a 2D array.
   */
  toArray() {
    var array = [];
    for (var i = 0; i < this.rows; i++) {
      var row = [];
      for (var j = 0; j < this.columns; j++) {
        var value = this.getElement(i, j);
        row.push(value);
      }
      array.push(row);
    }
    return array;
  }
  /**
   * Converts the matrix to a printable string
   * @public
   * @returns {string} The printable matrix in a nice format
   */
  toString() {
    var shape = [this.rows, this.columns];
    function col(mat, i) {
      return mat.map(row => row[i]);
    }
    var colMaxes = [];
    for (var i = 0; i < shape[1]; i++) {
      //@ts-ignore
      colMaxes.push(Math.max(...col(this.toArray(), i).map(n => n.toString().length)));
    }
    var output = "";
    this.toArray().forEach(row => {
      output += row.map((val, j) => {
        return (
          //@ts-ignore
          new Array(colMaxes[j] - val.toString().length + 1).join(" ") +
          //@ts-ignore
          val.toString() + "  "
        );
      }).join("") + "\n";
    });
    return output;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Static methods
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Reshapes a 1D array into a matrix with the specified number of rows and columns.
   * @public
   * @static
   * @param {any[]} array - The 1D array to reshape.
   * @param {number} newRows - The number of rows in the reshaped matrix.
   * @param {number} newColumns - The number of columns in the reshaped matrix.
   * @returns {Matrix<any>} The reshaped matrix.
   * @throws {MatrixError} - If the length of the array is not equal to newRows * newColumns.
   */
  static reshape(array, newRows, newColumns) {
    if (array.length !== newRows * newColumns) throw new MatrixError("Invalid reshape dimensions", 806, {
      newRows,
      newColumns
    });
    if (!Array.isArray(array) || typeof newRows !== "number" || typeof newColumns !== "number") throw new MatrixError("Invalid argument", 606, {
      array,
      newRows,
      newColumns
    });
    var newEntries = [];
    var rowIndex = 0;
    var colIndex = 0;
    for (var i = 0; i < array.length; i++) {
      if (colIndex === newColumns) {
        rowIndex++;
        colIndex = 0;
      }
      if (!newEntries[rowIndex]) newEntries[rowIndex] = [];
      newEntries[rowIndex][colIndex] = array[i];
      colIndex++;
    }
    return new Matrix(newEntries);
  }
  /**
  * Clones the matrix instance and returns the clone
  * @public
  * @static
  * @returns {Matrix<any>} The cloned matrix
  */
  static clone(A) {
    return new Matrix(A.toArray());
  }
  /**
   * Method used to pad the matrix dimensions to the nearest power of two.
   * @public
   * @static
   * @param {Matrix<number>} A - The matrix to pad
   * @returns {Matrix<number>} The padded matrix with dimensions as a power of two.
   */
  static padMatrixToPowerOfTwo(A) {
    var rows = A.rows;
    var columns = A.columns;
    var maxDimension = Math.max(rows, columns);
    var nextPower = math.nextPowerOfTwo(maxDimension);
    if (nextPower === rows && nextPower === columns) {
      return A; // No padding required as the matrix is already a power of two.
    }

    var paddedMatrix = Array(nextPower * nextPower).fill(0);
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        paddedMatrix[i * nextPower + j] = A.mElements[i * columns + j];
      }
    }
    return new Matrix(paddedMatrix, nextPower, nextPower);
  }
  /**
   * Rounds values close to zero in the given array and modifies the matrix in place
   * @public
   * @static
   * @param { Matrix<number>} A - Matrix consisting of numbers
   * @param {number} threshold - The threshold value for rounding to zero. Default is 1e-7.
   * @returns {void}
   */
  static roundMatrixToZero(A) {
    var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Constants.DELTA;
    var size = A.size;
    for (var i = 0; i < size; i++) {
      if (Math.abs(A.mElements[i]) < threshold) {
        A.mElements[i] = 0;
      }
    }
  }
  /**
   * Rounds all elements of a matrix in place to a specified number of decimal places using a specified base.
   * @public
   * @static
   * @param {Matrix} A - The matrix to round.
   * @param {number} digits - The number of decimal places to round to.
   * @param {number} base - The base to use for rounding. Defaults to 10 if not provided.
   * @returns {void}
   */
  static toFixedMatrix(A, digits) {
    var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
    A.mElements = A.mElements.map(entry => math.toFixedNumber(entry, digits, base));
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Static factory methods
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Creates an identity matrix with the specified dimension.
   * @public
   * @static
   * @param {number} dimension - The dimension of the identity matrix.
   * @returns {Matrix} The identity matrix.
   * @throws {MatrixError} - If the dimension is less than or equal to 0.
   */
  static identity(dimension) {
    if (dimension <= 0 || typeof dimension !== "number") throw new MatrixError("Invalid argument", 606, {
      dimension
    });
    var entries = [];
    for (var i = 0; i < dimension; i++) {
      var row = [];
      for (var j = 0; j < dimension; j++) {
        if (i === j) {
          row.push(1);
        } else {
          row.push(0);
        }
      }
      entries.push(row);
    }
    return new Matrix(entries);
  }
  /**
   * Creates a matrix filled with ones with the specified number of rows and columns.
   * @public
   * @static
   * @param {number} rows - The number of rows in the matrix.
   * @param {number} columns - The number of columns in the matrix.
   * @returns {Matrix} - The matrix filled with ones.
   * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
   */
  static ones(rows, columns) {
    if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, {
      rows,
      columns
    });
    return new Matrix(new Array(rows).fill(1).map(() => new Array(columns).fill(1)));
  }
  /**
   * Creates a random matrix with the specified number of rows and columns.
   * @public
   * @static
   * @param {number} rows - The number of rows in the matrix.
   * @param {number} columns - The number of columns in the matrix
   * @returns {Matrix} The randomized matrix
   * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
   */
  static random(rows, columns) {
    if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, {
      rows,
      columns
    });
    var entries = [];
    for (var i = 0; i < rows; i++) {
      var row = [];
      for (var j = 0; j < columns; j++) {
        var randomValue = Math.random() * 100;
        row.push(randomValue);
      }
      entries.push(row);
    }
    return new Matrix(entries);
  }
  /**
   * Creates a matrix filled with zeros with the specified number of rows and columns.
   * @public
   * @static
   * @param {number} rows - The number of rows in the matrix.
   * @param {number} columns - The number of columns in the matrix.
   * @returns {Matrix} - The matrix filled with zeros.
   * @throws {MatrixError} - If the rows and or columns is less than or equal to 0.
   */
  static zeros(rows, columns) {
    if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, {
      rows,
      columns
    });
    return new Matrix(new Array(rows).fill(0).map(() => new Array(columns).fill(0)));
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /*
  * Static boolean methods
  */
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Checks if a given matrix contains only integer elements.
   * @param A - The matrix to check.
   * @returns True if all elements in the matrix are integers, false otherwise.
   * @throws {MatrixError} If the argument is not an instance of Matrix.
   */
  static isIntMatrix(A) {
    if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
      A
    });
    return A.mElements.every(entry => Number.isInteger(entry));
  }
  /**
  * This method checks if the matrix is lower triangular.
  * A matrix is said to be lower triangular if all its entries above the main diagonal are zero.
  * @public
  * @static
  * @param {Matrix} A - The matrix to checkF
  * @return {Boolean} - Returns true if the matrix is lower triangular, false otherwise.
  */
  static isLowerTriangular(A) {
    if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
      A
    });
    var columns = A.columns;
    for (var i = 1; i < columns; i++) {
      for (var j = 0; j < i; j++) {
        if (A.getElement(j, i) !== 0) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   /**
   * This method checks if the given matrix is upper triangular.
   * A matrix is said to be upper triangular if all its entries below the main diagonal are zero.
   * @public
   * @static
   * @param {Matrix} A - The matrix to checkF
   * @return {Boolean}  Returns true if the matrix is upper triangular, false otherwise.
   */
  static isUpperTriangular(A) {
    if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
      A
    });
    var columns = A.columns;
    for (var i = 1; i < columns; i++) {
      for (var j = 0; j < i; j++) {
        if (A.getElement(i, j) !== 0) {
          return false;
        }
      }
    }
    return true;
  }
}