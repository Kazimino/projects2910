/* Constants */
var MAX_HEAT = 50000;
var HEAT_PER_TICK  = 0.5;
var GAME_SPAWN_TIME = 5;
var DIFF_INCREASE = 0;
var MAX_DIFFICULTY = 4;
var COOLANT_LEVEL = 10;
var HEAT_PENALTY = 25;
var IRON_MAN_TIME = 3;
var ON_FIRE_STREAK = 5;
var CLEAN_SWEEP_TIME = 3;
var SLIDE_SIZE = 12;

$(document).ready(function() {
    resizeMain();
    bindMenu();
    getAchievements();

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
        var pos = $(this).data("pos");
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
    
    /* references to timer and heat bar elements */
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
    
    /* change password binds for profile page */
    $('.profile').on('click','#changeSubmit',function() {
        var pwd = $('#changePass').val();
        var cPwd = $('#changePassConfirm').val();
        
        if(pwd == cPwd) {
            var err = passValidate(pwd);
            if(err == "") {
                ajaxChangePassword(pwd);
            } else {
                $('.changePwd .nameError').html(err);
                $('#changePass, #changePassConfirm').css("background-color", '#ff4141');
            }
        } else {
            $('.changePwd .nameError').html("The passwords you've entered do not match");
            $('#changePass, #changePassConfirm').css("background-color", '#ff4141');
        }
    });
});

// achievement variables
var streak = 0;
var unlocked = [];

// time, heat and other environment variables
var min = 0;
var sec = 0;
var dsec = 0;
var totalHeat = 0;
var activeArray = [];
var activeMini = 0;
var difficulty = 1;
var enlarged = "";
var slide = 1;

var clock;
var timer;
var heatMeter;

/* module object to store data for each individual game */
function module(type, answer, data) {
    this.heat = 0;
    this.type = type;
    this.input = "";
    this.answer = answer;
    this.data = data;
}

// padding function for leading zeroes on timer
function pad(time){
    if(time  < 10){
        return "0" + time;
    }
    return time;
}

/* resizes the main board to be a square that stays consistent across all devices*/
function resizeMain() {
    var $main = $('main');
    $main.width($main.height());
    $main.css("top", $(window).height() / 2 - $main.height() / 2);
    $main.css("left", $(window).width() / 2 - $main.height() / 2);
}

/* hides the current zoomed-in game and display the main board again */
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

/* zooms in on the specified game and hides the main board */
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

/* actions to run every tick of the main timer */
function timerActions(){
    heatGenerate();
    dsec++;
    if(dsec == 10) {
        dsec = 0;
        sec++;
        if(sec % GAME_SPAWN_TIME == 0) { 
            spawnRandomGame();
        }
        if(sec == 60) {
            sec = 0;
            min++;
            if(difficulty < MAX_DIFFICULTY) {
                difficulty++;
            }
            if(min == IRON_MAN_TIME && !("ironMan" in unlocked)){
                ajaxUnlockAchievement(2);
            }
        }
    }
            
    timer.innerHTML = pad(min) + " : " + pad(sec) + " : " + dsec;
}

/* spawns a random game module */
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


/* generates an instance of a game module and pushes it to the array of active games */

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

/* loads the game data of the specified module into the zoomed-in game screen */
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

/* Actions executed when a game is completed */
function endGame(pos) {
    streak++;
    if(streak == ON_FIRE_STREAK && !("onFire" in unlocked)){
        ajaxUnlockAchievement(1);
    }
    if(min >= CLEAN_SWEEP_TIME && activeArray.length == 0 && !("cleanSweep" in unlocked)){
        ajaxUnlockAchievement(2);
    }
    removeGame(pos);
}

/* Clears a game from the board and the array of active games */
function removeGame(pos) {
    $('#' + pos + " .gauge-fill").height(0);
    $('#' + pos + ' .icon').css("display", "none");
    if(enlarged != "") {
        hideCurrGame();
    }
    delete activeArray[pos];
}

