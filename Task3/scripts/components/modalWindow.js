class ModalWindow extends Component {
    constructor(options) {
        super(options);
    }
    
    
    showMessage(options){
        var template = document.getElementById('modal-template').innerHTML;
        
        this._el.innerHTML = _.template(template)({
            header: options.header,
            message: options.message
        });
        
        this.show();
        setTimeout(this.hide.bind(this), 2000);
    }
}