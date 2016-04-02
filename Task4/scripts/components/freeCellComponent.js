class FreeCellComponent extends Component {
    constructor(options) {
        super(options);

        // Fields declaration
        this._model = new GameModel();
        this._view = new FreeCellView();

        this._sourceInfo = null;
        this._destinationInfo = null;


        // Constructor code 
        this.on("dragstart", this._ondragstartHandler.bind(this));
        this.on("dragover", this._ondragoverHandler.bind(this));
        this.on("drop", this._ondropHandler.bind(this));

        this._view.render({
            cascades: this._model.cascades,
            cells: this._model.cells,
            foundations: this._model.lastCardsInfoundations
        });
    }

    _ondragstartHandler(event) {
        if (event.target.getAttribute("data-selector") !== "card") {
            return;
        }

        var card = event.target;
        var cell = card.closest('[data-selector="cardHolder"]');
        var cellType = this._parseCellType(cell.getAttribute("data-cell-type"));

        var info = {
            position: parseInt(card.getAttribute("data-position")),
            cellType: cellType,
            cellNumber: parseInt(cell.getAttribute("data-cell-number"))
        };

        if (!this._model.checkSourceIsValid(info)) {
            event.preventDefault();
            return;
        }
        
        event.dataTransfer.setData("message", "card"); // mozilla doesn't work without this property
        
        this._sourceInfo = info;
    }

    _ondragoverHandler(event) {
        var cell = event.target.closest('[data-selector="cardHolder"]');

        if (cell == null) {
            return;
        }

        var cellType = this._parseCellType(cell.getAttribute("data-cell-type"));

        var destinationInfo = {
            cellType: cellType,
            cellNumber: parseInt(cell.getAttribute("data-cell-number"))
        };

        var options = {
            sourceInfo: this._sourceInfo,
            destinationInfo: destinationInfo
        }

        if (this._model.checkDestinationIsValid(options)) {
            event.preventDefault();
            this._destinationInfo = destinationInfo;
        }
    }

    _ondropHandler(event) {
        event.preventDefault();

        this._model.moveCard({
            sourceInfo: this._sourceInfo,
            destinationInfo: this._destinationInfo
        });

        this._sourceInfo = null;
        this._destinationInfo = null;

        this._view.render({
            cascades: this._model.cascades,
            cells: this._model.cells,
            foundations: this._model.lastCardsInfoundations
        });
    }

    _parseCellType(str) {
        switch (str) {
            case "cascade":
                return cellsTypes.cascade;
            case "cell":
                return cellsTypes.cell;
            case "foundation":
                return cellsTypes.foundation;
            default:
                throw new Error("cell type '" + str + "' doesn't supported");
        }
    }
}