class GameModel {
    constructor() {
        this._model = new FreeCellModel();
    }

    get cascades() {
        return this._model.cascades;
    }

    get cells() {
        return this._model.cells;
    }

    get lastCardsInfoundations() {
        var foundations = [];

        for (let i = 0; i < this._model.foundations.length; i++) {
            var lastCard = this._model.getLastCardInFoundation(i);
            foundations.push(lastCard);
        }

        return foundations;
    }

    checkSourceIsValid(sourceInfo) {
        var cellType = sourceInfo.cellType;
        var options = {
            cellNumber: sourceInfo.cellNumber,
            position: sourceInfo.position
        };

        switch (cellType) {
            case cellsTypes.foundation:
                return false;
            case cellsTypes.cell:
                return true;
            case cellsTypes.cascade:
                return this._checkSourceCascade(options);
            default:
                throw new Error("Cell type '" + cellType + "' doesn't supported");
        }
    }

    checkDestinationIsValid(options) {
        var destinationInfo = options.destinationInfo;

        var sourceInfo = options.sourceInfo;
        if (!this.checkSourceIsValid(sourceInfo)) {
            return false;
        }

        var cellType = destinationInfo.cellType;
        var cellNumber = destinationInfo.cellNumber
        var checkDestinationOptions = {
            sourceCard: this._findCardBySourceInfo(sourceInfo),
            cellNumber: cellNumber
        }

        switch (cellType) {
            case cellsTypes.foundation:
                return this._checkDestinationFoundation(checkDestinationOptions);
            case cellsTypes.cell:
                return this._checkDestinationCell(cellNumber);
            case cellsTypes.cascade:
                return this._checkDestinationCascade(checkDestinationOptions);
            default:
                throw new Error("Cell type '" + cellType + "' doesn't supported");
        }
    }

    moveCard(options) {
        var sourceInfo = options.sourceInfo;
        var destinationInfo = options.destinationInfo;
        
        var checkDestinationOptions = {
            sourceInfo: sourceInfo,
            destinationInfo: destinationInfo
        };
        
        if (!this.checkDestinationIsValid(checkDestinationOptions)) {
            return;
        }

        var card = this._popFromSource({
            cellType: sourceInfo.cellType,
            cellNumber: sourceInfo.cellNumber
        });

        this._pushToDestination({
            card: card,
            cellType: destinationInfo.cellType,
            cellNumber: destinationInfo.cellNumber
        });
    }

    _checkSourceCascade(options) {
        var cellNumber = options.cellNumber;
        var position = options.position;

        var count = this.cascades[cellNumber].length - 1;

        if (position === count) {
            return true;
        }

        return false;
    }

    _checkDestinationFoundation(options) {
        var sourceCard = options.sourceCard;
        var cellNumber = options.cellNumber;

        var destinationCard = this._model.getLastCardInFoundation(cellNumber);

        if (destinationCard == null) {
            if (sourceCard.rank === cardsRanks.ace) {
                return true;
            }

            return false;
        }

        if (destinationCard.rank + 1 !== sourceCard.rank) {
            return false;
        }

        if (destinationCard.suit !== sourceCard.suit) {
            return false;
        }

        return true;
    }

    _checkDestinationCell(cellNumber) {
        if (this.cells[cellNumber] == null) {
            return true;
        }

        return false;
    }

    _checkDestinationCascade(options) {
        var sourceCard = options.sourceCard;
        var cellNumber = options.cellNumber;

        var destinationCard = this._model.getLastCardInCascade(cellNumber);

        if (destinationCard == null) {
            return true;
        }

        if (destinationCard.color === sourceCard.color) {
            return false;
        }

        if (destinationCard.rank - 1 !== sourceCard.rank) {
            return false;
        }

        return true;
    }

    _findCardBySourceInfo(options) {
        var cellType = options.cellType;
        var cellNumber = options.cellNumber;
        var position = options.position;

        switch (cellType) {
            case cellsTypes.cell:
                return this.cells[cellNumber];
            case cellsTypes.cascade:
                return this.cascades[cellNumber][position];
            default:
                throw new Error("Cell type '" + cellType + "' doesn't supported");
        }
    }

    _popFromSource(options) {
        var cellType = options.cellType;
        var cellNumber = options.cellNumber;

        switch (cellType) {
            case cellsTypes.cell:
                var card = this.cells[cellNumber];
                this.cells[cellNumber] = null;
                return card;
            case cellsTypes.cascade:
                return this.cascades[cellNumber].pop();
            default:
                throw new Error("Cell type '" + cellType + "' doesn't supported");
        }
    }

    _pushToDestination(options) {
        var cellType = options.cellType;
        var cellNumber = options.cellNumber;
        var card = options.card;
        
        switch (cellType) {
            case cellsTypes.foundation: 
                this._model.foundations[cellNumber].push(card);
                break;
            case cellsTypes.cell:
                this.cells[cellNumber] = card;
                break;
            case cellsTypes.cascade:
                this._model.cascades[cellNumber].push(card);
                break;
            default:
                throw new Error("Cell type '" + cellType + "' doesn't supported");
        }
    }
}