class FreeCellView {
    constructor() {
        this._cardTemplate = document.getElementById("card-template").innerHTML;
        this._cascades = null;
        this._cells = null;
        this._foundations = null;
    }
    
    render(options){
        this._cascades = options.cascades;
        this._cells = options.cells;
        this._foundations = options.foundations;
        
        this._renderCascades();
        this._renderCells();
        this._renderFoundations();
    }

    _renderCascades() {
        var cascadesBlock = document.querySelector('[data-selector="cascades"]');
        var cascades = this._cascades;
        var cascadesCount = cascades.length;

        for (let i = 0; i < cascadesCount; i++) {
            var cards = cascades[i];
            var cardsCount = cards.length;
            var selector = '[data-cell-number="' + i + '"]';
            var cascade = cascadesBlock.querySelector(selector);
            cascade.innerHTML = "";

            for (let j = 0; j < cardsCount; j++) {
                var card = cards[j];
                var cardItem = this._createCardItem(card, j);
                cascade.innerHTML += cardItem;
            }
        }
    }

    _renderCells() {
        var cellsBlock = document.querySelector('[data-selector="cells"]');
        var cells = this._cells;
        var count = cells.length;

        for (let i = 0; i < count; i++) {
            var selector = '[data-cell-number="' + i + '"]';
            var cell = cellsBlock.querySelector(selector);
            var cardItem = this._createCardItem(cells[i]);
            
            if(cardItem == null){
                cell.innerHTML = "";
                continue;
            }

            cell.innerHTML = cardItem;
        }
    }

    _renderFoundations() {
        var foundationsBlock = document.querySelector('[data-selector="foundations"]');
        var foundations = this._foundations;
        var count = foundations.length;

        for (let i = 0; i < count; i++) {
            var selector = '[data-cell-number="' + i + '"]';
            var foundation = foundationsBlock.querySelector(selector);
            var cardItem = this._createCardItem(foundations[i]);
            
            if(cardItem == null){
                foundation.innerHTML = "";
                continue;
            }

            foundation.innerHTML = cardItem;
        }
    }

    _createCardItem(card, position) {
        if(card == null){
            return null;
        }
        
        let cardItem = _.template(this._cardTemplate)({
            position: position,
            cardClass: this._getCardCssClass(card)
        });

        return cardItem;
    }

    _getCardCssClass(card) {
        var className = "";

        switch (card.suit) {
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