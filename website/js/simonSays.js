$(document).ready(function() {
    /*creates and instantiates a game of simon says*/
    $('.simonSection').click(function() {
        var choiceID = $(this).attr('id');
        var currModule = activeArray[enlarged];
        chooseBox(choiceID);
        if(choiceID == "simonSection" + currModule.answer[currModule.input.length]) {
            if(currModule.input.length == currModule.answer.length - 1 ) {
                playCorrect();
                endGame(enlarged);
            }
            currModule.input += "1";
        } else {
            wrongAnswer();
            playIncorrect();
            currModule.input = "";
            setTimeout(function() {
                playSequence();
            }, 750);
        }
    });
});

/* this functions generates a simon says game*/
function generateSimon() {
    var gameInfo = {
        type: "simonGame",
        answer: [],
        data: false
    };
    
    for (var i = 0; i < difficulty + 2; i++) {
        gameInfo.answer[i] = getNum();
    }
    
    // Get a random number between 1-4 used for random sequence.
    function getNum() {
        var num = Math.floor((Math.random() * 4) + 1);
        return num;
    }
    
    return gameInfo;
}

/* loads a simon sequence for a game if it doesn't exist 
inthe active array */
function loadSimon() {
    if(!activeArray[enlarged].data) {
        playSequence();
    }
}

// Play the sequence in chosenSteps.
function playSequence() {
    var i = 0;
    var interval = setInterval(function() {
        chooseBox("simonSection" + activeArray[enlarged].answer[i++]);
        if (i >= activeArray[enlarged].answer.length) {
            clearInterval(interval);
        }
    }, 500);
    activeArray[enlarged].data = true;
}

// Display a box as being part of the sequence or clicked.
function chooseBox(choice) {
    $clicked = ('#' + choice);
    $('#' + choice).css("opacity", "0.2");
    setTimeout(function() {
        $(".simonSection").css("opacity", "1");
    }, 300);
    
    if($clicked == '#simonSection1') {
        playYellow();
    } else if($clicked == '#simonSection2') {
        playGreen();
    } else if($clicked == '#simonSection3') {
        playRed();
    } else if($clicked == '#simonSection4') {
        playBlue();
    }
    
}
