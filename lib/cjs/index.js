'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 * A class that contains various mathematical constants.
 */
var Constants = /*#__PURE__*/_createClass(function Constants() {
  _classCallCheck(this, Constants);
});
/**
 * A small value used for comparing floating-point numbers.
 * Can be used for precision comparisons in mathematical calculations.
 */
_defineProperty(Constants, "DELTA", 1e-12);
/**
 * The mathematical constant pi (approximately 3.14159).
 * Can be used for calculations involving circles, angles, and trigonometry.
 */
_defineProperty(Constants, "PI", Math.PI);
/**
 * The mathematical constant tau, which is equal to 2 * pi (approximately 6.28318).
 * Can be used as a more convenient representation of the circle constant.
 */
_defineProperty(Constants, "TAU", 6.2831853071795865);
/**
 * The mathematical constant e (approximately 2.71828).
 * Can be used for calculations involving exponential growth and decay.
 */
_defineProperty(Constants, "E", Math.E);
/**
 * The square root of 5 (approximately 2.23607).
 * Can be used in calculations involving the golden ratio and Fibonacci numbers.
 */
_defineProperty(Constants, "SQRT5", 2.2360679774997897);
/**
 * The square root of 3 (approximately 1.73205).
 * Can be used in calculations involving equilateral triangles and hexagons.
 */
_defineProperty(Constants, "SQRT3", 1.7320508075688772);
/**
 * The square root of 2 (approximately 1.41421).
 * Can be used in calculations involving right triangles and diagonal lengths.
 */
_defineProperty(Constants, "SQRT2", Math.SQRT2);
/**
 * The square root of 1/2 (approximately 0.70711).
 * Can be used in calculations involving scaling and normalization.
 */
_defineProperty(Constants, "SQRT1_2", Math.SQRT1_2);
/**
 * The twelfth root of 12 (approximately 1.05946).
 * Can be used in calculations involving musical intervals and pitch ratios.
 */
_defineProperty(Constants, "TWELFTH_SQRT12", 1.0594630943592953);
/**
 * The cube root of 3 (approximately 1.44225).
 * Can be used in calculations involving exponential functions and logarithms.
 */
_defineProperty(Constants, "CSQRT3", 1.4422495703074084);
/**
 * The cube root of 2 (approximately 1.25992).
 * Can be used in calculations involving exponential functions and logarithms.
 */
_defineProperty(Constants, "CSQRT2", 1.2599210498948732);
/**
 * The super golden ratio (approximately 1.46557).
 * Can be used in calculations involving aesthetics and design.
 */
_defineProperty(Constants, "SUPER_GOLDEN_RATIO", 1.4655712318767680);
/**
 * The golden ratio (approximately 1.61803).
 * Can be used in calculations involving aesthetics, design, and proportions.
 */
_defineProperty(Constants, "GOLDEN_RATIO", 1.6180339887498948);
/**
 * The silver ratio (approximately 2.41421).
 * Can be used in calculations involving aesthetics, design, and proportions.
 */
_defineProperty(Constants, "SILVER_RATIO", 2.414213562373095);