/* Adds a penalty to the currently active game */
function wrongAnswer() {
    activeArray[enlarged].heat += HEAT_PENALTY;
    streak = 0;
    
    if(activeArray[enlarged].heat > 100) {
        activeArray[enlarged].heat = 100;
    } 
    
   $('#inGame').effect("shake", {times:4, distance:5}, 250);
}



/* Generates heat on each active module and adds them to the main heat bar */
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

/*  Transitions to the game board and starts the game */
function playGame() {
    resetAll();
    showFrame();
    $("main > .module, footer").fadeIn(500, function() {
        $(this).css("display", "block");
    });
    clock = setInterval(timerActions, 100);
    spawnRandomGame();
    playBackgroundMusic();
}

/* Closes the end game overlay and starts the game again */
function retry() {
    $('.overlay').fadeOut(250);
    playGame();
}

/* Resets environment variables and clears the active games array */
function resetAll() {
    for(var key in activeArray) {
        removeGame(key);
    }
    totalHeat = 0;
    activeMini = 0;
    min = 0;
    sec = 0;
    dsec = 0;
    difficulty = 1;
    streak = 0;
}

/* Transitions page to the leaderboard and loads initial 10 scores */
var scoresLoaded = 0;
function loadLeaderBoard() {
    scoresLoaded = 0;
    showFrame();
    $('.leaderBoard').fadeIn(500);
    ajaxGetScores();
}

/* Hides the menu and shows the header & logo */
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

/* Actions to call when you lose the game (stopping the clock, music and submitting your score) */
function loseGame() {
    clearInterval(clock);
    stopBGM();
    $("#timeLasted").html(min + ":" + (sec < 10 ? "0" + sec : sec) + ":" + dsec);
    $(".overlay").fadeIn(500);   
    ajaxSubmitScore();
}

/* Retrieves leaderboard records from the MySQL database and appends them to the leaderboard list */
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

/* Inserts a new leaderboard record into the MySQL database */
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

/* Runs the given name through the username validation regular expressions;
Returns any relevant error messages */
function nameValidate(name) {
    var errMsg = "";
    if(!RegExp(/^.{3,15}$/).test(name)) {
        errMsg += "Name must be between 3 - 15 characters<br>";
    }
    if(!RegExp(/^[a-z0-9_']*$/i).test(name)) {
        errMsg += "Name can only contain alphanumeric characters and _ or \'<br>";
    }
    return errMsg;
}

/* Runs the given password through the password validation regular expressions;
Returns any relevant error messages */
function passValidate(password) {
    var errMsg = "";
    if(!RegExp(/^[a-zA-Z0-9!@#$%^&*]*$/).test(password)) {
        errMsg += "Password can only contain alphanumberic characters or !@#$%^&*<br>";
    }
    if(!RegExp(/^.{8,20}$/).test(password)) {
        errMsg += "Password must be between 8 - 20 characters";
    }
    return errMsg;
}

var logoCount = 0;
/* Easter egg function to swap icons to Chris and Peanut Butter Cups */
function logoClick() {
    if(++logoCount == 5) {
        $('.icon').attr("src", "images/Easter/reeses.png");
        $('#center .icon').attr("src", "images/Easter/chris.png");
        alert("REESES' PEANUT BUTTER CUPS?!");
    }
}

/* Transitions to the main menu page */
function mainMenu() {
    clearInterval(clock);
    stopBGM();
    $('main > div').fadeOut(250);
    $('.overlay').fadeOut(250);
    $('header').animate({
        'background-color': 'transparent',
        'box-shadow': '0px 3px 6px rgba(0,0,0,0)'
    });
    $('.logo').animate({
        'opacity': '0'
    });
    $('#backbutton').fadeOut(250);
    $('footer').fadeOut(250);
    $('.menu').fadeIn(250);
}

/* Starts the tutorial */
function playTutorial() {
    $('.menu').hide();
    $('main').hide();
    $('.content nav').hide();
    
    $('#tutorial1').show();
    $('.tutorial').fadeIn(500, function() {
        $(this).css('display', 'block');
    });
}

/* function for moving forwards in the tutorial on arrow click */
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

/* function for moving backwards in the tutorial on arrow click */
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

/* Unlocks the achievement with the achievement ID given;
Upon successful insertion in the database, the achievement popup slides down */
function ajaxUnlockAchievement(achieveID) {
    $.ajax({
        type: 'POST',
        url: 'achievements/set_achievement.php',
        data: { achievement: achieveID},
        success: function(response) {
            var achieve = JSON.parse(response);
            $('.popupImg').attr("src", "achievements/images/" + achieve.imageFile + ".png");
            $('.popupText').html("<h3>Achievement Unlocked:<br>" + achieve.achName + "</h3>");
            $('.achievePopup').animate({
                top: '0'
            });
            playAchievement();
            setTimeout(function(){
                $('.achievePopup').animate({
                    top: '-11vh'
                });
            }, 5000);
        }
    });
}

/* Expands the login form */
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
	       'padding': '4vh 10%'
        });
    }
}

