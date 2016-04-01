class FreeCellComponent extends Component {
    constructor(options) {
        super(options);

        // Fields declaration
        this._model = new FreeCellModel();
        
        this._view = new FreeCellView({
            cascades: this._model.cascades,
            cells: this._model.cells,
            foundations: this._model.foundations
        });
        
        this._draggingElement = null;
        this._sourceInfo = null;
        this._destinationInfo = null;
        

        // Constructor code 
        this.on("dragstart", this._ondragstartHandler.bind(this));
        this.on("dragover", this._ondragoverHandler.bind(this));
        this.on("drop", this._ondropHandler.bind(this));
        
        this._view.render();
    }

    _ondragstartHandler(event) {
        if (event.target.getAttribute("data-selector") !== "card") {
            return;
        }
        var card = event.target;
        var cell = card.closest('[data-selector="cardHolder"]');
        var cellTypeString = cell.getAttribute("data-cell-type");
        var cellType = null;
        
        switch(cellTypeString){
            case "cascade":
                cellType = cellsTypes.cascade;
                break;
            case "cell":
                cellType = cellsTypes.cell;
                break;
            case "foundation":
                cellType: cellsTypes.foundation;
                break;
            default: throw new Error("cell type '" + cellTypeString +"' doesn't supported");
        }
        
        var info = {
            position: parseInt(card.getAttribute("data-position")),
            cellType: cellType,
            cellNumber: parseInt(cell.getAttribute("data-cell-number")) 
        };
        
        this._sourceInfo = info;
        
        if(!this._model.checkSourceIsValid(info)){
            return;
        }
        
        event.dataTransfer.setData("message", "card"); // mozilla doesn't work without this property
        //event.dataTransfer.setDragImage(new Image(), 0, 0); // removing default helper
        this._draggingElement = event.target;
        
        //this._setSourceInfoFromEvent();
    }

    _ondragoverHandler(event) {
        if (this._checkIsNotDroppable(event)) {
            return;
        }
        event.preventDefault();
    }

    _ondropHandler(event) {
        event.preventDefault();


        this._setDestinationInfoFromEvent(event);
        alert(this._destinationInfo);

        var card = this._draggingElement;

        if (card != null) {
            event.target.appendChild(card);

            document.getElementById("test").innerHTML = "Drop! :)";
        }
    }

    _checkIsNotDroppable(event) {
        const ELEMENT_NODE = 1;

        var attribute = event.target.getAttribute("data-selector");

        if (attribute !== "card" && attribute !== "cardHolder") {
            return true;
        }

        else if (event.target == this._draggingElement) {
            return true;
        }


        // this case must be the last;
        var children = event.target.childNodes;
        var count = children.length;

        if (count === 0) {
            return false;
        }

        for (let i = 0; i < children.length; i++) {
            if (children[i].nodeType !== ELEMENT_NODE) {
                continue;
            }

            if (children[i].getAttribute("data-selector") === "card") {
                return true;
            }
        }

        return false;
    }

    _setDestinationInfoFromEvent(event) {
        var cell = event.target.closest("[data-selector='cardHolder']");

        if (cell == null) {
            return;
        }

        this._destinationInfo = {
            type: cell.getAttribute("data-cell-type"),
            number: cell.getAttribute("data-cell-number")
        };
    }
}