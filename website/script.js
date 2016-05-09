$(document).ready(function() {
    function resizeMain() {
        $("main").width($("main").height());
        $("main").css("margin-top", $(window).height() / 2 - $("main").height() / 2);
        $("main").css("margin-left", $(window).width() / 2 - $("main").height() / 2);
    }
    resizeMain();
    
    var enlarged = false;
    var hexInuse = 0;    
    
    $('#top').click(function() {
        if(enlarged == false) {
            enlarged = true;
            hexInuse = 1;
            $(this).siblings().hide(500);
            $(this).animate({top:'+=15%'}, 1000);
            
        }
    });    
        
    
    $('#topRight').click(function() {
        if(enlarged == false) {
            enlarged = true;
            hexInuse = 2;
            $(this).siblings().hide(500);
            $(this).animate({right:'+=28%'}, 1000);
        }
    });    
    
    $('#topLeft').click(function() {
        if(enlarged == false){
            enlarged = true;
            hexInuse= 3;
            $(this).siblings().hide(500);
            $(this).animate({left:'+=28%'}, 1000);
        }
    });    
    
    $('#bottom').click(function() {
        if(enlarged == false) {
            enlarged = true;
            $(this).siblings().hide(500);
            $(this).animate({bottom:'+=52%'}, 1000);
        }
    });    
    
    $('#bottomRight').click(function() {
        if(enlarged == false) {
            enlarged = true;
            $(this).siblings().hide(500);
            $(this).animate({right:'+=28%', bottom:'+=35%'}, 1000);
        }
    });
    
    $('#bottomLeft').click(function() {
        if(enlarged == false) {
            enlarged = true;
            $(this).siblings().hide(500);
            $(this).animate({left:'+=28%', bottom:'+=35%'}, 1000);
        }
    });    
    
    $('#center').click(function() {
        if(enlarged == false) {
            enlarged = true;
            $(this).siblings().hide(500);
            $(this).animate({top:'-=19%'}, 1000);
        }
    });    
    
    if(enlarged == true) {
        $('body')
    
    }
    
    /*$('body').click(function() {
        $('.module').siblings().show();
        enlarged = false;
        
        if(enlarged == false){
            switch(hexInuse) {
                case 1:
                    $('#top').clickanimate({top:'-=15%'},1000);

            }
        }
        
    });*/
    
    $(window).resize(function(e) {
        resizeMain();
    });
});