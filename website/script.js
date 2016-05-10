$(document).ready(function() {
    function resizeMain() {
        $("main").width($("main").height());
        $("main").css("margin-top", $(window).height() / 2 - $("main").height() / 2);
        $("main").css("margin-left", $(window).width() / 2 - $("main").height() / 2);
    }
    resizeMain();
    var seconds = 0;
    var enlarged = false;
    var hexInuse = 0;
    
    setInterval(function(){
        $('.timerBox').html(parseInt(seconds / 60) + " : " + seconds % 60);
        seconds += 1;
    }, 1000);

    var gaugeArray = [0, 0, 0, 0, 0, 0, 0];
    var heatConstant = 20;
    
    $('.module').click(function() {
        if(enlarged == false) {
            enlarged = true; 
            $(this).siblings().hide();
            $(this).animate({top:'5%', left:'13%'}, 500);
            $(this).animate({height:'75%', width:'75%'}, 750);
            
            
        }
    });


    
    
    $(window).resize(function(e) {
        resizeMain();
    });
});