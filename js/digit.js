// Generated by CoffeeScript 1.10.0
(function() {
  var exports;

  exports = this;

  exports.Digit = (function() {
    function Digit() {}

    Digit.isInteger = function(number) {
      number = Number(number);
      return Math.floor(number) === number;
    };

    Digit.isDecimal = function(number) {
      return !this.isInteger(number);
    };

    Digit.removeSymbol = function(numberString) {
      return numberString.replace(/[-\+\.]/g, '');
    };

    Digit.get = function(number) {
      var digit, numberString;
      numberString = number.toString(10);
      numberString = this.removeSymbol(numberString);
      return digit = numberString.length;
    };

    Digit.getIntegerPart = function(number) {
      var numberString;
      numberString = Math.floor(number).toString();
      numberString = this.removeSymbol(numberString);
      return numberString.length;
    };

    Digit.getDecimalPart = function(number) {
      var numberString;
      if (this.isInteger(number)) {
        return 0;
      }
      numberString = number.toString();
      numberString = numberString.match(/(?=.)\d+$/)[0];
      return numberString.length;
    };

    Digit.padHead = function(number, addDigit, padding) {
      var i, j, numberString, ref;
      numberString = number.toString();
      if (number < 0) {
        numberString = numberString.replace('-', '');
      }
      for (i = j = 0, ref = addDigit; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        numberString = padding + numberString;
      }
      if (number < 0) {
        numberString = '-' + numberString;
      }
      return numberString;
    };

    Digit.padTail = function(number, addDigit, padding) {
      var i, j, numberString, ref;
      numberString = number.toString();
      if (!numberString.match(/\./)) {
        numberString += '.';
      }
      for (i = j = 0, ref = addDigit; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        numberString += padding;
      }
      return numberString;
    };

    Digit.alignIntegerPart = function(number, maxIntegerDigit, padding) {
      var diffIntDigit;
      diffIntDigit = maxIntegerDigit - this.getIntegerPart(number);
      if (diffIntDigit < 0) {
        throw new Error("Number is over maxIntegerDigit");
      }
      return this.padHead(number, diffIntDigit, padding);
    };

    Digit.alignDecimalPart = function(number, maxDecimalDigit, padding) {
      var base, diffDecimalDigit, numberString;
      diffDecimalDigit = maxDecimalDigit - this.getDecimalPart(number);
      if (diffDecimalDigit <= -1) {
        base = Math.pow(10, maxDecimalDigit);
        number *= base;
        number = Math.round(number);
        number /= base;
        diffDecimalDigit = maxDecimalDigit - this.getDecimalPart(number);
        if (diffDecimalDigit > 0) {
          numberString = this.padTail(number, diffDecimalDigit, padding);
        } else {
          numberString = number.toString();
        }
        numberString;
      } else if (diffDecimalDigit >= 1) {
        numberString = this.padTail(number, diffDecimalDigit, padding);
      } else {
        numberString = number.toString();
      }
      return numberString;
    };

    Digit.align = function(number, maxIntDigit, intPadding, maxDecimalDigit, decimalPadding) {
      var decimalString, integerString;
      if (maxDecimalDigit == null) {
        maxDecimalDigit = 0;
      }
      if (decimalPadding == null) {
        decimalPadding = 0;
      }
      decimalString = this.alignDecimalPart(number, maxDecimalDigit, decimalPadding);
      if (this.isInteger(decimalString)) {
        integerString = this.alignIntegerPart(Number(decimalString), maxIntDigit, intPadding);
      } else {
        integerString = this.alignIntegerPart(number, maxIntDigit, intPadding);
        if (integerString.match(/\./)) {
          integerString = integerString.replace(/\..*/, '');
        }
      }
      decimalString = decimalString.replace(/^.*?\./, '.');
      if (maxDecimalDigit === 0 && this.isInteger(decimalString)) {
        return integerString;
      } else {
        return integerString + decimalString;
      }
    };

    return Digit;

  })();

}).call(this);
