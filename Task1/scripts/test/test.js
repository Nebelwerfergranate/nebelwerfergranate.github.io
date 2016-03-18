describe("Sorter", function(){
    var stepByStepComparer = new StepByStepComparer();
    it("Пошаговое сравнение с эталонной сортировкой", stepByStepComparer.run);
});

describe("InputValidator", function(){
    var validatorTester = new InputValidatorTest();
    it("Валидация целого числа", validatorTester.validateInt);
});