var math = /*#__PURE__*/function () {
  function math() {
    _classCallCheck(this, math);
  }
  _createClass(math, null, [{
    key: "dot",
    value:
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    *  Vector operations
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
    * Calculates the dot product of two vectors.
    * @public
    * @static
    * @param {number[]} vector1 - The first vector.
    * @param {number[]} vector2 - The second vector.
    * @returns {number} The dot product of the two vectors.
    */
    function dot(vector1, vector2) {
      var dotProduct = 0;
      for (var i = 0; i < vector1.length; i++) {
        dotProduct += vector1[i] * vector2[i];
      }
      return dotProduct;
    }

    /**
     * Normalizes a vector.
     * @public
     * @static
     * @param {number[]} vector1 - The vector to normalize.
     * @returns {number[]} The normalized vector.
     */
  }, {
    key: "normalize",
    value: function normalize(vector1) {
      var scalar = 1 / Math.sqrt(vector1.map(function (x) {
        return Math.pow(x, 2);
      }).reduce(function (acc, x) {
        return acc + x;
      }));
      return vector1.map(function (entry) {
        return entry * scalar;
      });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * floor, ceil, trunc and abs 
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns the absolute value of a number.
     *
     * @param {number} num - The number to calculate the absolute value of.
     * @returns The absolute value of the number.
     */
  }, {
    key: "abs",
    value: function abs(num) {
      if (num < 0) {
        return num * -1;
      } else {
        return num;
      }
    }

    /**
     * Calculates the floor of a number
     * @param {number} num - The number to calculate the floor for.
     * @returns {number} The largest integer less than or equal to the given number.
     */
  }, {
    key: "floor",
    value: function floor(num) {
      return Math.floor(num);
    }

    /**
     * Calculates the ceil of a number
     * @param {number} num - The number to calculate the ceil for.
     * @returns {number} The smallest integer greater than or equal to the given number.
     */
  }, {
    key: "ceil",
    value: function ceil(num) {
      return Math.ceil(num);
    }

    /**
     * Calculates the truncation of a number
     * @param  {number} num - The number to calculate the truncation for.
     * @returns {number} The integer part of the given number.
     */
  }, {
    key: "trunc",
    value: function trunc(num) {
      return Math.trunc(num);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Fractional operations
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns the fractional part of a number.
     * @param {number} num - The number to extract the fractional part from.
     * @returns {number} The fractional part of the number.
     */
  }, {
    key: "fracPart",
    value: function fracPart(num) {
      var abs = this.abs(num);
      var frac = abs - this.trunc(abs);
      return Number(frac.toFixed(this.countDecimals(abs)));
    }

    /**
        Calculates the greatest common divisor (GCD) of two numbers.
        @public
        @static
        @param {number} a - The first number.
        @param {number} b - The second number.
        @returns {number} The GCD of the two numbers. 
    */
  }, {
    key: "GCD",
    value: function GCD(a, b) {
      if (b === 0) {
        return a;
      }
      return this.GCD(b, a % b);
    }

    /**
     * Calculates the least common divisor (LCD) of two numbers.
     *  @public
     *  @static
        @param {number} a - The first number.
        @param {number} b - The second number.
        @returns {number} The LCD of the two numbers. 
     */
  }, {
    key: "LCD",
    value: function LCD(a, b) {
      // Calculate the GCD (Greatest Common Divisor) using the Euclidean algorithm
      var gcd = this.GCD(a, b);

      // Calculate the LCD using the formula: LCD = (a * b) / GCD
      var lcd = a * b / gcd;
      return lcd;
    }

    /**
     * Rounds a number to a specified number of decimal places using a specified base.
     * @public
     * @static
     * @param {number} num - The number to round.
     * @param {number} digits - The number of decimal places to round to.
     * @param {number} base - The base to use for rounding.Defaults to 10 if not provided.
     * @returns {number} The rounded number.
     */
  }, {
    key: "toFixedNumber",
    value: function toFixedNumber(num, digits) {
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      var pow = Math.pow(base, digits);
      return Math.round(num * pow) / pow;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Utility functions
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns the number of decimal places in a given number.
     * @param {number} num - The number to count the decimal places of.
     * @returns {number} The number of decimal places in the given number.
     */
  }, {
    key: "countDecimals",
    value: function countDecimals(num) {
      if (Number.isInteger(num)) {
        return 0;
      } else {
        return num.toString().split(".")[1].length || 0;
      }
    }

    /**
     * Checks if two numbers are approximately equal within a specified tolerance.
     * @param {number} x - The first number to compare.
     * @param {number} y - The second number to compare.
     * @param {number} tolerance - The maximum difference allowed between the numbers. Defaults to Number.EPSILON.
     * @returns {boolean} 'true' if the numbers are approximately equal, 'false' otherwise.
     */
  }, {
    key: "equal",
    value: function equal(x, y) {
      var tolerance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Constants.DELTA;
      return this.abs(x - y) < tolerance;
    }

    /**
        * Checks if a given number is a power of two
        *  @public
        *  @static
        * @param {number} n The number to check
        * @returns {boolean} 'true' if a power of two 'false' otherwise
        */
  }, {
    key: "isPowerOfTwo",
    value: function isPowerOfTwo(n) {
      return (n & n - 1) === 0;
    }

    /**
     * Method used to find the next power of two for a given number.
     *  @public
     *  @static
     * @param {number} n - The number for which to find the next power of two.
     * @returns {number} The next power of two for the given number.
     */
  }, {
    key: "nextPowerOfTwo",
    value: function nextPowerOfTwo(n) {
      var count = 0;
      if (n > 0 && (n & n - 1) === 0) return n;
      while (n !== 0) {
        n >>= 1;
        count += 1;
      }

      // Return next power of 2
      return 1 << count;
    }

    /**
     * Returns the sign of a number.
       @public
       @static
     * @param {number} num - The number to determine the sign of.
     * @returns {number} The sign of the number: -1 if negative, 0 if zero, 1 if positive.
     */
  }, {
    key: "sign",
    value: function sign(num) {
      var sign = 0;
      if (num < 0) {
        sign = -1;
      } else if (num > 0) {
        sign = 1;
      }
      return sign;
    }
  }]);
  return math;
}();

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct$1()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var MatrixError = /*#__PURE__*/function (_Error) {
  _inherits(MatrixError, _Error);
  var _super = _createSuper(MatrixError);
  function MatrixError(message, statusCode) {
    var _this;
    var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, MatrixError);
    _this = _super.call(this, message);
    _this.name = 'MatrixError';
    _this.timestamp = new Date().toISOString();
    // Matrix Status Codes:

    // 800: Out of bounds
    // 801: Matrix validation error - Occurs when the supplied elements fail to form a proper matrix.
    // 802: Matrix dimensions error - Occurs when attempting operations involving matrices of incompatible dimensions.
    // 803: Invalid element for matrix error - Occurs when the matrix contains a non-numeric value.
    // 804: Not an instance of Matrix.

    // 805: Matrix Addition/Subtraction Error - Occurs when matrices of different dimensions or invalid types are added are added or subtracted.
    // 806: Reshape error - Occurs when dimensions are not correct
    // 807: Non numeric matrix used

    // 806: Invalid Scalar for Matrix Multiplication Error - Occurs when a non-numeric value is used for scalar multiplication.
    // 807: Matrix Dot Product Error - Occurs when the dot product of matrices of different dimensions is calculated.
    // 808: Zero Matrix Error - Occurs when an illegal operation is attempted on a zero matrix.
    // 809: Matrix Equality Check Error - Occurs when an equality check is made between matrices of different dimensions.

    // 810: Matrix Multiplication Error - Occurs when trying to multiply matrices of incompatible dimensions.

    // 811: Determinant of Non-Square Matrix Error - Occurs when trying to calculate the determinant of a non-square matrix.
    // 812: Inverse of Non-Square Matrix Error - Occurs when trying to calculate the inverse of a non-square matrix.
    // 813: Matrix Norm Error - Unknown error.
    // 814: Unsolvabe system
    // 815: Back substitution error - matrix is not upper triangular
    // 816: Forward substitution error - matrix is not lower triangular

    //

    _this.statusCode = statusCode;
    _this.details = details;
    return _this;
  }
  _createClass(MatrixError, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        name: this.name,
        message: this.message,
        timestamp: this.timestamp,
        statusCode: this.statusCode,
        details: this.details,
        stack: this.stack
      };
    }
  }, {
    key: "toString",
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }]);
  return MatrixError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var Matrix = /*#__PURE__*/function () {
  /**
   * Constructs a matrix object.
   * @param {T[][] | T[]} entries - The entries of the matrix.
   * @param {number} rows - The number of rows in the matrix.
   * @param {number} columns - The number of columns in the matrix.
   */
  function Matrix(entries, rows, columns) {
    _classCallCheck(this, Matrix);
    _defineProperty(this, "shape", "0");
    _defineProperty(this, "isSquare", false);
    _defineProperty(this, "isTall", false);
    _defineProperty(this, "isWide", false);
    _defineProperty(this, "rows", Infinity);
    _defineProperty(this, "columns", Infinity);
    _defineProperty(this, "size", Infinity);
    _defineProperty(this, "dataType", "none");
    if (!Array.isArray(entries)) {
      throw new MatrixError("Matrix has to be an array", 801, {
        entries: entries
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

  /**
      Retrieves the name of the interface or class of a given value.
      @template {T} T - The type of the value.
      @param {T} value - The value to retrieve the interface or class name from.
      @returns {string} The name of the interface or class. 
  */
  _createClass(Matrix, [{
    key: "getInterfaceName",
    value: function getInterfaceName(value) {
      //@ts-ignore
      return value.constructor.name;
    }

    /**
        Retrieves the type of a given value.
        @template T - The type of the value.
        @param value - The value to retrieve the type from.
        @returns The type of the value.
    */
  }, {
    key: "getType",
    value: function getType(value) {
      return _typeof(value);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    * Validation and updating
    */
    /////////////////////////////////////////////////////////////////////////////////////////////////s

    /**
    Checks if the given entries are a one-dimensional array of a specific type.
    @template T - The type of the array elements.
    @param entries - The entries to check.
    @returns True if the entries are a one-dimensional array of type T, false otherwise. 
    */
  }, {
    key: "is1dArray",
    value: function is1dArray(entries) {
      return !entries.some(function (entry) {
        return Array.isArray(entry);
      });
    }

    /**
     * Validates the entries of a 1d T array to ensure they are valid.
     * @private
     * @param {T} entries - The entries of the matrix.
     * @returns {void}
     */ //TODO: make better typecheck
  }, {
    key: "valida1Dentries",
    value: function valida1Dentries(entries) {
      var typeName;
      if (_typeof(entries[0]) === "object") {
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
  }, {
    key: "updateMatrix",
    value: function updateMatrix() {
      this.updateSpecification();
      this.updateShape();
    }

    /**
     * Updates matrix-related specifcation
     * @private
     * @returns {void}
     */
  }, {
    key: "updateSpecification",
    value: function updateSpecification() {
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
  }, {
    key: "updateShape",
    value: function updateShape() {
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
  }, {
    key: "getElement",
    value: function getElement(row, column) {
      if (typeof row !== "number" || typeof column !== "number") throw new MatrixError("Invalid arugment", 606, {
        row: row,
        column: column
      });
      var index = row * this.columns + column;
      if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, {
        row: row,
        column: column
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
  }, {
    key: "getRow",
    value: function getRow(rowIndex) {
      if (typeof rowIndex !== "number") throw new MatrixError("Invalid argument", 606, {
        rowIndex: rowIndex
      });
      if (rowIndex <= 0 || rowIndex > this.rows) throw new MatrixError("Row index out of bounds", 800, {
        rowIndex: rowIndex
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
  }, {
    key: "getColumn",
    value: function getColumn(columnIndex) {
      if (typeof columnIndex !== "number") throw new MatrixError("Invalid argument", 606, {
        columnIndex: columnIndex
      });
      if (columnIndex <= 0 || columnIndex > this.columns) throw new MatrixError("Column index out of bounds", 800, {
        columnIndex: columnIndex
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
  }, {
    key: "setElement",
    value: function setElement(row, column, value) {
      if (_typeof(value) !== this.dataType || typeof row !== "number" || typeof column !== "number") throw new MatrixError("Invalid arugment", 606, {
        value: value,
        row: row,
        column: column
      });
      var index = row * this.columns + column;
      if (index > this.size || index < 0) throw new MatrixError("Index out of bounds", 800, {
        row: row,
        column: column
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
  }, {
    key: "getSubMatrix",
    value: function getSubMatrix(startRow, endRow, startCol, endCol) {
      if (typeof startRow !== "number" || typeof endRow !== "number" || typeof startCol !== "number" || typeof endCol !== "number") {
        throw new MatrixError("Invalid arugment", 606, {
          startRow: startRow,
          endRow: endRow,
          startCol: startCol,
          endCol: endCol
        });
      }
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
  }, {
    key: "setSubMatrix",
    value: function setSubMatrix(startRow, endRow, startCol, endCol, subMatrix) {
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
  }, {
    key: "add",
    value: function add(B) {
      if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for addition", 805, {
        ARows: this.rows,
        AColumns: this.columns,
        BRows: B.rows,
        BColumns: B.columns
      });
      if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
        B: B
      });
      if (B.dataType !== "number" || this.dataType !== "number") {
        throw new MatrixError("Can't add non numeric matricies", 807, {
          AType: this.dataType,
          BType: B.dataType
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
  }, {
    key: "gramSmith",
    value: function gramSmith() {
      var _this = this;
      if (this.dataType !== "number") {
        throw new MatrixError("Can't perform the gramSmith algorithm on a non numeric matrix", 807, {
          AType: this.dataType
        });
      }
      var orthogonalColumns = [];
      orthogonalColumns.push(this.getColumn(1));
      var columns = this.columns;
      for (var i = 1; i < columns; i++) {
        var orthogonalProjection = _toConsumableArray(this.getColumn(i + 1)); // Initialize orthogonalProjection as a copy of the current column
        var _loop = function _loop() {
          var u = orthogonalColumns[j];
          var v = _this.getColumn(i + 1);
          var uv = math.dot(u, v);
          var uu = math.dot(u, u);
          var scalar = uv / uu;
          var projectionOf_I_onto_J = u.map(function (entry) {
            return entry * scalar;
          });
          orthogonalProjection = orthogonalProjection.map(function (entry, index) {
            return entry - projectionOf_I_onto_J[index];
          });
        };
        for (var j = 0; j < i; j++) {
          _loop();
        }
        if (Math.sqrt(orthogonalProjection.map(function (x) {
          return Math.pow(x, 2);
        }).reduce(function (acc, x) {
          return acc + x;
        })) < Constants.DELTA) {
          throw new MatrixError("Cannot normalize a nearly-zero column. The given columns are not linearly independent.", 704);
        }
        orthogonalColumns.push(orthogonalProjection);
      }
      var normalizedColumns = orthogonalColumns.map(function (column) {
        return math.normalize(column);
      });
      var transposedArray = normalizedColumns[0].map(function (_, colIndex) {
        return normalizedColumns.map(function (row) {
          return row[colIndex];
        });
      });
      return new Matrix(transposedArray);
    }

    /**
     * Multiplies this matrix with another matrix using the naive algorithm
     * @public
     * @param {Matrix<number>} B - The matrix to multiply with.
     * @returns {Matrix<number>} The resulting matrix.
     */
  }, {
    key: "multiply",
    value: function multiply(B) {
      if (this.columns !== B.rows) {
        throw new MatrixError("Invalid matrix dimensions for multiplication", 807, {
          rows: B.rows,
          columns: this.columns
        });
      }
      if (B.dataType !== "number" || this.dataType !== "number") {
        throw new MatrixError("Can't multiply non numeric matricies", 807, {
          AType: this.dataType,
          BType: B.dataType
        });
      }
      var rows = this.rows;
      var columns = this.columns;
      var matrixColumns = B.columns;
      var multipliersA = JSON.parse(JSON.stringify(this.mElements));
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
  }, {
    key: "pow",
    value: function pow(exp) {
      if (this.dataType !== "number") {
        throw new MatrixError("Can't raise take the exponent of a non numberic matrix", 807, {
          AType: this.dataType
        });
      }
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
  }, {
    key: "scale",
    value: function scale(scalar) {
      if (this.dataType !== "number") {
        throw new MatrixError("Can't scale a non numeric matrix", 807, {
          AType: this.dataType
        });
      }
      if (typeof scalar !== "number") throw new MatrixError("Invalid scalar", 606, {
        scalar: scalar
      });
      var scaledMatrix = Matrix.clone(this);
      scaledMatrix.mElements = scaledMatrix.mElements.map(function (entry) {
        return entry * scalar;
      });
      return scaledMatrix;
    }

    /**
       * Performs matrix multiplication using the Strassen's algorithm.
       * @public
       * @param { Matrix<number>} B - The matrix to multiply with.
       * @returns { Matrix<number>} The result of matrix multiplication.
       */
  }, {
    key: "strassenMultiply",
    value: function strassenMultiply(B) {
      if (B.dataType !== "number" || this.dataType !== "number") {
        throw new MatrixError("Can't multiply non numeric matricies", 807, {
          AType: this.dataType,
          BType: B.dataType
        });
      }
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
  }, {
    key: "subtract",
    value: function subtract(B) {
      if (this.shape !== B.shape) throw new MatrixError("Invalid matrix dimensions for subtraction", 805, {
        ARows: this.rows,
        AColumns: this.columns,
        BRows: B.rows,
        BColumns: B.columns
      });
      if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
        B: B
      });
      if (B.dataType !== "number" || this.dataType !== "number") {
        throw new MatrixError("Can't subtract  non numeric matricies", 807, {
          AType: this.dataType,
          BType: B.dataType
        });
      }
      var resultElements = JSON.parse(JSON.stringify(this.mElements));
      var size = this.size;
      for (var i = 0; i < size; i++) {
        resultElements[i] -= B.mElements[i];
      }
      return new Matrix(resultElements, this.rows, this.columns);
    }
    //TODO: FROM HERE TYPE
    /**
     * Performs vector-matrix multiplication by multiplying each element of the matrix by the corresponding element in the input vector.
     * @param {number[]} vector - The input vector.
     * @returns {Matrix<number>} A new matrix resulting from the vector-matrix multiplication.
     * @throws {MatrixError} If the input vector is not an array or if its length doesn't match the number of columns in the matrix.
     */
  }, {
    key: "vMultiply",
    value: function vMultiply(vector) {
      if (!Array.isArray(vector)) throw new MatrixError("The input vector is not an array", 606, {
        vector: vector
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
  }, {
    key: "backSubstitution",
    value: function backSubstitution(b) {
      if (!Matrix.isUpperTriangular(this)) throw new MatrixError("Matrix is not upper triangular", 815, {
        matrix: this
      });
      if (!Array.isArray(b)) throw new MatrixError("b is not an array", 606, {
        b: b
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
  }, {
    key: "forwardSubstitution",
    value: function forwardSubstitution(b) {
      if (!Matrix.isLowerTriangular(this)) throw new MatrixError("Matrix is not lower triangular", 816, {
        matrix: this
      });
      if (!Array.isArray(b)) throw new MatrixError("b is not an array", 606, {
        b: b
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
  }, {
    key: "gaussianElimination",
    value: function gaussianElimination() {
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
  }, {
    key: "gaussJordan",
    value: function gaussJordan() {
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
  }, {
    key: "QRDecomposition",
    value: function QRDecomposition() {
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
  }, {
    key: "augment",
    value: function augment(B) {
      if (!(B instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
        B: B
      });
      if (B.rows !== this.rows) throw new MatrixError("A and B does not have the same number of rows", 802, {
        ARows: this.rows,
        BRows: B.rows
      });
      var AA = this.toArray();
      var BA = B.toArray();
      return new Matrix(AA.map(function (row, index) {
        return row.concat(BA[index]);
      }));
    }

    /**
     * Transposes a matrix.
     * @public
     * @returns {Matrix<T>} The transposed matrix.
     */
  }, {
    key: "transpose",
    value: function transpose() {
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
  }, {
    key: "invertSquare",
    value: function invertSquare() {
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
  }, {
    key: "invertUpper",
    value: function invertUpper() {
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
  }, {
    key: "invertLower",
    value: function invertLower() {
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
  }, {
    key: "equal",
    value: function equal(B) {
      if (B.dataType !== this.dataType || B.shape !== this.shape) return false;
      if (B.dataType === "number") {
        return this.mElements.every(function (entry, index) {
          return math.equal(entry, B.mElements[index]);
        });
      }
      return this.mElements.every(function (entry, index) {
        return entry === B.mElements[index];
      });
    }

    /**
     * Prints the matrix in a formatted way.
     * @public
     * @returns {void}
     */
  }, {
    key: "print",
    value: function print() {
      var shape = [this.rows, this.columns];
      function col(mat, i) {
        return mat.map(function (row) {
          return row[i];
        });
      }
      var colMaxes = [];
      for (var i = 0; i < shape[1]; i++) {
        //@ts-ignore
        colMaxes.push(Math.max.apply(Math, _toConsumableArray(col(this.toArray(), i).map(function (n) {
          return n.toString().length;
        }))));
      }
      this.toArray().forEach(function (row) {
        var _console;
        (_console = console).log.apply(_console, _toConsumableArray(row.map(function (val, j) {
          return (
            //@ts-ignore
            new Array(colMaxes[j] - val.toString().length + 1).join(" ") +
            //@ts-ignore

            val.toString() + "  "
          );
        })));
      });
    }

    /**
     * Converts the matrix to a 2D array.
     * @public
     * @returns {TexImageSource[][]} The matrix as a 2D array.
     */
  }, {
    key: "toArray",
    value: function toArray() {
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
  }, {
    key: "toString",
    value: function toString() {
      var shape = [this.rows, this.columns];
      function col(mat, i) {
        return mat.map(function (row) {
          return row[i];
        });
      }
      var colMaxes = [];
      for (var i = 0; i < shape[1]; i++) {
        //@ts-ignore
        colMaxes.push(Math.max.apply(Math, _toConsumableArray(col(this.toArray(), i).map(function (n) {
          return n.toString().length;
        }))));
      }
      var output = "";
      this.toArray().forEach(function (row) {
        output += row.map(function (val, j) {
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
  }], [{
    key: "reshape",
    value: function reshape(array, newRows, newColumns) {
      if (array.length !== newRows * newColumns) throw new MatrixError("Invalid reshape dimensions", 806, {
        newRows: newRows,
        newColumns: newColumns
      });
      if (!Array.isArray(array) || typeof newRows !== "number" || typeof newColumns !== "number") throw new MatrixError("Invalid argument", 606, {
        array: array,
        newRows: newRows,
        newColumns: newColumns
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
  }, {
    key: "clone",
    value: function clone(A) {
      return new Matrix(A.toArray());
    }

    /**
     * Method used to pad the matrix dimensions to the nearest power of two.
     * @public
     * @static
     * @param {Matrix<number>} A - The matrix to pad
     * @returns {Matrix<number>} The padded matrix with dimensions as a power of two.
     */
  }, {
    key: "padMatrixToPowerOfTwo",
    value: function padMatrixToPowerOfTwo(A) {
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
  }, {
    key: "roundMatrixToZero",
    value: function roundMatrixToZero(A) {
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
  }, {
    key: "toFixedMatrix",
    value: function toFixedMatrix(A, digits) {
      var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      A.mElements = A.mElements.map(function (entry) {
        return math.toFixedNumber(entry, digits, base);
      });
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
  }, {
    key: "identity",
    value: function identity(dimension) {
      if (dimension <= 0 || typeof dimension !== "number") throw new MatrixError("Invalid argument", 606, {
        dimension: dimension
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
  }, {
    key: "ones",
    value: function ones(rows, columns) {
      if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, {
        rows: rows,
        columns: columns
      });
      return new Matrix(new Array(rows).fill(1).map(function () {
        return new Array(columns).fill(1);
      }));
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
  }, {
    key: "random",
    value: function random(rows, columns) {
      if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, {
        rows: rows,
        columns: columns
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
  }, {
    key: "zeros",
    value: function zeros(rows, columns) {
      if (rows <= 0 || columns <= 0 || typeof rows !== "number" || typeof columns !== "number") throw new MatrixError("Invalid argument", 606, {
        rows: rows,
        columns: columns
      });
      return new Matrix(new Array(rows).fill(0).map(function () {
        return new Array(columns).fill(0);
      }));
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
  }, {
    key: "isIntMatrix",
    value: function isIntMatrix(A) {
      if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
        A: A
      });
      return A.mElements.every(function (entry) {
        return Number.isInteger(entry);
      });
    }

    /**
    * This method checks if the matrix is lower triangular.
    * A matrix is said to be lower triangular if all its entries above the main diagonal are zero.
    * @public
    * @static
    * @param {Matrix} A - The matrix to checkF
    * @return {Boolean} - Returns true if the matrix is lower triangular, false otherwise.
    */
  }, {
    key: "isLowerTriangular",
    value: function isLowerTriangular(A) {
      if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
        A: A
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
  }, {
    key: "isUpperTriangular",
    value: function isUpperTriangular(A) {
      if (!(A instanceof Matrix)) throw new MatrixError("Argument is not an instance of Matrix", 804, {
        A: A
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
  }]);
  return Matrix;
}();

exports.Constants = Constants;
exports.Matrix = Matrix;
exports.math = math;
