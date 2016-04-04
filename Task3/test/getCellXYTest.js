class GetSellXYTest{
    run(){
        this._model = new Minesweeper();
        this._needle = "needle";
        
        this._model.mineField = [
                [ [],[this._needle],[] ],
                [ [],[],[] ]
            ];
        
        this._getNeedle();
        this._getEmptyCell();
    }
    
    _getNeedle(){
        var result = this._model.getCellXY(1, 0);
        assert.equal(result, this._needle, "getCellXY doesn't work correctly");
    }
    
    _getEmptyCell(){
        var result = this._model.getCellXY(0, 1);
        assert.notEqual(result, this._needle, "getCellXY doesn't work correctly");
    }
}