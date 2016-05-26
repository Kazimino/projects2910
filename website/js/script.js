/* Constants */
var MAX_HEAT = 50000;
var HEAT_PER_TICK  = 0.5;
var GAME_SPAWN_TIME = 50;
var DIFF_INCREASE = 600;
var MAX_DIFFICULTY = 4;
var COOLANT_LEVEL = 10;
var HEAT_PENALTY = 25;
var NAME_VALIDATION = new RegExp("/^[a-z0-9_]{3,10}$/i");
var SLIDE_SIZE = 11;
var difficulty = 1;
var slide = 1;

$(document).ready(function() {
    resizeMain();
    
    
    /* Hover effect for menu buttons. */
    $('.menuItem').hover(function() {
        var menu = $(this);
        var newSource = menu.data('alt-src');
        menu.data('alt-src', menu.attr('src'));
        menu.attr('src', newSource);
    });
    
    /* hover for overlay buttons */
    $('.egbtns').hover(function() {
        var menu = $(this);
        var newSource = menu.data('alt-src');
        menu.data('alt-src', menu.attr('src'));
        menu.attr('src', newSource);
    });
    
    /*hover function for sound button */
    $('#soundbtn').hover(function() {
        var menu = $(this);
        var newSource = menu.data('alt-src');
        menu.data('alt-src', menu.attr('src'));
        menu.attr('src', newSource);
    });
    
    
    $('#mutebtn').hover(function() {
        var menu = $(this);
        var newSource = menu.data('alt-src');
        menu.data('alt-src', menu.attr('src'));
        menu.attr('src', newSource);
    });
    
    /*click function for mute button */
    $('#soundbtn').click(function() {
        $(this).hide();    
        muteSFX();
        muteBGM();
        $('#mutebtn').css({display: 'block'});
        
    });
    
    /* click function for unmute button */
    $('#mutebtn').click(function() {
        $(this).css({display: 'none'});
        unmuteSFX();
        playBGM();
        $('#soundbtn').show();
    });
    
    
    /*this function is for enlarging a module for in game play */
    $('.icon').click(function() {
        enlargeGame($(this).data("pos"));
    });
    
    /*clickable mini heat guages allows us to switch 
    to that game that is associate with the heat guage clicked*/
    $('#mini .module').click(function() {
        var pos = $(this).data("pos")
        if(pos != 0) {
            hideCurrGame();
            enlargeGame(pos);
        }
    });
    
    /*backwards function */
    $('#backbutton').click(function() {
        hideCurrGame();
    });    

    /* Scaling the divs when windows resize */
    $(window).resize(function(e) {
        resizeMain();
    });
    timer = document.getElementById('timerBox');
    heatMeter = document.getElementById('heatMeter');
    
    /* score submission */
    $('#scoreSubmit').click(function() {
        validateSubmit();
    });
    /*submit button click fo leaderboard.*/
    $('#scoreName').keydown(function(e) {
        if(e.keyCode == 13) {
            validateSubmit();
        }
    });

    /*takes the user to the main menu if clicked*/
    $('.logo').click(function(){
        if(totalTime > 0) {
            // if in game
        } else {
            $('.leaderBoard').hide();
            mainMenu();
        }
    });
    
    /*ajax function loading more scores in the leaderboard 
    screen*/
    $('#loadMore').click(function() {
        ajaxGetScores(); 
    });
});

var enlarged = "";

// heat gauge and timer variables
var min = 0;
var sec = 0;
var dsec = 0;
var totalHeat = 0;
var totalTime = 0;
var activeArray = [];
var activeMini = 0;

var clock;
var timer;
var heatMeter;

/* module object */
function module(type, answer, data) {
    this.heat = 0;
    this.type = type;
    this.input = "";
    this.answer = answer;
    this.data = data;
}

// padding function for leading zeroes on timer
/* pads the timer. */
function pad(time){
    if(time  < 10){
        return "0" + time;
    }
    return time;
}

