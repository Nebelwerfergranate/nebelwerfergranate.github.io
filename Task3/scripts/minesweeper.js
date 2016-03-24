"use strict";

class Minesweeper {
    constructor(options) {
        this.height = options.height;
        this.width = options.width;
        this.bombProbability = options.bombProbability;

        this.mineField = [];
        this.numberOfBombs = 0;

        this._checkModelState();
        this._generateMineField();
        this._calculateBombs();
    }

    getNeighborCellsCoords(xPos, yPos) {
        var neighbors = [];
        const CELLS_COUNT = 9;

        for (let i = 0; i < CELLS_COUNT; i++) {
            if (i === 4){
                continue; // dont't return target cell's coords.
            }
            
            let x = xPos + i % 3 - 1;
            let y = yPos + Math.floor(i / 3) - 1;


            if (this.mineField[x] == null || this.mineField[x][y] == null) {
                continue;
            }

            neighbors.push({
                xPos: x,
                yPos: y
            });
        }
        
        return neighbors;
    }
    
    getCellXY(xPos, yPos){
        return this.mineField[yPos][xPos];
    }

    _checkModelState() {
        if (isNaN(this.height) || this.height <= 0) {
            throw new Error("height value " + this.height + " is incorrect");
        }
        if (isNaN(this.width) || this.width <= 0) {
            throw new Error("width value " + this.width + " is incorrect");
        }
        if (isNaN(this.bombProbability) || this.bombProbability < 0 || this.bombProbability > 100) {
            throw new Error(
                "bombProbability value " + this.bombProbability +
                " is incorrect. It must be between 0 and 100"
            );
        }
    }

    _generateMineField() {
        for (let y = 0; y < this.height; y++) {
            let row = [];

            for (let x = 0; x < this.width; x++) {

                if (this._checkBombIsRequired()) {
                    this.numberOfBombs++;
                    row.push({
                        cellType: cellTypes.bombCell
                    });
                }
                else {
                    row.push({
                        cellType: cellTypes.emptyCell
                    });
                }
            }

            this.mineField.push(row);
        }
    }

    _checkBombIsRequired() {
        return Math.random() * this.height * this.width < this.bombProbability;
    }

    _calculateBombs() {
        for (let y = 0; y < this.height; y++) {

            for (let x = 0; x < this.width; x++) {
                this._addBombsAroundCellInfo(x, y);
            }
        }
    }

    _addBombsAroundCellInfo(xPos, yPos) {
        let neighbors = this.getNeighborCellsCoords(xPos, yPos);
        let bombs = 0;

        neighbors.map(function(cell) {

            if (this.mineField[cell.xPos][cell.yPos].cellType === cellTypes.bombCell) {
                bombs++;
            }
        }, this);

        this.mineField[xPos][yPos].bombsAround = bombs;
    }


}
