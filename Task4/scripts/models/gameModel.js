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

    get foundations() {
        return this._model.foundations;
    }

    checkSourceIsValid(sourceInfo) {
        var cellType = sourceInfo.cellType;
        var cellNumber = sourceInfo.cellNumber;
        var position = sourceInfo.position;

        if (cellType === cellsTypes.foundation) {
            return false;
        }
        else if (cellType === cellsTypes.cell) {
            return true;
        }
        else if (position === (this.cascades[cellNumber].length - 1)) {
            return true;
        }

        var count = this.cascades[cellNumber].length - 1;

        for (let i = position; i < count; i++) {
            var upperCard = this.cascades[cellNumber][i];
            var lowerCard = this.cascades[cellNumber][i + 1];

            if (lowerCard.color === upperCard.color) {
                return false;
            }
            else if ((lowerCard.rank + 1) !== upperCard.rank) {
                return false;
            }
        }

        return true;
    }
}