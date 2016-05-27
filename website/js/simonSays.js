$(document).ready(function() {
    $('.simonSection').click(function() {
        var choiceID = $(this).attr('id');
        var currModule = activeArray[enlarged];
        chooseBox(choiceID);
        if(choiceID == "simonSection" + currModule.answer[currModule.input.length]) {
            if(currModule.input.length == currModule.answer.length - 1 ) {
                endGame(enlarged);
            }
            currModule.input += "1";
        } else {
            wrongAnswer();
            currModule.input = "";
            setTimeout(function() {
                playSequence();
            }, 750);
        }
    });
});

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
    $('#' + choice).css("opacity", "0.2");
    setTimeout(function() {
        $(".simonSection").css("opacity", "1");
    }, 300);
}