/* Expands the register form */
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

/* Submits the login values to the ajax script */
function loginSubmit() {
    var usr = $('#loginName').val();
    var pw = $('#loginPassword').val();
    ajaxLogin(usr, pw);
}

/* Validates the name and password then passes them to the register script */
function registerSubmit() {
    var usr = $('#registerName').val();
    var pw = $('#registerPassword').val();
    var err = nameValidate(usr) + passValidate(pw);
    if(err == "") {
        ajaxRegister(usr, pw);
    } else {
        $('#registerName, #registerPassword').css('background-color', '#ff4141');
        $('#registerForm .nameError').html(err);
    }
}

/* Submits username and password to the login script and gets unlocked achievements */
function ajaxLogin(user, pass) {
    $.ajax({
        type: 'POST',
        url: 'account/login.php',
        data: {
            name: user,
            password: pass
        },
        success: function(response) {
            if(response == 'valid') {
                $('nav').load('account/menu.php');
                getAchievements();
            } else {
                $('#loginName, #loginPassword').css('background-color', '#ff4141');
                $('#loginForm .nameError').html('This username and password combination does not exist');
            }
        }
    });
}

/* Submits username and password to the register script and gets unlocked achievements */
function ajaxRegister(user, pass) {
    $.ajax({
        type: 'POST',
        url: 'account/register.php',
        data: {
            name: user,
            password: pass,
        },
        success: function(response) {
            if(response == 'valid') {
                $('nav').load('account/menu.php');
                getAchievements();
            } else {
                $('#registerName, #registerPassword').css('background-color', '#ff4141');
                $('#registerForm .nameError').html('This username has already been taken');
            }
        }
    });
}

/* Submits password to the change password form */
function ajaxChangePassword(pass) {
    $.ajax({
        type: 'POST',
        url: 'account/change_password.php',
        data: {
            password: pass
        },
        success: function() {
            $('.changePwd').html('Your password was changed');
        }
    });
}

/* Populates the unlocked achievements array with all achievements the current user has unlocked already */
function getAchievements(){
    unlocked = [];
    $.ajax({
        type: 'GET',
        url: 'achievements/get_achievements.php',
        success: function(response) {
            var achievements = JSON.parse(response);
            $.each(achievements, function(key, value){
                switch(value.achID) {
                    case 1:
                        unlocked["onFire"] = 1;
                        break;
                    case 2:
                        unlocked["ironMan"] = 1;
                        break;
                    case 3:
                        unlocked["cleanSweep"] = 1;
                        break;
                }
            });
        }
    });
}

/* Adds contextual click binds to the dropdown menu */
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
        unlocked = [];
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

