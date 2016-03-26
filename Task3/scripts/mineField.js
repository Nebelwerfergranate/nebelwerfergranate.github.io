class MineField extends Component {
    constructor(options) {
        super(options);

        this._template = document.getElementById('mineField-template').innerHTML;
        this._model = new Minesweeper({
            width: 10,
            height: 10,
            bombProbability: 15
        });
        this._numberOfBombs = this._model.numberOfBombs;

        this._el.addEventListener("click", this._onclickHandler.bind(this));
        this._el.oncontextmenu = this._oncontextmenuHandler.bind(this);

        this._renderCells();
    }
    

    //Properties
    get bombsRemain() {
        return this._numberOfBombs - document.querySelectorAll(".js-flag").length;
    }
    

    // Methods
    startNewGame(options) {
        this._model.startNewGame(options);
        this._numberOfBombs = this._model.numberOfBombs;

        this._renderCells();
    }

    _renderCells() {
        var template = document.getElementById('mineField-template').innerHTML;

        this._el.innerHTML = _.template(template)({
            height: this._model.height,
            width: this._model.width,
            mineField: this._model.mineField,
        });
    }

    _onclickHandler(event) {
        var cellEl = event.target.closest('[data-selector="cell"]');

        if (cellEl == null || !cellEl.classList.contains("js-undiscovered") || cellEl.classList.contains("js-flag")) {
            return;
        }

        var xPos = parseInt(cellEl.getAttribute("data-pos-x"));
        var yPos = parseInt(cellEl.getAttribute("data-pos-y"));

        if (cellEl.classList.contains("js-bomb")) {
            var cellsArr = document.querySelectorAll('[data-selector="cell"]');
            var count = cellsArr.length;

            for (let i = 0; i < count; i++) {
                cellsArr[i].classList.remove("js-undiscovered");
            }

            cellEl.classList.add("js-explosion");
            this._trigger('onGameOver', {
                result: resultTypes.lose
            });
        }
        else {
            cellEl.classList.remove("js-undiscovered");

            var numberOfUndiscovered = document.querySelectorAll("div.js-undiscovered").length;
            if (numberOfUndiscovered <= this._model.numberOfBombs) {
                this._trigger('onGameOver', {
                    result: resultTypes.win
                });
            }
        }

        if (this._model.getCellXY(xPos, yPos).bombsAround === 0) {
            var neighbors = this._model.getNeighborCellsCoords(xPos, yPos);

            neighbors.map(function(item) {
                var query = '[data-pos-x="' + item.xPos + '"][data-pos-y="' + item.yPos + '"]';
                var cell = document.querySelector(query);
                cell.click();
            });
        }
    }

    _oncontextmenuHandler(event) {
        event.preventDefault();

        var cellEl = event.target.closest('[data-selector="cell"]');

        if (cellEl == null) {
            return;
        }

        if (cellEl.classList.contains("js-undiscovered")) {
            cellEl.classList.toggle("js-flag");

            this._trigger('flagToggled', this.bombsRemain);
        }
    }

    _showMessage(options) {

    }
}