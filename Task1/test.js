describe("Sorter", function(){
    var getRandomInt = Utils.getRandomInt;
    
    it("Пошаговое сравнение с эталонной сортировкой", function(){
        var data = [];
        var capacity = 50;
        for(var i = 0; i < capacity; i ++){
            data.push(getRandomInt(-10000, 10000));
        }
        var dataToCompare = data.slice()
        var sorter = new Sorter(dataToCompare);
        
        var alreadySorted = 0;
        
        // Standard sorter
        for(var i = data.length-1 ; i > 0 ; i--){
            for(var j = 0 ; j < i ; j++){
                sorter.nextStep();
                
                if( data[j] > data[j+1] ){
                    var tmp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = tmp;
                    assert.equal(sorter.isChanged, true, "Свойство isChanged не устанавливается в true");
                }
                else{
                    assert.equal(sorter.isChanged, false, "Свойство isChanged не сбрасывается в false");
                }
                
                assert.equal(sorter.position, j, "Позиция указывается неверно");
                assert.deepEqual(sorter.data, data, "Массив отсортирован неправильно");
            }
            alreadySorted++;
            assert.equal(sorter.numbersSorted, alreadySorted, "Свойство alreadySorted работает некорректно");
        }
        
        for(var i = 0; i < 10; i++){
            sorter.nextStep();
            assert.equal(sorter.position, 0, "После завершения сортировки позиция всё еще может изменяться");
        }
    });
});