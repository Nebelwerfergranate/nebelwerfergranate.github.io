function ModalWindow(){
    var DEFAULT_DURATION = 2000;
    var $modal = $("#mod_window");
    var $header = $("#mod_header");
    var $msg = $("#mod_text");
    
    this.showErrorMessage = function(message){
        $header.text("Ошибка");
        $msg.text(message);
        $modal.fadeIn();
        setTimeout(closeModal, DEFAULT_DURATION);
    }
    
    function closeModal(){
        $modal.fadeOut();
	    $msg.text("");
    }
}