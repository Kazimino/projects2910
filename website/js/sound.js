
/*variables for happy time sound files/audio channels*/
var mute = false;
var myAudio = new Audio("../sound/Reactor_BG.mp3");
myAudio.volume = 0.7;


/* plays the correct answer sound */
function playCorrect() {
    var fileName = "../sound/Reactor_Correct";
    
    if(mute == false) {
        document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + fileName + '.mp3" type="audio/mpeg" />';    
    }
    
    
}

/* plays the incorrect answer sound */
function playIncorrect() {
    var fileName = "../sound/Reactor_Wrong";
    
    if(mute == false) {
        document.getElementById("sound").innerHTML='<audio          autoplay="autoplay"><source src="' + fileName + '.mp3" type="audio/mpeg" />';    
    }
    
    
}

/* plays the background music */
function playBackgroundMusic() {
    var fileName = "../sound/Reactor_BG";
        
    myAudio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
   
    myAudio.play();
}

/* unmute the bgm */
function playBGM() {
    myAudio.play();
}

/*mute the bgm */
function muteBGM() {
    myAudio.pause();
}

/*stops the bgm*/
function stopBGM() {
    myAudio.pause();
    myAudio.currentTime = 0;
}

/* mute the sound effects */
function muteSFX() {
    mute = true;
}

/*unmute the sound effects */
function unmuteSFX() {
    mute = false;
}



/* simon says sounds start here */


function playBlue() {
    var fileName = "../sound/simonBlue";
    
    if(mute == false) {
        document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + fileName + '.mp3" type="audio/mpeg" />';    
    }
}


function playGreen() {
    var fileName = "../sound/simonGreen";
    
    if(mute == false) {
        document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + fileName + '.mp3" type="audio/mpeg" />';    
    }
}


function playYellow() {
    var fileName = "../sound/simonYellow";
    
    if(mute == false) {
        document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + fileName + '.mp3" type="audio/mpeg" />';    
    }
}


function playRed() {
    var fileName = "../sound/simonRed";
    
    if(mute == false) {
        document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + fileName + '.mp3" type="audio/mpeg" />';    
    }
}




/* simon says sounds end here */
