"use strict";

class Page {
    constructor(options) {
        this._el = options.element;
        this._bombsRemainField = document.getElementById('js-bombsRemain');
       // this._bombProbability = document.getElementById('js-bombProbabilityField').value;

        this._mineField = new MineField({
            element: this._el.querySelector('[data-component="mineField"]')
        });

        //this._addDifficultyButtonsHandlers();

        this._mineField.on('flagToggled', this._onFlagToggled.bind(this));
        this._mineField.on('onGameOver', this._onGameOver.bind(this));

        this._bombsRemainField.innerHTML = this._mineField.bombsRemain;
    }

    _onFlagToggled(event) {
        this._bombsRemainField.innerHTML = event.detail;
    }

    _onGameOver(event) {
        // detail.header;
        alert(event.detail.message);
    }

    // _addDifficultyButtonsHandlers() {
    //     document.getElementById('js-rookieBtn').addEventListener('click', this._rookieBtnHanlder.bind(this));
    //     document.getElementById('js-veteranBtn').addEventListener('click', this._veteranBtnHandler.bind(this));
    //     document.getElementById('js-expertBtn').addEventListener('click', this._expertBtnHandler.bind(this));
    // }

    // _rookieBtnHanlder() {
    //     this._mineField.newGame({
    //         height: 9,
    //         width: 9,
    //         bombProbability: document.getElementById('js-bombProbabilityField').value
    //     });
    // }

    // _veteranBtnHandler() {
    //     this._mineField.newGame({
    //         height: 16,
    //         width: 16,
    //         bombProbability: document.getElementById('js-bombProbabilityField').value
    //     });
    // }

    // _expertBtnHandler() {
    //     this._mineField.newGame({
    //         height: 28,
    //         width: 28,
    //         bombProbability: document.getElementById('js-bombProbabilityField').value
    //     });
    // }
}