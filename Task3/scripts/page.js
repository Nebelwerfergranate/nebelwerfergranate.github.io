class Page extends Component {
    constructor(options) {
        super(options);

        // Fields declaration
        this._mineFieldComponent = new MineField({
            element: this._el.querySelector('[data-component="mineField"]')
        });
        this._modalWindowComponent = new ModalWindow({
            element: document.querySelector('[data-component="modalWindow"]')
        });

        this._bombsRemainBlock = this._el.querySelector('[data-selector="bombsRemain"]');
        this._difficultyLevelsBlock = this._el.querySelector('[data-selector="difficultyLevels"]');
        this._bombsQuantityInput = this._el.querySelector('[data-selector="bombsQuantity"]');
        this._iconButton = this._el.querySelector('[data-selector="icon"]');


        // Constructor code 
        this._mineFieldComponent.on('gameStarted', this._onGameStarted.bind(this));
        this._mineFieldComponent.on('flagToggled', this._onFlagToggled.bind(this));
        this._mineFieldComponent.on('onGameOver', this._onGameOver.bind(this));
        this._difficultyLevelsBlock.addEventListener('click', this._onDifficultyLevelClickHandler.bind(this));
        this._iconButton.addEventListener("click", this._onIconClickHandler.bind(this));

        var options = difficultyLevels.rookie;
        options.bombProbability = this._bombsQuantityInput.value;
        this._mineFieldComponent.startNewGame(options);
        this._makeIconButtonActiveByDataSelector("rookieButton");
    }

    _initializePage() {
        this._bombsRemainBlock.innerHTML = this._mineFieldComponent.bombsRemain;
        this._setIconClass("js-normal");
    }

    _onFlagToggled(event) {
        this._bombsRemainBlock.innerHTML = event.detail;
    }
    
    _onGameStarted(){
        this._initializePage();
    }

    _onGameOver(event) {
        var result = event.detail.result;

        switch (result) {
            case resultTypes.win:
                this._modalWindowComponent.showMessage({
                    header: "You win!!!",
                    message: "Congratulations!"
                });
                this._setIconClass("js-success");
                break;
            case resultTypes.lose:
                this._modalWindowComponent.showMessage({
                    header: "You lose!",
                    message: "You may try again..."
                });
                this._setIconClass("js-death");
                break;
        }
    }

    _onDifficultyLevelClickHandler(event) {
        if (event.target.type !== "button") {
            return;
        }

        var button = event.target;
        var options = {};

        switch (button.getAttribute("data-selector")) {
            case "rookieButton":
                options = difficultyLevels.rookie;
                this._makeIconButtonActiveByDataSelector("rookieButton");
                break;

            case "veteranButton":
                options = difficultyLevels.veteran;
                this._makeIconButtonActiveByDataSelector("veteranButton");
                break;

            case "expertButton":
                options = difficultyLevels.expert;
                this._makeIconButtonActiveByDataSelector("expertButton");
                break;

            default:
                throw new Error("difficultyLevel button not found by data selector");
        }

        options.bombProbability = this._bombsQuantityInput.value;
        this._mineFieldComponent.startNewGame(options);
    }

    _onIconClickHandler() {
        this._mineFieldComponent.startNewGame();
    }

    _setIconClass(className) {
        this._iconButton.classList.remove("js-normal");
        this._iconButton.classList.remove("js-success");
        this._iconButton.classList.remove("js-death");

        this._iconButton.classList.add(className);
    }

    _makeIconButtonActiveByDataSelector(dataSelector) {
        var rookieButton = this._el.querySelector('[data-selector="rookieButton"]');
        var veteranButton = this._el.querySelector('[data-selector="veteranButton"]');
        var expertButton = this._el.querySelector('[data-selector="expertButton"]');

        rookieButton.classList.remove("js-active");
        veteranButton.classList.remove("js-active");
        expertButton.classList.remove("js-active");

        var activeButton = this._el.querySelector('[data-selector="' + dataSelector + '"]');
        activeButton.classList.add("js-active");
    }
}