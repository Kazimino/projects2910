/* logic for the math equation game */
function mathGame() {
    /*controls the difficulty of the numbers and oerators */
    var diffMultiplier = 1;
    var gameArr = [];

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
    var numOne = getRandomNumber(10 * diffMultiplier);
    var numTwo = getRandomNumber(10 * diffMultiplier);
    var operator = null;
    var answer = null;
    var equation = null;

    /*check needed to stop operator increment*/
    if(diffMultiplier < 4) {
        operator = getRandomOperator(diffMultiplier++);
    }

    /*switch to get the answer for the RHS of the equation*/
    switch(operator) {
        case 0:
            answer = numOne + numTwo;
            operator = "+";
            break;
        case 1:
            answer = numOne - numTwo;
            operator = "-";
            break;
        case 2:
            answer = numOne * numTwo;
            operator = "*";
            break;
        case 3: 
            answer = numOne / numTwo;
            operator = "/";
            break;
        default:
            break;
    }

    equation = numOne + " _ " + numTwo  + " = " 
                   + (Math.round(answer * 100) / 100);
    gameArr[0] = equation;
    //$('#prob').text(equation);
    gameArr[1] = operator;
    
    return gameArr;
}


/* checks the answer to the math equation 
mathAnswer is the answer to the question 
pos is the position of the hex 
$clicked is the text from the clicked button. */
function checkMathAnswer(pos, $clicked) {
    if($clicked == activeArray[pos].answer) {
        endGame(pos);
        
    } else {
        //need a function to show that answer was
        wrongAnswer();
        //wrong and they need to keep trying 
    }
    
}