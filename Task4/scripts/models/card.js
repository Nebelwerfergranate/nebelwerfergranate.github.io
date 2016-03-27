class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.color = null;

        this._setCardColor(suit);

        this._checkModelState();
    }

    _setCardColor(suit) {
        if (suit === cardsSuits.spades || suit === cardsSuits.clubs) {
            this.color = cardsColors.black;
        }

        if (suit === cardsSuits.diamonds || suit === cardsSuits.hearts) {
            this.color = cardsColors.red;
        }
    }

    _checkModelState() {
        if (cardsSuits.hasOwnProperty(this.suit)) {
            throw new Error("Card suit value '" + this.suit + "' is incorrect");
        }

        if (cardsRanks.hasOwnProperty(this.rank)) {
            throw new Error("Card rank value '" + this.rank + "' is incorrect");
        }

        if (cardsColors.hasOwnProperty(this.color)) {
            throw new Error("Card color value '" + this.color + "' is incorrect");
        }
    }
}