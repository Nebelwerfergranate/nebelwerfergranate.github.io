function Sorter(data) {
    //Fields
    var max = data.length - 1;
    var current = 0;
    var data = data;
    var isSwapped = false;
    var position = 0;
    
    //Properties
    this.__defineGetter__("data", function(){
		return data;
	});

    this.__defineGetter__("position", function(){
		return position;
	});

    this.__defineGetter__("isSwapped", function(){
		return isSwapped;
	});
	
	this.__defineGetter__("numbersSorted", function(){
	    if(current === max) {
	        return data.length - max;
	    }
	    return data.length - max - 1;
	});
    
    //Methods
    this.nextStep = function(){
        isSwapped = false;
        
        if(current === max){
            current = 0;
            max--;
        }
        
        if(max <= 0){
            return;
        }
        
        if (data[current] > data[current + 1]) {
            swap();
            isSwapped = true;
        }
        position = current;
        current++;
    };
    
    function swap(){
        temp = data[current];
        data[current] = data[current + 1];
        data[current + 1] = temp;
        var temp;
    }
}
