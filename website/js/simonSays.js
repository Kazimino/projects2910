$(document).ready(function() {
    /* Checks if the selected section is the next answer in the sequence */
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

/*generates simon Says game*/
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

/*Loads simon says game*/
function loadSimon() {
    if(!activeArray[enlarged].data) {
        playSequence();
    }
}

// Play the answer sequence
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

// Light up and play noise of the selected section
function chooseBox(choice) {
    $('#' + choice).css("opacity", "0.2");
    setTimeout(function() {
        $(".simonSection").css("opacity", "1");
    }, 300);
    switch(choice) {
        case "simonSection1":
            playYellow();
            break;
        case "simonSection2":
            playGreen();
            break;
        case "simonSection3":
            playRed();
            break;
        case "simonSection4":
            playBlue();
            break;
    }
}