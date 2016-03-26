class CheckModelStateTest {
    constructor() {
        this._model = new Minesweeper();
    }

    run() {
        this._undefinedOptionsTest();
        this._emptyOptionsTest();
        this._heightIsUdefinedTest();
        this._widthIsUndefinedTest();
        this._bombProbabilityIsUndefinedTest();
        this._heightIsLessThanZeroTest();
        this._widthIsLessThanZeroTest();
        this._bombsProbabilityIsLessThanZeroTest();
        this._bombsProbabilityIsLMoreThan100Test();
        this._allPropertiesAreOkTest();
    }

    _undefinedOptionsTest() {
        var model = new Minesweeper();

        assert.throws(model.startNewGame.bind(model), Error);
    }

    _emptyOptionsTest() {
        var model = new Minesweeper();
        var options = {};

        assert.throws(model.startNewGame.bind(model, options), Error);
    }

    _heightIsUdefinedTest() {
        var model = new Minesweeper();
        var options = {
            width: 10,
            bombProbability: 10
        };

        assert.throws(model.startNewGame.bind(model, options), Error);
    }

    _widthIsUndefinedTest() {
        var model = new Minesweeper();
        var options = {
            height: 10,
            bombProbability: 10
        };

        assert.throws(model.startNewGame.bind(model, options), Error);
    }

    _bombProbabilityIsUndefinedTest() {
        var model = new Minesweeper();
        var options = {
            height: 10,
            width: 10,
        };

        assert.throws(model.startNewGame.bind(model, options), Error);
    }

    _heightIsLessThanZeroTest() {
        var model = new Minesweeper();
        var model = new Minesweeper();
        var options = {
            height: -10,
            width: 10,
            bombProbability: 10
        };

        assert.throws(model.startNewGame.bind(model, options), Error);
    }

    _widthIsLessThanZeroTest() {
        var model = new Minesweeper();
        var options = {
            height: 10,
            width: -10,
            bombProbability: 10
        };

        assert.throws(model.startNewGame.bind(model, options), Error);
    }

    _bombsProbabilityIsLessThanZeroTest() {
        var model = new Minesweeper();
        var options = {
            height: 10,
            width: 10,
            bombProbability: -10
        };

        assert.throws(model.startNewGame.bind(model, options), Error);
    }

    _bombsProbabilityIsLMoreThan100Test() {
        var model = new Minesweeper();
        var options = {
            height: 10,
            width: 10,
            bombProbability: 101
        };

        assert.throws(model.startNewGame.bind(model, options), Error);
    }

    _allPropertiesAreOkTest() {
        var model = new Minesweeper();
        var options = {
            height: 10,
            width: 10,
            bombProbability: 10
        };

        assert.doesNotThrow(model.startNewGame.bind(model, options), Error);
    }
}