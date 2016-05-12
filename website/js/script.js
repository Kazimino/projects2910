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
            
            /* Make games disappear, later it can be for a currentGame class
            but for now it is hardcoded for the 2 dummy games.*/
            $(".boxGame").fadeOut(200, function() {
                $(this).css("display", "none");
            });
            $(".mathGame").fadeOut(200, function() {
                $(this).css("display", "none");
            });
            
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
    
    /* Make box game appear(if you press top module). */
    $("#top").click(function() {
        setTimeout( $(".boxGame").fadeIn(300, function() {
            $(this).css("display", "block");
        }), 300);
    });
    $("#topRight").click(function() {
        setTimeout( $(".mathGame").fadeIn(300, function() {
            $(this).css("display", "block");
        }), 300);
    });
    
    /* JavaScript/jQuery for dummy games */
    /* Box Game */
    $('.box').mouseenter(function() {
        $(this).animate({ height: '+=10px'});
    });
    $('.box').mouseleave(function() {
        $(this).animate({height :'-=10px'});
    });
    $('#greenBox').click(function() {
        window.alert("You won!");
        $(".boxGame").fadeOut(500, function() {
            $(this).hide();
            
            /* CODE DUPLICATION, SHOULD REMOVE AND FIND BETTER SOLUTION. JUST TESTING*/
            
            $('.module').siblings().show(250);  
            $('.inGame').hide(250);

            enlarged = false;
            backbutton = false;

            $('#backbutton').animate({
                visibility: "hidden", 
                opacity: 0.0});

            /* Make games disappear., later it can be for a currentGame class
            but for now it is hardcoded for the 2 dummy games.*/
            $(".boxGame").fadeOut(200, function() {
                $(this).css("display", "none");
            });
            $(".mathGame").fadeOut(200, function() {
                $(this).css("display", "none");
            });
            
            
            
            /* END TEST */
            
        });
    });
    /* Number Game */
    $('.mathOption').mouseenter(function() {
        $(this).css("background-color", "black");
     });
    $('.mathOption').mouseleave(function() {
        $(this).css("background-color", "gray");
    });
    $('#plus').click(function() {
        window.alert("You won!");
        $(".mathGame").fadeOut(500, function() {
            $(this).hide();
            
            /* CODE DUPLICATION, SHOULD REMOVE AND FIND BETTER SOLUTION. JUST TESTING*/
            
            $('.module').siblings().show(250);  
            $('.inGame').hide(250);

            enlarged = false;
            backbutton = false;

            $('#backbutton').animate({
                visibility: "hidden", 
                opacity: 0.0});

            /* Make games disappear., later it can be for a currentGame class
            but for now it is hardcoded for the 2 dummy games.*/
            $(".boxGame").fadeOut(200, function() {
                $(this).css("display", "none");
            });
            $(".mathGame").fadeOut(200, function() {
                $(this).css("display", "none");
            });
            
            
            
            /* END TEST */
            
        });
    });
    
    $(window).resize(function(e) {
        resizeMain();
        resizeMenu();
    });
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
var clock;
var heatCalc;

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
    clock = setInterval(timerStart, 100);
    heatCalc = setInterval(heatGenerate, 200);
}

var logoCount = 0;
/*easter egg*/
function logoClick() {
    logoCount++;
    if(logoCount == 5) {
        
        var $this = $('.easter');
        var newSource = $this.data('alt-src');
        $('.easter').show();
        $this.data('alt-src', $this.attr('src'));
        $this.attr('src', newSource);
        alert("REESES' PEANUT BUTTER CUPS?!");
        
    }
}