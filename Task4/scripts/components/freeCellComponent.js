class FreeCellComponent extends Component{
    constructor(options){
        super(options);
        
        this._testEl = document.getElementById("test");
        
        // Fields declaration
        this._model = new FreeCellModel();
        this._draggingElement = null;
        this._sourceIndo = null;
        this._destinationInfo = null;
        this._cardTemplate = document.getElementById("card-template").innerHTML;
        

        // Constructor code 
        this.on("dragstart", this._ondragstartHandler.bind(this));
        this.on("dragover", this._ondragoverHandler.bind(this));
        this.on("drop", this._ondropHandler.bind(this));
        
        console.dir(this._model._deck);
        console.dir(this._model._cascades);
        
        var testCard = this._model._cascades[0][0];
        this._testEl.innerHTML = _.template(this._cardTemplate)({
            color: testCard.color,
            suit: testCard.suit,
            rank: testCard.rank
        });
        
        
    }
        _ondragstartHandler(event) {
        if (event.target.getAttribute("data-selector") !== "card") {
            return;
        }

        
        event.dataTransfer.setData("message", "card"); // mozilla doesn't work without this property
        this._draggingElement = event.target;
        
        this._setSourceInfoFromEvent();

        document.getElementById("test").innerHTML = "Let's drag!";
    }

    _ondragoverHandler(event) {
        if (this._checkIsNotDroppable(event)) {
            return;
        }
        event.preventDefault();
    }

    _ondropHandler(event) {
        event.preventDefault();
        
        
        this._setDestinationInfoFromEvent(event);
        alert(this._destinationInfo);
        
        var card = this._draggingElement;

        if (card != null) {
            event.target.appendChild(card);

            document.getElementById("test").innerHTML = "Drop! :)";
        }
    }

    _checkIsNotDroppable(event) {
        const ELEMENT_NODE = 1;
        
        var attribute = event.target.getAttribute("data-selector");
        
        if (attribute !== "card" && attribute !== "cardHolder"){
            return true;
        } 
        
        else if(event.target == this._draggingElement){
            return true;
        }
        
        
        // this case must be the last;
        var children = event.target.childNodes;
        var count = children.length;
        
        if(count === 0){
            return false;
        }
        
        for (let i = 0; i < children.length; i++){
            if(children[i].nodeType !== ELEMENT_NODE){
                continue;
            }
            
            if(children[i].getAttribute("data-selector") === "card"){
                return true;
            }
        }
        
        return false;
    }
    
    _setDestinationInfoFromEvent(event){
        var cell = event.target.closest("[data-selector='cardHolder']");
        
        if(cell == null){
            return;
        }
        
        this._destinationInfo = {
            type: cell.getAttribute("data-cell-type"),
            number: cell.getAttribute("data-cell-number")
        };
        
    }
    
    _setSourceInfoFromEvent(event){
        var card = event.target.closest("[data-selector='card']");
        
        if(card == null){
            return;
        }
        
        this._sourceIndo = {
            
        };
    }
    
    _renderCards(){
        
    }
    
}