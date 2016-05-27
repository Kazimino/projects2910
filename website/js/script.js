/* Constants */
var MAX_HEAT = 50000;
var HEAT_PER_TICK  = 0.5;
var GAME_SPAWN_TIME = 50;
var DIFF_INCREASE = 600;
var MAX_DIFFICULTY = 4;
var COOLANT_LEVEL = 10;
var HEAT_PENALTY = 25;
var TIME_GOAL = 3;
var NAME_VALIDATION = new RegExp("/^[a-z0-9_]{3,10}$/i");
var SLIDE_SIZE = 12;
var difficulty = 1;
var slide = 1;

$(document).ready(function() {
    resizeMain();
    bindMenu();

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
    
    /*takes the user to the main menu if clicked*/
    $('.logo').click(function(){
        mainMenu();
    });
    
    /*ajax function loading more scores in the leaderboard 
    screen*/
    $('#loadMore').click(function() {
        ajaxGetScores(); 
    });
});

var enlarged = "";

// achievement variables
var streak = 0;
var onFire = false;
var ironMan = false;
var cleanSweep = false;
var unlocked = [0, 0, 0];

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


    if(min == TIME_GOAL && unlocked[1] == 0){
        ironManAction();
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
    streak += 1;
    if(enlarged != "") {
        hideCurrGame();
    }
    delete activeArray[pos];
    if(streak == 5 && onFire == false){
        onFireAction();
    }
    if(activeArray.length == 0 && cleanSweep == false){
        cleanSweepAction();
    }
}

