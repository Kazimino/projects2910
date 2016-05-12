$(document).ready(function() {
    
    $('.inGame').hide();
    
    function resizeMain() {
        $("main").width($("main").height());
        $("main").css("margin-top", $(window).height() / 2 - $("main").height() / 2);
        $("main").css("margin-left", $(window).width() / 2 - $("main").height() / 2);
    }
    resizeMain();
    
    function resizeMenu() {
        $(".menu").width($(".menu").height());
        $(".menu").css("margin-top", $(window).height() / 2 - $(".menu").height() / 2);
        $(".menu").css("margin-left", $(window).width() / 2 - $(".menu").height() / 2);
    }
    resizeMenu();
    
    /* Hover effect for menu buttons. */
    $('.menuItem').hover(function() {
        var $this = $(this);
        var newSource = $this.data('alt-src');
        $this.data('alt-src', $this.attr('src'));
        $this.attr('src', newSource);
    });
    
     /* booleans and vars for module focus and state memorization*/
    var backbutton = false;
    var enlarged = false;

    // heat gauge and timer variables
    var baseTime = 0;
    var gaugeArray = [0, 0, 0, 0, 0, 0, 0];
    var maxActivated = 0;
    var totalHeat = 0;
    var maxHeat = 100;

    // padding function for leading zeroes on timer
    function pad(time){
        if(time  < 10){
            return "0" + time;
        }
        return time;
    }

    // timer function.  Also increases the number of active heat gauges by 1 every 10 seconds
    function timerStart(){
        $('.timerBox').html(parseInt(baseTime / 600) + " : " + pad(parseInt((baseTime / 10) % 60)) + " : " + baseTime % 10);

        if(baseTime % 100 == 0 && maxActivated < 7) {
            maxActivated += 1;
        }

        $('.heatMainBar').html("Gauge 0 heat: " + gaugeArray[0] + "\nGauge 1 heat: " + gaugeArray[1] + "\nTotal Heat: " + parseInt(totalHeat));
        baseTime += 1;
        if(totalHeat >= maxHeat){
            clearInterval(clock);
            clearInterval(heatCalc);
        }
    }

    // heat gauge heat increase function.  increases heat by 5 every second and adds heat
    // from gauges to main heat bar.

    function heatGenerate(){
        var heatForInterval = 0;
        for(var i = 0; i < maxActivated; i++){
            if(gaugeArray[i] < 100){
                gaugeArray[i] += 1;
            }
            heatForInterval += gaugeArray [i];
        }
        if(totalHeat < maxHeat){
            totalHeat += heatForInterval / 100;
        }
        if(totalHeat > maxHeat){
            totalHeat = maxHeat;
        }
        $('.heatMeter').width(parseInt(totalHeat/maxHeat * 100) + "%");
        if(totalHeat / maxHeat * 100 < 33){
            $('.heatMeter').css('background-color', 'green');
        } else if(totalHeat / maxHeat * 100 < 66){
            $('.heatMeter').css('background-color', 'yellow');
        } else {
            $('.heatMeter').css('background-color', 'red');
        }
    }

    var clock = setInterval(timerStart, 100);
    var heatCalc = setInterval(heatGenerate, 200);

    /*this function is for enlarging a module for in game play */
    $('.module').click(function() {

        
        
        if(enlarged == false) {
            enlarged = true; 
            backbutton = true;
            
            /* back button is shown when a module is clicked and enlarged */
            $('#backbutton').css({
                    opacity: 0.0, 
                    visibility: "visible"}).animate({
                    opacity: 1.0});
            /*end of code to make back button show */
						
			/*fades the minigauge in when module is expanded*/
            $('.minigauge').fadeIn(2000);

            /* hides main game board and enlarges and animates 
            focus module - also shows the ingame board. */
            $(this).siblings().hide(250);
            $(this).hide(250);
            $('.inGame').show(300);
        }
    });
    
/*backwards functionality function */    
    $('#backbutton').click(function() {
                        
        if(backbutton == true) {
            $('.module').siblings().show(250);  
            $('.inGame').hide(250);
            
            enlarged = false;
            backbutton = false;
            
            $('#backbutton').animate({
                visibility: "hidden", 
                opacity: 0.0});
            
        } else {
            return;
        }
    });
	
    	/*animates the clicked minigauge to the front*/
    $('.miniModule').click(function() {

        /*hides enlarged*/
        $('.module').hide();
        
        /*hides minigauges*/
        $('.miniModule').hide();
        
    
      
    });
    
    $(window).resize(function(e) {
        resizeMain();
        resizeMenu();
    });
});

/* At this current moment, all this does is fade from Menu to Game.
   used for onclick on PlayButton.*/
function playGame() {
    $(".menu").hide();
    
    $("footer").fadeIn(500, function() {
        $(this).css("display", "inline-block");
    });
    $("header").fadeIn(500, function() {
        $(this).css("display", "block");
    });
    $(".module").fadeIn(500, function() {
        $(this).css("display", "inline-block");
    });

}

var logoCount = 0;
function logoClick() {
    logoCount++;
}
