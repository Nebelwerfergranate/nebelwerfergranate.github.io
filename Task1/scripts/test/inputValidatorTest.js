function InputValidatorTest() {
    var validator = new InputValidator();
    var input = null;
    var result = null;

    this.validateInt = function() {
        intIsEmptyTest();
        intNotIntTest();
        intTooSmallTest();
        intTooBigTest();
        intIsDoubleTest();
    }

    function getNumberInput(value) {
        var input = document.createElement("input");
        input.type = "number";
        input.min = -999;
        input.max = 999;
        input.step = 1;
        input.required = true;
        if(value != null){
            input.value = value;
        }
        return input;
    }

    function intIsEmptyTest() {
        input = getNumberInput("");
        result = validator.validateNumber(input);
        assert.equal(result.hasError, true, "Валидация пустого значения некорректна");
        assert.notEqual(result.message, "", "Для пустых значений сообщение об ошибке не выводится");
    }

    function intNotIntTest() {
        input = getNumberInput("14-");
        result = validator.validateNumber(input);
        assert.equal(result.hasError, true, "Валидация нечислового значения некорректна");
        assert.notEqual(result.message, "", "Для нечисловых значений сообщение об ошибке не выводится");
    }

    function intTooSmallTest() {
        input = getNumberInput();
        input.value = input.min - 100;
        result = validator.validateNumber(input);
        assert.equal(result.hasError, true, "Валидация слишком малых значений некорректна");
        assert.notEqual(result.message, "", "Для слишком малых значений сообщение об ошибке не выводится");
    }

    function intTooBigTest() {
        input = getNumberInput();
        input.value = input.min + 100;
        result = validator.validateNumber(input);
        assert.equal(result.hasError, true, "Валидация слишком больших значений некорректна");
        assert.notEqual(result.message, "", "Для слишком больших значений сообщение об ошибке не выводится");
    }

    function intIsDoubleTest() {
        input = getNumberInput(10.3);
        result = validator.validateNumber(input);
        assert.equal(result.hasError, true, "Валидация дробных значений некорректна");
        assert.notEqual(result.message, "", "Для дробных значений сообщение об ошибке не выводится");
    }
    
    function intIsInt(){
        input = getNumberInput(10);
        result = validator.validateNumber(input);
        assert.equal(result.hasError, false, "Валидация целочисленных значений некорректна");
        assert.Equal(result.message, "", "Для целочисленных выводится сообщение об ошибке");
    }
}