/* called when an answer is incorrect */
function wrongAnswer() {
    activeArray[enlarged].heat += HEAT_PENALTY;
    streak = 0;
    
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
    $("main > .module, footer").fadeIn(500, function() {
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
    totalTime = 0;
    difficulty = 1;
    for(var key in activeArray) {
        endGame(key);
    }
}

/*loads scores for leaderboard */
var scoresLoaded = 0;
function loadLeaderBoard() {
    scoresLoaded = 0;
    showFrame();
    $('.leaderBoard').fadeIn(500);
    ajaxGetScores();
}

function showFrame() {
    $(".menu").hide();
    $("header").animate({
        'background-color': '#1e1e1e',
        'box-shadow': '0px 3px 6px rgba(0,0,0,0.6)'
    });
    $(".logo").animate({
        'opacity': '1'
    });
}

/* called when the heat bar reaches max heat */
function loseGame() {
    clearInterval(clock);
    stopBGM();
    $("#timeLasted").html(min + ":" + (sec < 10 ? "0" + sec : sec) + ":" + dsec);
    $(".overlay").fadeIn(500);   
    ajaxSubmitScore();
}

/*ajax call to get scores from the database */
function ajaxGetScores() {
    $.ajax({
        type: 'GET',
        url: 'leaderboard/get_records.php',
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
function ajaxSubmitScore() {
    $.ajax({
        type: 'POST',
        url: 'leaderboard/submit_score.php',
        data: {
            score: min * 600 + sec * 10 + dsec,
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
function nameValidate(name, password) {
    var errMsg = "";
    if(!RegExp(/^.{3,15}$/).test(name)) {
        errMsg += "Name must be between 3 - 15 characters<br>";
    }
    if(!RegExp(/^[a-z0-9_']*$/i).test(name)) {
        errMsg += "Name can only contain alphanumeric characters and _ or \'<br>";
    }
    if(!RegExp(/^[a-zA-Z0-9!@#$%^&*]*$/).test(password)) {
        errMsg += "Password can only contain alphanumberic characters or !@#$%^&*<br>";
    }
    if(!RegExp(/^.{8,20}$/).test(password)) {
        errMsg += "Password must be between 8 - 20 characters";
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
    clearInterval(clock);
    resetAll();
    $('main > div').fadeOut(250);
    $('.overlay').fadeOut(250);
    $('header').animate({
        'background-color': 'transparent',
        'box-shadow': '0px 3px 6px rgba(0,0,0,0)'
    });
    $('.logo').animate({
        'opacity': '0'
    });
    $('footer').fadeOut(250);
    $('.menu').fadeIn(250);
}

/* Tutorial JS Methods */
function playTutorial() {
    $('.menu').hide();
    $('main').hide();
    $('.content nav').hide();
    
    $('#tutorial1').show();
    $('.tutorial').fadeIn(500, function() {
        $(this).css('display', 'block');
    });
}
/*function for moving forwards in the tutorial on arrow click*/
function forwardTutorial() {
    if (slide == SLIDE_SIZE) {
        slide = 1;
        $('.tutorial').hide();
        $('.tutorialImg').hide();
        $('main').fadeIn(1000, function() {
            $(this).css('display', 'block');
        });
        $('.menu').fadeIn(1000, function() {
            $(this).css('display', 'block');
        });
        $('.content nav').show();
        return;
    }
    $('#tutorial' + slide++).hide();
    $('#tutorial' + slide).show();
}

/*function for moving backwards in the tutorial on arrow click*/
function backTutorial() {
    if (slide == 1) {
        $('.tutorial').hide();
        $('.tutorialImg').hide();
        $('main').fadeIn(1000, function() {
            $(this).css('display', 'block');
        });
        $('.menu').fadeIn(1000, function() {
            $(this).css('display', 'block');
        });
        $('.content nav').show();
        return;
    }
    $('#tutorial' + slide--).hide();
    $('#tutorial' + slide).show();   
}

/* functions to activate achievements */
function onFireAction(){
    onFire = true;
    unlocked[0] = 1;
    $.ajax({
        type: 'POST',
        url: '../achievements/set_achievement.php',
        data: { achievement: 1},
        success: function(response) {
            valid = response;
        }
    });
    $('achievePopup').css('visibility', 'visible');
    $('.popupImg').html("<img src=\"achievements/images/on_fire.png\">");
    $('.popupText').html("<h1>On Fire Achievement Unlocked!</h1>");
}

function ironManAction(){
    ironMan = true;
    unlocked[1] = 1;
    $.ajax({
        type: 'POST',
        url: '../achievements/set_achievement.php',
        data: { achievement: 2},
        success: function(response) {
            valid = response;
        }
    });
    $('achievePopup').css('visibility', 'visible');
    $('.popupImg').html("<img src=\"achievements/images/iron_man.png\">");
    $('.popupText').html("<h1>Iron Man Achievement Unlocked!</h1>");
}

/*function for clean sweep achieve*/
function cleanSweepAction(){
    cleanSweep = true;
    unlocked[2] = 1;
    $.ajax({
        type: 'POST',
        url: '../achievements/set_achievement.php',
        data: { achievement: 3},
        success: function(response) {
            valid = response;
        }
    });
    $('achievePopup').css('visibility', 'visible');
    $('.popupImg').html("<img src=\"achievements/images/clean_sweep.png\">");
    $('.popupText').html("<h1>Clean Sweep Achievement Unlocked!</h1>");
}



/* login drop down menu */
function loginDrop() {
    $form = $('#loginForm');
    if($form.height() > 0) {
        $form.animate({
            'max-height': '0',
            'padding-top': '0',
            'padding-bottom': '0'
        });
    } else {
        $form.animate({
            'max-height': '500px',
	    padding: '4vh 10%'
        });
    }
}

/*register dropdown menu part*/
function registerDrop() {
    $form = $('#registerForm');
    if($form.height() > 0) {
        $form.animate({
            'max-height': '0',
            'padding-top': '0',
            'padding-bottom': '0'
        });
    } else {
        $form.animate({
            'max-height': '500px',
            padding: '4vh 10%'
        });
    }
}

/* login submit function */
function loginSubmit() {
    var usr = $('#loginName').val();
    var pw = $('#loginPassword').val();
    ajaxLogin(usr, pw);
}

/*register submit button */
function registerSubmit() {
    var usr = $('#registerName').val();
    var pw = $('#registerPassword').val();
    var err = nameValidate(usr, pw);
    if(err == "") {
        ajaxRegister(usr, pw);
    } else {
        $('#registerName, #registerPassword').css('background-color', '#ff4141');
        $('#registerForm .nameError').html(err);
    }
}

/*ajax call for logging in */
function ajaxLogin(user, pass) {
    $.ajax({
        type: 'POST',
        url: 'account/login.php',
        data: {
            name: user,
            password: pass,
        },
        success: function(response) {
            console.log(response);
            if(response == 'valid') {
                $('nav').load('account/menu.php');
                bindMenu();
            } else {
                $('#loginName, #loginPassword').css('background-color', '#ff4141');
                $('#loginForm .nameError').html('This username and password combination does not exist');
            }
        }
    });
}

/*ajax function for registering*/
function ajaxRegister(user, pass) {
    $.ajax({
        type: 'POST',
        url: 'account/register.php',
        data: {
            name: user,
            password: pass,
        },
        success: function(response) {
            console.log(response);
            if(response == 'valid') {
                $('nav').load('account/menu.php');
                bindMenu();
                getAchievements();
            } else {
                $('#registerName, #registerPassword').css('background-color', '#ff4141');
                $('#registerForm .nameError').html('This username has already been taken');
            }
        }
    });
}

function getAchievements(){
    var input;
    $.ajax({
        type: 'GET',
        url: '../achievements/get_achievements.php',
        success: function(response) {
            input = response;
        }
    });
    var achieveArray = input.split("");
    $.each(achieveArray, function(index, value){
        unlocked[value-1] = 1;
        if(value == 1){
            onFire = true;
        } else if(value == 2){
            ironMan = true;
        } else if(value == 3){
            cleanSweep = true;
        }
    })
    
}

/*dropdown menu function*/

function bindMenu() {
    $('nav').on('click', '#home', function() {
        mainMenu();
    });
    $('nav').on('click', '#dropTab', function() {
        $menu = $('.dropMenu');
        if($menu.height() > 0) {
            $('.dropMenu').animate({
                'max-height': '0'
            });
        } else {
            $('.dropMenu').animate({
               'max-height': '1000px'
            });
        }
    });
    $('nav').on('click', '#myAccount', function() {
        $('.profile').load('account/profile.php');
        clearInterval(clock);
        $('main > div').hide();
        $('.overlay').hide();
        $('footer').hide();
        showFrame();
        $('.profile').fadeIn(500);
    });
    $('nav').on('click', '#logout', function() {
        $.get('account/logout.php');
        $('nav').load('account/menu.php');
    });
    $('nav').on('click', '#login', function() {
        loginDrop();
    });
    $('nav').on('click', '#register', function() {
        registerDrop();
    });
    $('nav').on('click', '#loginSubmit', function() {
        loginSubmit();
    });
    $('nav').on('click', '#registerSubmit', function() {
        registerSubmit();
    });
    $('nav').on('keydown', '#loginName, #loginPassword', function(e) {
        if(e.keyCode == 13) {
            loginSubmit();
        }
    });
    $('nav').on('keydown', '#registerName, #registerPassword', function(e) {
        if(e.keyCode == 13) {
            registerSubmit();
        }
    });
}