/* resizes the main board */
function resizeMain() {
    var $main = $('main');
    $main.width($main.height());
    $main.css("top", $(window).height() / 2 - $main.height() / 2);
    $main.css("left", $(window).width() / 2 - $main.height() / 2);
}

/* hides the current in game screen */
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

/* functions enlarges a game to play mode */
function enlargeGame(pos) {
    enlarged = pos;
    
    /* back button is shown when a module is clicked and enlarged */
    $('#backbutton').fadeIn(250);
    if (enlarged.type = "simonGame") {
        $("#replay").fadeIn(250);
    }

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
    dsec++;
    totalTime++;
    if(dsec == 10) {
        dsec = 0;
        sec++;
        if(sec == 60) {
            sec = 0;
            min++;
        }
    }
    
    if(totalTime % GAME_SPAWN_TIME == 0) {
        spawnRandomGame();
    }
    
    if(difficulty < MAX_DIFFICULTY && totalTime % DIFF_INCREASE == 0) {
        difficulty++;
    }
    
    timer.innerHTML = pad(min) + " : " + pad(sec) + " : " + dsec;
    
    if(totalHeat >= MAX_HEAT){
        clearInterval(clock);
    }
}

/* spawns a random module */
function spawnRandomGame() {
    if(activeArray.length < 7) {
        var gameLocation;
        var posList = ['top', 'topLeft', 'topRight', 'center', 'bottomLeft', 'bottomRight', 'bottom'];
        do {
            gameLocation = posList[Math.floor((Math.random() * 7))];
        } while(activeArray[gameLocation] != null);
        spawnModule(gameLocation);
    }
}


/* generates a module and calls a game.
for anagram, what is returned is an array with the first index
 being an array of words of the same length in the dictionary, and the second
 index being the scrambled letters to use.*/

function spawnModule(pos) {
    var gameInfo;

    switch (pos) {
        case "top":
        case "bottom":
            gameInfo = generateSimon();
            break;
        case "topLeft":
        case "bottomRight":
            gameInfo = generateAscNum();
            break;
        case "topRight":
        case "bottomLeft":
            gameInfo = generateMath();
            break;
        case "center":
            gameInfo = generateAnagram();
            break;
    }

    activeArray[pos] = new module(gameInfo.type, gameInfo.answer, gameInfo.data);

    $('#' + pos + " .icon").fadeIn(250);
    if(enlarged != "") {
        $("#mini-" + activeMini).data("pos", pos);
        $("#mini-" + activeMini++ + " .gauge-fill").addClass('mini-' + pos);
    }
}

/*loads a mini game */
function loadGame(pos) {
    var gameType = activeArray[pos].type;
    $("#" + gameType).fadeIn(250);
    switch(gameType) {
        case "anagramGame":
            loadAnagram();
            break;
        case "mathGame":
            $('#prob').text(activeArray[pos].data);
            break;
        case "simonGame":
            loadSimon();
            break;
        case "ascendingNumber":
            loadAscNum();
            break;
    }
}

/*called at the end of a mini game */
function endGame(pos) {
    $('#' + pos + " .gauge-fill").height(0);
    $('#' + pos + ' .icon').css("display", "none");
    if(enlarged != "") {
        hideCurrGame();
    }
    delete activeArray[pos];
}

/* called when an answer is incorrect */
function wrongAnswer() {
    activeArray[enlarged].heat += HEAT_PENALTY;
    
    if(activeArray[enlarged].heat > 100) {
        activeArray[enlarged].heat = 100;
    } 
   $('#inGame').effect("shake", {times:4, distance:5}, 250);
    /* whatever sound / images for later */
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
        totalHeat = totalHeat < COOLANT_LEVEL ? 0 : totalHeat - COOLANT_LEVEL;
    }
    
    if(totalHeat >= MAX_HEAT){
        totalHeat = MAX_HEAT;
        loseGame();
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
    showFrame();
    $("main > .module").fadeIn(500, function() {
        $(this).css("display", "block");
    });
    clock = setInterval(timerStart, 100);
    spawnRandomGame();
    playBackgroundMusic();
}

/* called when person clicks retry. */
function retry() {
    $('.overlay').fadeOut(250);
    resetAll();
    playGame();
}

