function Sorter(data) {
    //Fields
    var temp;
    var i = data.length - 1;
    var j = 0;
    
    //Properties
    this.data = data;
    this.position = 0;
    this.isChanged = false;
    
    //Methods
    this.nextStep = function(){
        this.isChanged = false;
        
        if(j === i){
            j = 0;
            i--;
        }
        
        if(i <= 0){
            return;
        }
        
        if (this.data[j] > this.data[j+1]) {
            temp = this.data[j];
            this.data[j] = this.data[j+1];
            this.data[j+1] = temp;
            this.isChanged = true;
        }
        this.position = j;
        j++;
    };
}
