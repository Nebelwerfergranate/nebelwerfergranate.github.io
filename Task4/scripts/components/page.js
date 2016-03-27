class Page extends Component {
    constructor(options) {
        super(options);

        // Fields declaration
        this._draggingElement = null;

        // Constructor code 
        this.on("dragstart", this._ondragstartHandler.bind(this));
        this.on("dragover", this._ondragoverHandler.bind(this));
        this.on("drop", this._ondropHandler.bind(this));
    }

    _ondragstartHandler(event) {
        if (event.target.getAttribute("data-selector") !== "card") {
            return;
        }

        this._draggingElement = event.target;

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
        var card = this._draggingElement;

        if (card != null) {
            event.target.appendChild(card);

            document.getElementById("test").innerHTML = "Drop! :)";
        }
    }

    _checkIsNotDroppable(event) {
        const ELEMENT_NODE = 1;
        
        var attribute = event.target.getAttribute("data-selector");
        
        if (attribute !== "card" && attribute !== "cell"){
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
}