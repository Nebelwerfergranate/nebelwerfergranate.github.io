function Calculator() {
    this._result = 0;
    this._pendingOp = operationTypes.noOperation;
    this._numberIsNew = true;

    this.screenVal = "0";
}

Calculator.prototype.numPressed = function(num) {
    if(!this._numberIsNew && this.screenVal !== "0"){
        this.screenVal = this.screenVal.concat(num.toString());
        this._numberIsNew = false;
        return;
    }

    this._numberIsNew = false;
    this.screenVal = num.toString();
};

Calculator.prototype.doOperation = function(op) {
    if (this._checkOperationIsRequired()) {
        switch(this._pendingOp){
            case operationTypes.add:
                this._result += parseFloat(this.screenVal);
                break;
            case operationTypes.subtract:
                this._result -= parseFloat(this.screenVal);
                break;
            case operationTypes.multiply:
                this._result *= parseFloat(this.screenVal);
                break;
            case operationTypes.divide:
                this._result /= parseFloat(this.screenVal);
                break;
            default: 
                this._result = parseFloat(this.screenVal);
        }
        this._pendingOp = op;
        this._numberIsNew = true;
    }
    
    this.screenVal = this._result.toString();
}

Calculator.prototype.toDecimal = function() {
    if (this.screenVal === "0") {
        this.screenVal = "0.";
        this._numberIsNew = false;
    }
    else if (this.screenVal.indexOf(".") == -1) {
        this.screenVal += ".";
        this._numberIsNew = false;
    }
};

Calculator.prototype.clear = function() {
    this.screenVal = "0";
    this._result = 0;
    this._pendingOp = operationTypes.noOperation;
    this._numberIsNew = true;
};

Calculator.prototype._checkOperationIsRequired = function() {
    return this._pendingOp === operationTypes.equals || this._numberIsNew === false;
};