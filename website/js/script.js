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

            /*hides easter if enabled*/
            $('.easter').hide();

           

			/*fades the minigauge in when module is expanded*/
            $('#mini').fadeIn(2000);

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
        $(this).css("display", "block");
    });
    $("header").fadeIn(500, function() {
        $(this).css("display", "block");
    });
    $("main").fadeIn(500, function() {
        $(this).css("display", "block");
    });
}

var logoCount = 0;
/*easter egg*/
function logoClick() {
    logoCount++;
    if(logoCount == 5){
        
        var $this = $('.easter');
        var newSource = $this.data('alt-src');
        $('.easter').show();
        $this.data('alt-src', $this.attr('src'));
        $this.attr('src', newSource);
        alert("REESES' PEANUT BUTTER CUPS?!");
        
    };
}
   