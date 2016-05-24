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

/*
// Handle game logic if a part has been clicked.
<<<<<<< HEAD:website/js/SimonSays.js
function simonClick(inputArray, index) {
    if (!(activeArray[enlarged].answer[index] == inputArray[index])) {
=======
function simonClick(inputArray, index, steps) {
    if (!(chosenArray[index] == inputArray[index])) {
>>>>>>> 463a68be37ad10073b050be4dd8247472856d5ad:website/js/simonSays.js
        wrongAnswer();
        n = 0;
        resetSimon();
        setTimeout(function() {
<<<<<<< HEAD:website/js/SimonSays.js
            playSequence();
            inputSteps = [];
            takeInput();
=======
            playSequence(steps);
            inputSteps = new Array();
            takeInput(steps);
>>>>>>> 463a68be37ad10073b050be4dd8247472856d5ad:website/js/simonSays.js
        }, 750);
        return;
    } else {
        if (steps == (index + 1)) {
            endGame(enlarged);
            n = 0;
            resetSimon();
            return;
        }
    }
}

// Apply click effects to Simon Says game sections.
function takeInput() {
    var inputSteps = [];
    var i = 0;
    $("#simonSection1").click(function() {
        inputSteps[i] = 1;
        chooseBox(1);
        simonClick(inputSteps, i);
        i++;
    });
    $("#simonSection2").click(function() {
        inputSteps[i] = 2;
        chooseBox(2);
        simonClick(inputSteps, i);
        i++;
    });
    $("#simonSection3").click(function() {
        inputSteps[i] = 3;
        chooseBox(3);
        simonClick(inputSteps, i);
        i++;
    });
    $("#simonSection4").click(function() {
        inputSteps[i] = 4;
        chooseBox(4);
        simonClick(inputSteps, i);
        i++;
    });
}

function getInput() {
    var i = 0;
    $("#simonSection1").click(function() {
        activeArray[enlarged].data[i] = 1;
        chooseBox(1);
        i++;
    });
    $("#simonSection2").click(function() {
        activeArray[enlarged].data[i] = 2;
        chooseBox(2);
        i++;
    });
    $("#simonSection3").click(function() {
        activeArray[enlarged].data[i] = 3;
        chooseBox(3);
        i++;
    });
    $("#simonSection4").click(function() {
        activeArray[enlarged].data[i] = 4;
        chooseBox(4);
        i++;
    });
}

// Play the sequence in chosenSteps.
function playSequence() {
    var interval = setInterval(function() {
        chooseBox(activeArray[enlarged].answer[n]);
        n++;
        if (n > steps) {
            clearInterval(interval);
        }
    }, 500);
}

function playSimon() {
    resetSimon();
    playSequence();
    takeInput();
}

function runSimon() {
    var win = false;
    while (!win) {
        win = playSimon();
    }
}

// Start Simon says game.
<<<<<<< HEAD:website/js/SimonSays.js
function initSimonSays(difficulty) {
    var chosenSteps = [];
    switch (difficulty) {
        case 1:
            steps = 3;
            break;
        case 2:
            steps = 4;
            break;
        case 3:
            steps = 5;
            break;
        case 4:
            steps = 6;
            break;
    }
    for (var i = 0; i < steps; i++) {
        chosenSteps[i] = getNum();
    }
    return chosenSteps;
}
=======
function startSimonSays(steps, delay) {
    playSequence(chosenSteps, steps, delay);
    takeInput(chosenSteps, steps, delay);
}
*/
