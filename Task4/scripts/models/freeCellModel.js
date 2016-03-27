class FreeCellModel {
    constructor() {
        this._deck = [];
        
        this._fillDeck();
    }

    _fillDeck(){
        for(let suit in cardsSuits){
            for (let rank in cardsRanks){
                let card = new Card(cardsSuits[suit], cardsRanks[rank]);
                 this._deck.push(card);
            }
        }
    }
}