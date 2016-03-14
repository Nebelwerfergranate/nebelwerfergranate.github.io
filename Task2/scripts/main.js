document.body.onload = function() {
	var calc = document.calc;
	var currVal = 0;
	var numberIsNull = false;
	var pendingOp = operationTypes.noOperation;

	bindNumberHandlers();
	bindOperationHandlers();
	calc.btnClear.addEventListener('click', clear);
	calc.btnDecimal.addEventListener('click', toDecimal);
	

	// обработчик нажатия 
	// цифровой кнопки
	function numPressed(num) {
		if (numberIsNull) {
			calc.screen.value = num;
			numberIsNull = false;
		}
		else {
			if (calc.screen.value == "0") {
				calc.screen.value = num;
			}
			else {
				calc.screen.value += num;
			}
		}
	}

	// обработчик нажатия
	// кнопки действия
	function operation(op) {
		var screenVal = calc.screen.value;
		if (numberIsNull && pendingOp !== operationTypes.equals) {
			calc.screen.value = currVal;
		}
		else {
			numberIsNull = true;
			if (pendingOp === operationTypes.add) {
				currVal += parseFloat(screenVal);
			}
			else if (pendingOp === operationTypes.subtract) {
				currVal -= parseFloat(screenVal);
			}
			else if (pendingOp === operationTypes.multiply) {
				currVal *= parseFloat(screenVal);
			}
			else if (pendingOp === operationTypes.divide) {
				currVal /= parseFloat(screenVal);
			}
			else {
				currVal = parseFloat(screenVal);
			}

			calc.screen.value = currVal;
			pendingOp = op;
		}
	}

	// добавление десятичной точки с числу
	function toDecimal() {
		var screenVal = calc.screen.value;
		if (numberIsNull) {
			screenVal = "0.";
			numberIsNull = false;
		}
		else {
			if (screenVal.indexOf(".") == -1)
				screenVal += ".";
		}
		calc.screen.value = screenVal;
	}

	// Очистка текущего результата
	function clearEntry() {
		calc.screen.value = "0";
		numberIsNull = true;
	}

	// Полная очистка всех результатов
	function clear() {
		currVal = 0;
		pendingOp = operationTypes.noOperation;
		clearEntry();
	}

	function bindNumberHandlers(){
		calc.btnZero.addEventListener('click', function() {
			numPressed(0);
		});
		calc.btnOne.addEventListener('click', function() {
			numPressed(1);
		});
		calc.btnTwo.addEventListener('click', function() {
			numPressed(2);
		});
		calc.btnThree.addEventListener('click', function() {
			numPressed(3);
		});
		calc.btnFour.addEventListener('click', function() {
			numPressed(4);
		});
		calc.btnFive.addEventListener('click', function() {
			numPressed(5);
		});
		calc.btnSix.addEventListener('click', function() {
			numPressed(6);
		});
		calc.btnSeven.addEventListener('click', function() {
			numPressed(7);
		});
		calc.btnEight.addEventListener('click', function() {
			numPressed(8);
		});
		calc.btnNine.addEventListener('click', function() {
			numPressed(9);
		});
	}
	
	function bindOperationHandlers() {
		calc.btnPlus.addEventListener('click', function() {
			operation(operationTypes.add);
		});
		calc.btnMinus.addEventListener('click', function() {
			operation(operationTypes.subtract);
		});
		calc.btnMultiply.addEventListener('click', function() {
			operation(operationTypes.multiply);
		});
		calc.btnDivide.addEventListener('click', function() {
			operation(operationTypes.divide);
		});
		calc.btnEquals.addEventListener('click', function() {
			operation(operationTypes.equals);
		});
	}
};