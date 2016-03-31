class FreeCellComponent extends Component {
    constructor(options) {
        super(options);

        this._testEl = document.getElementById("test");

        // Fields declaration
        this._model = new FreeCellModel();
        this._draggingElement = null;
        this._sourceIndo = null;
        this._destinationInfo = null;
        this._cardTemplate = document.getElementById("card-template").innerHTML;


        // Constructor code 
        this.on("dragstart", this._ondragstartHandler.bind(this));
        this.on("dragover", this._ondragoverHandler.bind(this));
        this.on("drop", this._ondropHandler.bind(this));

        console.dir(this._model._deck);
        console.dir(this._model._cascades);

        this._renderCascades();
        this._renderCells();
        this._renderFoundations();
    }
    _ondragstartHandler(event) {
        if (event.target.getAttribute("data-selector") !== "card") {
            return;
        }


        event.dataTransfer.setData("message", "card"); // mozilla doesn't work without this property
        this._draggingElement = event.target;

        this._setSourceInfoFromEvent();

        document.getElementById("test").innerHTML = "Let's drag!";
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

    _setSourceInfoFromEvent(event) {
        var card = event.target.closest("[data-selector='card']");

        if (card == null) {
            return;
        }

        this._sourceIndo = {

        };
    }

    _renderCascades() {
        var cascadesBlock = document.querySelector('[data-selector="cascades"]');
        var cascades = this._model.cascades;
        var cascadesCount = cascades.length;

        for (let i = 0; i < cascadesCount; i++) {
            var cards = cascades[i];
            var cardsCount = cards.length;
            var selector = '[data-cell-number="' + i + '"]';
            var cascade = cascadesBlock.querySelector(selector);

            for (let j = 0; j < cardsCount; j++) {
                var card = cards[j];
                var cardItem = this._createCardItem(card);
                cascade.innerHTML += cardItem;
            }
        }
    }
    
    _renderCells(){
        var cellsBlock = document.querySelector('[data-selector="cells"]');
        var cells = this._model.cells;
        var count = cells.length;
        
        for(let i = 0; i < count; i++){
            var selector = '[data-cell-number="' + i + '"]';
            var cell = cellsBlock.querySelector(selector);
            var cardItem = this._createCardItem(cells[i]);
            
            cell.innerHTML = cardItem;
        }
    }
    
    _renderFoundations(){
        var foundationsBlock = document.querySelector('[data-selector="foundations"]');
        var foundations = this._model.foundations;
        var count = foundations.length;
        
        for(let i = 0; i < count; i++){
            var selector = '[data-cell-number="' + i + '"]';
            var foundation = foundationsBlock.querySelector(selector);
            var cardItem = this._createCardItem(foundations[i]);
            
            foundation.innerHTML = cardItem;
        }
    }

    _createCardItem(card) {
        let cardItem = _.template(this._cardTemplate)({
            color: card.color,
            suit: card.suit,
            rank: card.rank,
            cardClass: this._getCardCssClass(card)
        });
        
        return cardItem;
    }
    
    _getCardCssClass(card){
        var className = "";
        
        switch (card.suit){
            case cardsSuits.spades:
                className += "spades";
                break;
            case cardsSuits.hearts:
                className += "hearts";
                break;
            case cardsSuits.diamonds:
                className += "diamonds";
                break;
            case cardsSuits.clubs:
                className += "clubs";
                break;
            default: 
                throw new Error("card suit '" + card.suit + "' doesn't supported");
        }

        switch (card.rank) {
            case cardsRanks.two:
                className += "2";
                break;
            case cardsRanks.three:
                className += "3";
                break;
            case cardsRanks.four:
                className += "4";
                break;
            case cardsRanks.five:
                className += "5";
                break;
            case cardsRanks.six:
                className += "6";
                break;
            case cardsRanks.seven:
                className += "7";
                break;
            case cardsRanks.eight:
                className += "8";
                break;
            case cardsRanks.nine:
                className += "9";
                break;
            case cardsRanks.ten:
                className += "10";
                break;
            case cardsRanks.jack:
                className += "Jack";
                break;
            case cardsRanks.queen:
                className += "Queen";
                break;
            case cardsRanks.king:
                className += "King";
                break;
            case cardsRanks.ace:
                className += "Ace";
                break;
            default:
                throw new Error("card rank '" + card.rank + "' doesn't supported");
        }

        return className;
    }
}