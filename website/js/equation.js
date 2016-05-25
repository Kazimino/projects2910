$(document).ready(function(){
    /* Sets background colour of buttons when hovering */
    $('.mathOption').mouseenter(function() {
        $(this).css("background-color", "black");
     });
    $('.mathOption').mouseleave(function() {
        $(this).css("background-color", "gray");
    });
    
    /* Notifies user they selected correct operator and hides the current game */
    $('.mathOption').click(function() {
        var $clicked = $(this).text().trim();
        if($clicked == activeArray[enlarged].answer) {
            endGame(enlarged);
        } else {
            //need a function to show that answer was
            wrongAnswer();
            //wrong and they need to keep trying 
        }
    });
});

/* logic for the math equation game */
function generateMath() {
    /*controls the difficulty of the numbers and oerators */
    var gameInfo = {
        type: "mathGame",
        answer: 0,
        data: 0
    };

    /*this function grabs a random number */
    function getRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    } 

    /*this function supplies a random number for 
    operator selection */
    function getRandomOperator(max) {
        return Math.floor(Math.random() * max);
    }

    /*variables for the equation and holding answers*/
    var numOne = getRandomNumber(10 * difficulty);
    var numTwo = getRandomNumber(10 * difficulty);
    var operator = null;
    var answer = null;

    /*check needed to stop operator increment*/
    if(difficulty < 4) {
        operator = getRandomOperator(difficulty);
    }

    /*switch to get the answer for the RHS of the equation*/
    switch(operator) {
        case 0:
            answer = numOne + numTwo;
            gameInfo.answer = "+";
            break;
        case 1:
            answer = numOne - numTwo;
            gameInfo.answer = "-";
            break;
        case 2:
            answer = numOne * numTwo;
            gameInfo.answer = "*";
            break;
        case 3: 
            answer = numOne / numTwo;
            gameInfo.answer = "/";
            break;
        default:
            break;
    }

    gameInfo.data = numOne + " _ " + numTwo  + " = " 
                   + (Math.round(answer * 100) / 100);    
    return gameInfo;
}

