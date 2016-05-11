$(document).ready(function() {
    function resizeMain() {
        $("main").width($("main").height());
        $("main").css("margin-top", $(window).height() / 2 - $("main").height() / 2);
        $("main").css("margin-left", $(window).width() / 2 - $("main").height() / 2);
    }
    resizeMain();

    var enlarged = false;
    var hexInuse = 0;

    // heat gauge and timer variables
    var seconds = 0;
    var gaugeArray = [0, 0, 0, 0, 0, 0, 0];
    var maxActivated = 0;

    // padding function for leading zeroes on timer
    function pad(seconds){
        if(seconds < 10){
            return "0" + seconds;
        }
        return seconds;
    }

    // timer function.  Also increases the number of active mini gauges by 1 every 10 seconds
    setInterval(function(){
        $('.timerBox').html(parseInt(seconds / 60) + " : " + pad(seconds % 60));

        if(seconds % 10 == 0 && maxActivated < 7) {
            maxActivated += 1;
        }

        $('.heatBar').html("Gauge 0 heat: " + gaugeArray[0] + "\nGauge 1 heat: " + gaugeArray[1]);
        seconds += 1;
    }, 1000);

    // mini gauge heat increase function.  increases heat by 5 every second.
    setInterval(function(){
        for(var i = 0; i < maxActivated; i++){
            if(gaugeArray[i] < 100){
                gaugeArray[i] += 1;
            }
        }
    }, 200);
    
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