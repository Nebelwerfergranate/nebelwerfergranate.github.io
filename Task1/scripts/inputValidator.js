function InputValidator(){
    this.validateNumber = function(input){
        var hasError = false;
        var msg = "";
        
        if(!input.checkValidity()){
            hasError = true;
	        if(input.validity.valueMissing){
	            msg ="Число не было введено";
	        } else if(input.validity.rangeOverflow){
	            msg = "Число не должно быть более " + input.max;
	       	} else if(input.validity.rangeUnderflow){
	            msg = "Число не должно быть менее " + input.min;
	        } else if(input.validity.stepMismatch){
	            msg = "Дробные числа не поддерживаются";
	        } else {
	            msg = "Упс... что-то пошло не так :(";
	        }
        }
        
        return {
            hasError: hasError,
            message: msg
        };  
    };
}