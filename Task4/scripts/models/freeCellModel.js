class FreeCellModel {
    constructor() {
        this._deck = null;

        this._foundations = null;
        this._cells = null;
        this._cascades = null;

        this.reset();
    }

    get cascades() {
        return this._cascades;
    }

    get cells() {
        return this._cells;
    }

    get foundations() {
        return this._foundations;
    }

    reset() {
        const FOUNDATIONS_LENGTH = 4;
        const CELLS_LENGTH = 4;
        const CASCADES_LENGTH = 8;

        this._deck = [];

        this._foundations = new Array(FOUNDATIONS_LENGTH).fill(null);
        this._cells = new Array(CELLS_LENGTH).fill(null);
        this._cascades = new Array(CASCADES_LENGTH).fill(null);

        for (let i = 0; i < FOUNDATIONS_LENGTH; i++) {
            this._foundations[i] = [];
        }

        this._fillDeck();
        this._shuffleDeck(this._deck);
        this._fillCascadesWithDeck();
    }

    getLastCardInFoundation(foundationNumber) {
        var lastIndex = this.foundations[foundationNumber].length - 1;
        if (lastIndex < 0) {
            return null;
        }

        return this.foundations[foundationNumber][lastIndex];
    }

    getLastCardInCascade(cascadeNumber) {
        var lastIndex = this.cascades[cascadeNumber].length - 1;
        if (lastIndex < 0) {
            return null;
        }

        return this.cascades[cascadeNumber][lastIndex];
    }

    _fillDeck() {
        for (let suit in cardsSuits) {
            for (let rank in cardsRanks) {
                let card = new Card(cardsSuits[suit], cardsRanks[rank]);
                this._deck.push(card);
            }
        }
    }

    _fillCascadesWithDeck() {
        let count = this._deck.length;
        for (let i = 0; i < count; i++) {

            let index = i % this._cascades.length;
            if (this._cascades[index] == null) {
                this._cascades[index] = [];
            }
            this._cascades[index].push(this._deck.pop());
        }
    }

    _shuffleDeck(array) {
        let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;

            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }
}