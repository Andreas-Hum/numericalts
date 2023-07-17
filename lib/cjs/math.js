'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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

module.exports = math;
