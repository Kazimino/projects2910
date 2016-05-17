// Variable for playSequence.
var n = 0;

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
function simonClick(chosenArray, inputArray, index, steps, delay) {
    if (!(chosenArray[index] == inputArray[index])) {
        wrongAnswer();
        n = 0;
        resetSimon();
        setTimeout(function() {
            playSequence(chosenArray, steps, delay);
            inputSteps = new Array();
            takeInput(chosenArray, steps, delay);
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
function takeInput(chosenSteps, steps, delay) {
    var inputSteps = new Array();
    var i = 0;
    $("#simonSection1").click(function() {
        inputSteps[i] = 1;
        chooseBox(1);
        simonClick(chosenSteps, inputSteps, i, steps, delay);
        i++;
    });
    $("#simonSection2").click(function() {
        inputSteps[i] = 2;
        chooseBox(2);
        simonClick(chosenSteps, inputSteps, i, steps, delay);
        i++;
    });
    $("#simonSection3").click(function() {
        inputSteps[i] = 3;
        chooseBox(3);
        simonClick(chosenSteps, inputSteps, i, steps, delay);
        i++;
    });
    $("#simonSection4").click(function() {
        inputSteps[i] = 4;
        chooseBox(4);
        simonClick(chosenSteps, inputSteps, i, steps, delay);
        i++;
    });
}

// Play the sequence in chosenSteps.
function playSequence(chosenSteps, steps, delay) {
    var interval = setInterval(function() {
        chooseBox(chosenSteps[n]);
        n++;
        if (n > steps) {
            clearInterval(interval);
        }
    }, delay);
}

// Start Simon says game.
function startSimonSays(steps, delay) {
    var chosenSteps = new Array();
    for (var i = 0; i < steps; i++) {
        chosenSteps[i] = getNum();
    }
    playSequence(chosenSteps, steps, delay);
    takeInput(chosenSteps, steps, delay);
}