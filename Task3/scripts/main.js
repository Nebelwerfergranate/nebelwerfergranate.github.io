//"use strict";

document.body.onload = function() {
    var numberOfCells = 100;
    var bombProbability = 1;
    var numberOfBombs = 0;

    renderCells();
    part2();

    showNumberOfBombs();




    function renderCells() {

        for (var cellPosition = 0; cellPosition < numberOfCells; cellPosition++) {
            var cellEl = document.createElement('div');
            cellEl.classList.add("close");

            if (_checkBombIsRequired()) {
                numberOfBombs++;
                cellEl.classList.add("bomb");
            }

            cellEl.id = _generateCellId(cellPosition);
            document.body.appendChild(cellEl);
        }
    }


    // signs the cells and adds handlers to them. Refactoring required.
    function part2() {

        for (var cellPosition = 0; cellPosition < numberOfCells; cellPosition++) {
            var cellEl = _getCellByPosition(cellPosition);
            var bombsAround = _calculateBombs(cellPosition);

            cellEl.innerHTML = bombsAround == 0 ? '&nbsp;' : bombsAround;

            cellEl.onclick = onclickHandler;

            cellEl.oncontextmenu = function() {
                this.className = this.className.indexOf('flag') != -1 ? this.className.replace(/ flag/, '') : this.className + ' flag';
                return false;
            };
        }
    }

    function onclickHandler(event) {
        // I shall rewrite it using html5 custom attributes;

        var cellEl = event.target;

        if (!cellEl || cellEl.className.indexOf('close') == -1) return;

        if (cellEl.className.indexOf('bomb') != -1) {
            divs = document.getElementsByTagName('div');
            for (i = 0; i < divs.length; i++) divs[i].className = divs[i].className.indexOf('bomb') != -1 ? 'bomb' : '';
            alert('You lose!');
        }
        else {
            cellEl.className = '';
            var elems = document.getElementsByTagName('div'),
                len = 0;
            for (ki in elems)
                if (elems[ki].className && elems[ki].className.indexOf('close') != -1) len++;
            if (len <= numberOfBombs) alert('You win!');
        }


        if (cellEl.innerHTML == '&nbsp;') {

            var neighborCellsArr = _getNeighborCellsById(cellEl.id);
            neighborCellsArr.map(function(item) {
                item.click();
            });
        }
    }

    // view
    function showNumberOfBombs() {
        var field = document.getElementById('text');

        switch (numberOfBombs) { // if this number becomes dynamic text should be changed;
            case 0:
                field.innerHTML = "no bombs... try again";
                break;
            case 1:
                field.innerHTML = "1 bomb";
                break;
            default:
                field.innerHTML = (numberOfBombs) + ' bomb\'s';
        }
    }

    // model
    function _generateCellId(cellPosition) {
        return Math.floor(cellPosition / 10) + '_' + cellPosition % 10;
    }

    function _getCellByPosition(cellPosition) {
        var yPos = Math.floor(cellPosition / 10);
        var xPos = cellPosition % 10;

        return document.getElementById(yPos + '_' + xPos);
    }


    function _checkBombIsRequired() {
        return Math.random() * numberOfCells < bombProbability;
    }

    function _calculateBombs(cellPosition) {
        var xPos = cellPosition % 10;
        var yPos = Math.floor(cellPosition / 10);

        var id = yPos + "_" + xPos;

        var neighborCellsArr = _getNeighborCellsById(id);

        var bombsAround = 0;

        neighborCellsArr.map(function(cellEl) {
            if (_checkIsBomb(cellEl)) {
                bombsAround++;
            }
        });

        return bombsAround;
    }

    function _checkIsBomb(cellEl) {
        var returnVal = false;

        if (cellEl != null && cellEl.className.indexOf('bomb') != -1) {
            returnVal = true;
        }
        return returnVal;
    }


    function _getNeighborCellsById(elId) {
        var MAX_IN_ROW = 3;
        var MAX_IN_COLLUMN = 3;

        var cellsArr = [];

        var mix = elId.split('_');
        var yPos = parseInt(mix[0]);
        var xPos = parseInt(mix[1]);

        var neighborCellId = null;

        for (var horizontalShift = -1; horizontalShift < MAX_IN_ROW - 1; horizontalShift++) {

            for (var verticalShift = -1; verticalShift < MAX_IN_COLLUMN - 1; verticalShift++) {

                neighborCellId = (yPos + verticalShift) + "_" + (xPos + horizontalShift);
                cellsArr.push(document.getElementById(neighborCellId));
            }
        }

        return cellsArr;
    }
};