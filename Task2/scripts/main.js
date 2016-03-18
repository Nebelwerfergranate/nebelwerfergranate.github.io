"use strict";

document.body.onload = function() {
	var calc = document.calc;
	var model = new Calculator();

	calc.addEventListener('click', render);
	addNumberHandlers();
	addOperationHandlers();
	calc.btnClear.addEventListener('click', clear);
	calc.btnDecimal.addEventListener('click', toDecimal);


	function render() {
		calc.screen.value = model.screenVal;
		fitScreenCapacity();
	}

	function fitScreenCapacity() {
		var SCREENCAPACITY = 13;
		var MAXSTRINGLENGTH = 22;
		if (model.screenVal.length >= SCREENCAPACITY) {
			calc.screen.classList.add("smallDigits");
			if (model.screenVal.length >= MAXSTRINGLENGTH) {
				calc.screen.value = parseFloat(model.screenVal);
			}
		}
		else {
			calc.screen.classList.remove("smallDigits");
		}
	}

	function clear() {
		model.clear();
	}

	function toDecimal() {
		model.toDecimal();
	}

	function addNumberHandlers() {
		calc.btnZero.addEventListener('click', function() {
			model.numPressed(0);
		});
		calc.btnOne.addEventListener('click', function() {
			model.numPressed(1);
		});
		calc.btnTwo.addEventListener('click', function() {
			model.numPressed(2);
		});
		calc.btnThree.addEventListener('click', function() {
			model.numPressed(3);
		});
		calc.btnFour.addEventListener('click', function() {
			model.numPressed(4);
		});
		calc.btnFive.addEventListener('click', function() {
			model.numPressed(5);
		});
		calc.btnSix.addEventListener('click', function() {
			model.numPressed(6);
		});
		calc.btnSeven.addEventListener('click', function() {
			model.numPressed(7);
		});
		calc.btnEight.addEventListener('click', function() {
			model.numPressed(8);
		});
		calc.btnNine.addEventListener('click', function() {
			model.numPressed(9);
		});
	}

	function addOperationHandlers() {
		calc.btnPlus.addEventListener('click', function() {
			model.doOperation(operationTypes.add);
		});
		calc.btnMinus.addEventListener('click', function() {
			model.doOperation(operationTypes.subtract);
		});
		calc.btnMultiply.addEventListener('click', function() {
			model.doOperation(operationTypes.multiply);
		});
		calc.btnDivide.addEventListener('click', function() {
			model.doOperation(operationTypes.divide);
		});
		calc.btnEquals.addEventListener('click', function() {
			model.doOperation(operationTypes.equals);
		});
	}
};