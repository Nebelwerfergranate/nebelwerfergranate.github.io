class Page extends Component {
    constructor(options) {
        super(options);
        
        this._freCellComponent = new FreeCellComponent({
             element: document.querySelector('[data-component="freeCell"]')
        });
    }
}