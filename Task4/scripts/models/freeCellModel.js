class FreeCellModel {
    constructor() {
        const FOUNDATIONS_LENGTH = 4;
        const CELLS_LENGTH = 4;
        const CASCADES_LENGTH = 8;

        this._deck = [];

        this._foundations = new Array(FOUNDATIONS_LENGTH);
        this._cells = new Array(CELLS_LENGTH);
        this._cascades = new Array(CASCADES_LENGTH);

        this._fillDeck();
        this._shuffleDeck(this._deck);
        this._fillCascadesWithDeck();
        
    }
    
    get cascades(){
        return this._cascades;
    }
    
    get cells(){
        return this._cells;
    }
    
    get foundations(){
        return this._foundations;
    }
    
    checkSourceIsValid(sourceInfo){
        var cellType = sourceInfo.cellType;
        var cellNumber = sourceInfo.cellNumber;
        var position = sourceInfo.position;
        
        if(cellType === cellsTypes.foundation){
            return false;
        }
        else if(cellType === cellsTypes.cell){
            return true;
        }
        else if(position === (this._cascades[cellNumber].length - 1)){
            return true;
        }
        
        var count = this._cascades[cellNumber].length - 1;
        
        for (let i = position; i < count; i++){
            var upperCard = this._cascades[cellNumber][i];
            var lowerCard = this._cascades[cellNumber][i + 1];
            
            if(lowerCard.color === upperCard.color){
                return false;
            }
            else if((lowerCard.rank + 1) !== upperCard.rank){
                return false;
            }
        }
        
        return true;
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