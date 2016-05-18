/* Constants */
var MAX_HEAT = 50000;
var HEAT_PER_TICK  = 0.5;
var GAME_SPAWN_TIME = 10;
var COOLANT_LEVEL = 10;

$(document).ready(function() {
    resizeMain();
    /* Hover effect for menu buttons. */
    $('.menuItem').hover(function() {
        var $this = $(this);
        var newSource = $this.data('alt-src');
        $this.data('alt-src', $this.attr('src'));
        $this.attr('src', newSource);
    });
    
    /*this function is for enlarging a module for in game play */
    $('.icon').click(function() {
        enlargeGame($(this).data("pos"));
    });
    
    $('#mini .module').click(function() {
        var pos = $(this).data("pos")
        if(pos != 0) {
            hideCurrGame();
            enlargeGame(pos);
        }
    });
    
    /*backwards functionality function */
    $('#backbutton').click(function() {
        hideCurrGame();
    });
	
    /* JavaScript/jQuery for dummy games */
    /* Box Game */
    $('.box').mouseenter(function() {
        $(this).css("border", "1px solid white");
    });
    $('.box').mouseleave(function() {
        $(this).css("border", "none");
    });
    
    /* Notifies user they selected correct color and hides the current game*/
    $('#greenBox').click(function() {
        endGame(enlarged);
    });
    /* Number Game */
    $('.mathOption').mouseenter(function() {
        $(this).css("background-color", "black");
     });
    $('.mathOption').mouseleave(function() {
        $(this).css("background-color", "gray");
    });
    
    /* Notifies user they selected correct operator and hides the current game*/
    $('#plus').click(function() {
        endGame(enlarged);
    });


    /* Scaling the divs when windows resize */
    $(window).resize(function(e) {
        resizeMain();
    });
    timer = document.getElementById('timerBox');
    heatMeter = document.getElementById('heatMeter');
});

var enlarged = "";

// heat gauge and timer variables
var min = 0;
var sec = 0;
var dsec = 0;
var totalHeat = 0;
var activeArray = [];
var activeMini = 0;
var posList = ['top', 'topLeft', 'topRight', 'center', 'bottomLeft', 'bottomRight', 'bottom'];

var clock;
var timer;
var heatMeter;

function module(type, answer) {
    this.heat = 0;
    this.type = type;
    this.input = "";
    this.answer = answer;
    this.data = [];
}

// padding function for leading zeroes on timer
function pad(time){
    if(time  < 10){
        return "0" + time;
    }
    return time;
}

function resizeMain() {
    var $main = $('main');
    $main.width($main.height());
    $main.css("top", $(window).height() / 2 - $main.height() / 2);
    $main.css("left", $(window).width() / 2 - $main.height() / 2);
}

function hideCurrGame() {
    var currGameType = activeArray[enlarged].type;
    enlarged = "";
    $('main > .module').show(250);
    $("#mini").fadeOut(250, function() {
        $(this).css("display", "none");
    });
    $('#inGame').hide(250);
    $('#backbutton').fadeOut(250);
    $('#' + currGameType).css("display", "none");
    $('#mini .gauge-fill').attr("class", "gauge-fill");
    $('#mini .gauge-fill').height(0);
    $('#mini .module').data("pos", 0);
}

function enlargeGame(pos) {
    enlarged = pos;
    
    /* back button is shown when a module is clicked and enlarged */
    $('#backbutton').fadeIn(250);

    /*fades the minigauge in when module is expanded*/
    $('#mini').fadeIn(250);
    loadGame(enlarged);
    
    /* hides main game board and enlarges and animates 
    focus module - also shows the ingame board. */
    $('main > .module').hide(250);
    $('#inGame').show(250);
    activeMini = 0;
    for(var key in activeArray) {
        if(key != enlarged) {
            $("#mini-" + activeMini).data("pos", key);
            $("#mini-" + activeMini++ + " .gauge-fill").addClass('mini-' + key);
        }
    }
}

// timer function.  Also increases the number of active heat gauges by 1 every 10 seconds
function timerStart(){
    heatGenerate();
    
    if(dsec == 10) {
        dsec = 0;
        sec++;
        if(sec == 60) {
            sec = 0;
            min++;
        }
        if(sec % GAME_SPAWN_TIME == 0) {
            spawnRandomGame();
        }
    }
    
    timer.innerHTML = pad(min) + " : " + pad(sec) + " : " + dsec;
    
    dsec += 1;
    if(totalHeat >= MAX_HEAT){
        clearInterval(clock);
    }
}

