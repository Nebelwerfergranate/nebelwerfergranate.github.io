function Sorter(data) {
    //Fields
    var temp;
    var i = data.length - 1;
    var j = 0;
    
    //Properties
    this.data = data;
    this.position = 0;
    this.isChanged = false;
    this.isFinished = false;
    
    //Methods
    this.nextStep = function(){
        this.isChanged = false;
        
        if(j === i){
            j = 0;
            i--;
            //this.nextStep();
        }
        
        if(i <= 0){
            this.isFinished = true;
            return;
        }
        
        if (data[j] > data[j+1]) {
            temp = data[j];
            data[j] = data[j+1];
            data[j+1] = temp;
            this.isChanged = true;
        }
        this.position = j;
        j++;
    };
}       
        
        
        /*var isDone = false;
        this.isChanged = false;
        outer:
        for ( ; i > 0; i--) {
            if(isDone){
                if(j -1 === i){
                    j = 0;
                }
                break;
            }
            for ( ; j < i; j++) {
                if(isDone){
                    break outer;
                }
                if (data[j] > data[j+1]) {
                    temp = data[j];
                    data[j] = data[j+1];
                    data[j+1] = temp;
                    this.isChanged = true;
                }
                this.position = j;
                isDone = true;
            }
        }*/
