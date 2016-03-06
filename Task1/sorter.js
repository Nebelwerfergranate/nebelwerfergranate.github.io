function Sorter(data) {
    this.data = data;
    this.position = 0;
    this.isChanged = false;
    var temp;
    var i = data.length - 1;
    var j = 0;
    this.nextStep = function(){
        var isDone = false;
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
        }
    }
}