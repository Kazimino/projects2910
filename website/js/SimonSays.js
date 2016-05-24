// Variables for Simon.
var n = 0;
var steps;

// Get a random number between 1-4 used for random sequence.
function getNum() {
    var num = Math.floor((Math.random() * 4) + 1);
    return num;
}

// Display a box as being part of the sequence or clicked.
function chooseBox(choice) {
    $("#simonSection" + choice).css("opacity", "0.2");
    setTimeout(function() {
        $(".simonSection").css("opacity", "1");
    }, 300);
}

// Reset all click events of Simon Says game sections.
function resetSimon() {
    $("#simonSection1").unbind("click");
    $("#simonSection2").unbind("click");
    $("#simonSection3").unbind("click");
    $("#simonSection4").unbind("click");
}

// Handle game logic if a part has been clicked.
function simonClick(inputArray, index) {
    if (!(activeArray[enlarged].answer[index] == inputArray[index])) {
        wrongAnswer();
        n = 0;
        resetSimon();
        setTimeout(function() {
            playSequence();
            inputSteps = [];
            takeInput();
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