function spawnRandomGame() {
    if(activeArray.length < 7) {
        var gameLocation;
        do {
            gameLocation = posList[Math.floor((Math.random() * 7))];
        } while(activeArray[gameLocation] != null);
        spawnModule(gameLocation);
    }
}

/* put game generation code in here */
function spawnModule(pos) {
    var gameType, gameAnswer, gameData;
    switch (pos) {
        case "top":
        case "center":
            gameType = "anagramGame";
            gameAnswer = generateAnagram();
            gameData = [];
            break;
        case "bottom":
            gameType = "anagramGame";
            gameAnswer = generateAnagram();
            gameData = [];
            break;
        case "topLeft":
            gameType = "anagramGame";
            gameAnswer = generateAnagram();
            gameData = [];
            break;
        case "bottomRight":
            gameType = "anagramGame";
            gameAnswer = generateAnagram();
            gameData = [];
            break;
        case "topRight":
            gameType = "anagramGame";
            gameAnswer = generateAnagram();
            gameData = [];
            break;
        case "bottomLeft":
            gameType = "anagramGame";
            gameAnswer = generateAnagram();
            gameData = [];
            break;
        default:
            gameType = "boxGame";
    }
    activeArray[pos] = new module(gameType, gameAnswer, gameData);
    $('#' + pos + " .icon").fadeIn(250);
    if(enlarged != "") {
        $("#mini-" + activeMini).data("pos", pos);
        $("#mini-" + activeMini++ + " .gauge-fill").addClass('mini-' + pos);
    }
}

function loadGame(pos) {
    var gameType = activeArray[pos].type;
    $("#" + gameType).fadeIn(250);
    if(gameType == "anagramGame"){
        loadAnagram();
    }
    
}

function endGame(pos) {
    $('#' + pos + " .gauge-fill").height(0);
    $('#' + pos + ' .icon').css("display", "none");
    hideCurrGame();
    delete activeArray[pos];
}

// heat gauge heat increase function.  increases heat by 5 every second and adds heat
// from gauges to main heat bar.

function heatGenerate(){
    for(var key in activeArray) {
        if(activeArray[key].heat < 100) {
            activeArray[key].heat += HEAT_PER_TICK;
        }
        var $fill;
        switch (enlarged) {
            case "":
                $fill = $("#" + key + " .gauge-fill");
                break;
            case key:
                $fill = $("#inGame .gauge-fill");
                break;
            default:
                $fill = $(".mini-" + key);
        }
        $fill.height(activeArray[key].heat + "%");
        $fill.css("background-color", 'hsl(' + (120 - (activeArray[key].heat / 5 * 6)) + ', 100%, 50%)');
        totalHeat += activeArray[key].heat;
    }
    
    if(totalHeat > 0) {
        totalHeat -= COOLANT_LEVEL;
    }
    
    if(totalHeat >= MAX_HEAT){
        // lose
        totalHeat = MAX_HEAT;
    }
    var meterColour;
    meterColour = 'hsl(' + (120 - ((totalHeat/MAX_HEAT) * 120)) + ', 100%, 50%)';
    heatMeter.setAttribute("style", "background-position: " + totalHeat/MAX_HEAT * -100 + "% 0; " +
                           "background-image: linear-gradient(to right, transparent, transparent 50%, " + meterColour + 
                           " 50%, " + meterColour + " 100%)");    
}

/* At this current moment, all this does is fade from Menu to Game.
   used for onclick on PlayButton.*/
function playGame() {
    $(".menu").hide();
    
    $("footer, header, main > .module").fadeIn(500, function() {
        $(this).css("display", "block");
    });
    spawnModule("top");
    clock = setInterval(timerStart, 100);
}

var logoCount = 0;
/*easter egg*/
function logoClick() {
    /*Replaces icons with Easter egg images*/
    if(++logoCount == 5) {
        $('.icon').attr("src", "images/Easter/reeses.png");
        $('#center .icon').attr("src", "images/Easter/chris.png");
        alert("REESES' PEANUT BUTTER CUPS?!");
    }
}

