describe("nextStep", function(){
    it("Местами элемены менять не нужно", function(){
        var data = getData();
        var sorter = new Sorter(data);
        assert.deepEqual(data, [1,3,2,-1,5,-3])
    });
    
    it("Меняет соседние элементы местами", function(){
        var data = getData();
        var sorter = new Sorter(data);
        sorter.nextStep();
        sorter.nextStep();
        assert.deepEqual(data, [1,2,3,-1,5,-3]); 
    })
    
    it("Второй проход", function(){
        var data = getData();
        var sorter = new Sorter(data);
        for(var i = 0; i < 7; i ++){
            sorter.nextStep();
        }
        assert.deepEqual(data, [1, -1, 2, 3, -3, 5]);
    })
    
    function getData(){
        return [1,3,2,-1,5,-3];
    }
});