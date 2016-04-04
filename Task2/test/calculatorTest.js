"use strict";

function CalculatorTest() {
    this.calc = new Calculator();
}

(function() {
    CalculatorTest.prototype.run = run;
    CalculatorTest.prototype._checkOperationTest = _checkOperationTest;
    CalculatorTest.prototype._checkClearTest = _checkClearTest;
    CalculatorTest.prototype._insertNumberIntoCalc = _insertNumberIntoCalc;

    function run() {
        this._checkOperationTest(operationTypes.add, "Addition works incorrect.");
        this._checkOperationTest(operationTypes.subtract, "subtraction works incorrect.");
        this._checkOperationTest(operationTypes.multiply, "multiplication works incorrect.");
        this._checkOperationTest(operationTypes.divide, "division works incorrect.");

        this._checkClearTest();
    }

    function _checkOperationTest(op, msg) {
        var COUNT = 1000;
        var MIN = -1000000;
        var MAX = 1000000;

        for (var i = 0; i < COUNT; i++) {
            var firstArg = utils.getRandomArbitrary(MIN, MAX);
            this._insertNumberIntoCalc(firstArg);
            this.calc.doOperation(op);

            var secondArg = utils.getRandomArbitrary(MIN, MAX);
            this._insertNumberIntoCalc(secondArg);

            var result = null;
            switch (op) {
                case operationTypes.add:
                    result = firstArg + secondArg;
                    break;
                case operationTypes.subtract:
                    result = firstArg - secondArg;
                    break;
                case operationTypes.multiply:
                    result = firstArg * secondArg;
                    break;
                case operationTypes.divide:
                    result = firstArg / secondArg;
                    break;
            }
            this.calc.doOperation(operationTypes.equals);

            assert.equal(this.calc.screenVal.toString(), result.toString(), msg);
        }
    }

    function _checkClearTest() {
        var MIN = -1000000;
        var MAX = 1000000;
        
        var firstArgument = null;
        
        for (var op in operationTypes) {
            firstArgument = utils.getRandomArbitrary(MIN, MAX);
            this._insertNumberIntoCalc(firstArgument);
            
            this.calc.clear();
            assert.equal(this.calc.screenVal.toString(), "0", "Clear method doesn't reset value to 0.");

            firstArgument = utils.getRandomArbitrary(MIN, MAX);
            this._insertNumberIntoCalc(firstArgument);
            assert.equal(this.calc.screenVal.toString(), firstArgument.toString(), "Values input works incorrect after clear method.");
               
            this.calc.doOperation(op);
            this.calc.clear();
            assert.equal(this.calc.screenVal.toString(), "0", "Clear method doesn't reset value after '" + op + "' operation");
        }
    }

    function _insertNumberIntoCalc(number) {
        var num = number.toString();
        var count = num.length;

        for (var i = 0; i < count; i++) {
            if (num[i] === ".") {
                this.calc.toDecimal();
            }
            else {
                this.calc.numPressed(num[i]);
            }
        }
    }
})();