"use strict";

document.body.onload = function() {
    var el = document.getElementById('mineField');
    
    var model = new Minesweeper({
        width: 5,
        height: 5,
        bombProbability: 1
    });
    
    el.addEventListener("click", onclickHandler);
    el.oncontextmenu = oncontextmenuHandler;

    renderCells();
    showNumberOfBombs();

    function renderCells() {
        var template = document.getElementById('mineField-template').innerHTML;

        el.innerHTML = _.template(template)({
            height: model.height,
            width: model.width,
            mineField: model.mineField,
        });
    }

    function onclickHandler(event) {
        var cellEl = event.target.closest('[data-selector="cell"]');
        
        if(cellEl == null || !cellEl.classList.contains("js-undiscovered")){
            return;
        }
        
        var xPos = parseInt(cellEl.getAttribute("data-pos-x"));
        var yPos = parseInt(cellEl.getAttribute("data-pos-y"));
        
        if (cellEl.classList.contains("js-bomb")){
            var cellsArr = document.querySelectorAll('[data-selector="cell"]');
            var count = cellsArr.length;
            
            for(let i = 0; i < count; i++){
                cellsArr[i].classList.remove("js-undiscovered");
            }
            showMessage("You lose!");
        }
        else{
            cellEl.classList.remove("js-undiscovered");
            
            var numberOfUndiscovered = document.querySelectorAll("div.js-undiscovered").length;
            if(numberOfUndiscovered <= model.numberOfBombs){
                showMessage("You win!");
            }
        }
        
        if(model.getCellXY(xPos, yPos).bombsAround === 0){
            var neighbors = model.getNeighborCellsCoords(xPos, yPos);
            neighbors.map(function(item) {
                var query = '[data-pos-x="' + item.xPos + '"][data-pos-y="' + item.yPos + '"]';
                var cell = document.querySelector(query);
                cell.click();
            });
        }
    }
    
    function oncontextmenuHandler(event){
        event.preventDefault();
        
        var cellEl = event.target.closest('[data-selector="cell"]');
        
        if(cellEl.classList.contains("js-undiscovered")){
            cellEl.classList.toggle("js-flag");
        }
    }
    
    function showMessage(msg){
        alert(msg);
    }
    
    function showNumberOfBombs() {
        var field = document.getElementById('text');

        switch (model.numberOfBombs) { // if this number becomes dynamic text should be changed;
            case 0:
                field.innerHTML = "no bombs... try again";
                break;
            case 1:
                field.innerHTML = "1 bomb";
                break;
            default:
                field.innerHTML = (model.numberOfBombs) + ' bomb\'s';
        }
    }
};