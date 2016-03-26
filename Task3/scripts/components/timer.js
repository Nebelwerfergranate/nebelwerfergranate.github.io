class Timer extends Component {
    constructor(options) {
        super(options);

        this._template = document.getElementById('timer-template').innerHTML;
        this._el.innerHTML = _.template(this._template)();
        this._timeBlock = document.querySelector('[data-selector="time"]');

        this._delta = new Date().getTime();
        
        this._intervalId = setInterval(this._showTime.bind(this), 1000);
    }

    resetTimer() {
        if(this._intervalId == null){
            this._intervalId = setInterval(this._showTime.bind(this), 1000);
        }
        this._delta = new Date().getTime();
        this._showTime();
    }
    
    stopTimer(){
        clearInterval(this._intervalId);
        this._intervalId = null;
    }

    _showTime() {
        var sysTimeStamp = new Date().getTime();
        var time = new Date(sysTimeStamp - this._delta);
        
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        
        minutes = this._addLeadingZero(minutes);
        seconds = this._addLeadingZero(seconds);
        
        this._timeBlock.innerHTML = minutes + ":" + seconds;
    }

    _addLeadingZero(number) {
        if (number < 10) {
            number = "0" + number;
        }
        return number;
    }
}