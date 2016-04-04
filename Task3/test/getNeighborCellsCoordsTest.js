class GetNeighborCellsCoordsTest {
    constructor() {
        this._model = new Minesweeper();
        this._options = {
            width: 10,
            height: 10,
            bombProbability: 10
        }

        this._model.startNewGame(this._options);
    }

    run() {
        this._cornerCellTest();
        this._leftBorderTest();
        this._rightBorderTest();
        this._topBorderTest();
        this._bottomBorderTest();
        this._centerCellTest();
    }

    _cornerCellTest() {
        var result = this._model.getNeighborCellsCoords(0, 0).length;
        assert.equal(result, 3, "getNeighborCellsCoords doesn't work correctly with corner cells");
    }
    
    _leftBorderTest(){
        var result = this._model.getNeighborCellsCoords(5, 0).length;
        assert.equal(result, 5, "getNeighborCellsCoords doesn't work correctly with left side cells");
    }
    
    _rightBorderTest(){
        var result = this._model.getNeighborCellsCoords(5, this._options.width - 1).length;
        assert.equal(result, 5, "getNeighborCellsCoords doesn't work correctly with right side cells");
    }
    
    _topBorderTest(){
        var result = this._model.getNeighborCellsCoords(0, 5).length;
        assert.equal(result, 5, "getNeighborCellsCoords doesn't work correctly with top side cells");
    }
    
    _bottomBorderTest(){
        var result = this._model.getNeighborCellsCoords(this._options.height - 1, 5).length;
        assert.equal(result, 5, "getNeighborCellsCoords doesn't work correctly with bottom side cells");
    }
    
    _centerCellTest(){
        var result = this._model.getNeighborCellsCoords(5, 5).length;
        assert.equal(result, 8, "getNeighborCellsCoords doesn't work correctly with bottom side cells");
    }
}