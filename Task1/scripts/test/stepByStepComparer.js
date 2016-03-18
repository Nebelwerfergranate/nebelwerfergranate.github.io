function StepByStepComparer(){
    
    // Fields
    var data = getData();
    var dataToCompare = data.slice()
    var sorter = new Sorter(dataToCompare);
    var alreadySorted = 0;
    
    // Methods
    this.run = function(){
        // Standard sorter
        for(var i = data.length-1 ; i > 0 ; i--){
            for(var j = 0 ; j < i ; j++){
                sorter.nextStep();
                    
                if(data[j] > data[j + 1]){
                    var tmp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = tmp;
                        
                    swapDoneTest();
                }
                else{
                    swapNotRequiredTest();
                }
                beforeIncrementTest(j);
            }
            innerLoopCompleteTest();
        }
        sortIsDoneTest();
    };
    
    function getData(){
        var CAPACITY = 50;
        var MIN = -10000;
        var MAX = 10000;
            
        var data = [];
            
        var getRandomInt = Utils.getRandomInt;
            
        for(var i = 0; i < CAPACITY; i ++){
            data.push(getRandomInt(MIN, MAX));
        }
        return data;
    }
            
    function swapDoneTest(){
        assert.equal(sorter.isSwapped, true, "Свойство isSwapped не устанавливается в true");
    }
            
    function swapNotRequiredTest(){
        assert.equal(sorter.isSwapped, false, "Свойство isSwapped не сбрасывается в false");
    }
            
    function beforeIncrementTest(positionToCompare){
        assert.equal(sorter.position, positionToCompare, "Позиция указывается неверно");
        assert.deepEqual(sorter.data, data, "Массив отсортирован неправильно");
    }
    
    function innerLoopCompleteTest(){
        alreadySorted++;
        assert.equal(sorter.numbersSorted, alreadySorted, "Свойство alreadySorted работает некорректно");        
    }
    
    function sortIsDoneTest(){
        for(var i = 0; i < 10; i++){
            sorter.nextStep();
            assert.equal(sorter.position, 0, "После завершения сортировки позиция всё еще может изменяться");
        }
    }
};