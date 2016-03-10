function Sorter(data) {
    //Fields
    var temp;
    var i = data.length - 1;
    var j = 0;
    var data = data;
    var isChanged = false;
    var position = 0;
    
    //Properties
    this.__defineGetter__("data", function(){
		return data;
	});

    this.__defineGetter__("position", function(){
		return position;
	});

    this.__defineGetter__("isChanged", function(){
		return isChanged;
	});
    
    //Methods
    this.nextStep = function(){
        isChanged = false;
        
        if(j === i){
            j = 0;
            i--;
        }
        
        if(i <= 0){
            return;
        }
        
        if (data[j] > data[j+1]) {
            temp = data[j];
            data[j] = data[j+1];
            data[j+1] = temp;
            isChanged = true;
        }
        position = j;
        j++;
    };
}
