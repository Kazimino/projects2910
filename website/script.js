$(document).ready(function() {
    function resizeMain() {
        $("main").width($("main").height());
        $("main").css("margin-top", $(window).height() / 2 - $("main").height() / 2);
        $("main").css("margin-left", $(window).width() / 2 - $("main").height() / 2);
    }
    resizeMain();
    
    var enlarged = false;
    var hexInuse = 0;    
    
    $('.module').click(function() {
        if(enlarged == false) {
            enlarged = true; 
            $(this).siblings().hide();
            $(this).animate({top:'5%', left:'13%'}, 500);
            $(this).animate({height:'75%', width:'75%'}, 750);
            
            $('body').click(function() {
                
            });
        }
    });
    
    
    $(window).resize(function(e) {
        resizeMain();
    });
});