/*resets the game*/
function resetAll() {
    totalHeat = 0;
    activeMini = 0;
    min = 0;
    sec = 0;
    dsec = 0;
    difficulty = 1;
    for(var key in activeArray) {
        endGame(key);
    }
}

/*loads scores for leaderboard */
var scoresLoaded = 0;
function loadLeaderBoard() {
    scoresLoaded = 0;
    $(".menu").hide();
    $('header, .leaderBoard').fadeIn(500);
    ajaxGetScores();
}

function showFrame() {
    $(".menu").hide();
    $("header, footer").fadeIn(500, function() {
        $(this).css("display", "block");
    });
}

/* called when the heat bar reaches max heat */
function loseGame() {
    stopBGM();
    $("#timeLasted").html(min + ":" + (sec < 10 ? "0" + sec : sec) + ":" + dsec);
    $(".overlay").fadeIn(500);
    
}

/*ajax call to get scores from the database */
function ajaxGetScores() {
    $.ajax({
        type: 'GET',
        url: '../leaderboard/get_records.php',
        data: {
            offset: scoresLoaded,
        },
        success: function (response) {
            $('#leaderList').html(
                (scoresLoaded > 0 ? $('#leaderList').html() : "") + response);
            scoresLoaded += 10;
        }
    });
}

/*ajax call to submit scores */
function ajaxSubmitScore(playerName) {
    $.ajax({
        type: 'POST',
        url: '/leaderboard/submit_score.php',
        data: {
            score: min * 600 + sec * 10 + dsec,
            name: playerName,
        },
        success: function(response) {
            $('.scoreSubmission').html("<h3>Your Rank:<span>#" + response + "</span></h3>");
        }
    });
}

/*validate score submission */
function validateSubmit() {
    var name = $('#scoreName').val();
    var errMsg = nameValidate(name);
    if(errMsg == "") {
        ajaxSubmitScore(name);
    } else {
        $('#scoreName').css("background-color","#ff4141");
        $('#nameError').html(errMsg);
    }
}

/* validate name submission for leaderboard*/
function nameValidate(name) {
    var errMsg = "";
    if(!RegExp(/^.{3,15}$/).test(name)) {
        errMsg += "Name must be between 3 - 15 characters<br>";
    }
    if(!RegExp(/^[a-z0-9_]*$/i).test(name)) {
        errMsg += "Name can only contain alphanumeric characters or '_'";
    }
    return errMsg;
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

/*function that loads the main menu from the overlay screen*/
function mainMenu() {
    resetAll();
    $('.overlay').fadeOut(250);
    if(enlarged == "") {
        $('main > .module').fadeOut(250);
    } else {
        $('#ingame').fadeOut(250);
        $('#mini').fadeOut(250);
    }
    $('header').fadeOut(250);
    $('footer').fadeOut(250);
    $('.menu').fadeIn(250);
}

/* Tutorial JS Methods */
function playTutorial() {
    $('.menu').hide();
    var cWidth = document.documentElement.clientWidth;
    if (cWidth < 480) {
        for (var n = 1; n <= SLIDE_SIZE; n++) {
            var tut = $('#tutorial' + n);
            var newSource = tut.data('alt-src');
            tut.data('alt-src', tut.attr('src'));
            tut.attr('src', newSource);
        }
    }
    
    $('.tutorial').fadeIn(500, function() {
        $(this).css('display', 'block');
    });
    $('#tutorial1').fadeIn(500, function() {
        $(this).css('display', 'block');
    });
}

function runTutorial() {
    if (slide == SLIDE_SIZE) {
        slide = 1;
        $('.tutorial').hide();
        $('.tutorialImg').hide();
        $('.menu').fadeIn(1000, function() {
            $(this).css('display', 'block');
        });
        return;
    }
    
    $('#tutorial' + slide++).fadeOut(500, function() {
        $(this).css('display', 'none');
    });
    $('#tutorial' + slide).fadeIn(1500, function() {
        $(this).css('display', 'block');
    });
}