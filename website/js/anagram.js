/* this code enters the user's input every time a button is pressed.
it checks whether the input matches the scrambled word's length.  if
the input length matches, it then makes a call to the database to check
if the input is a valid word. If the word is valid, the game is closed.
 If the word is invalid, an error message is displayed and the game is
 reset. */
$(document).ready(function() {
    $('.letterChoice').click(function() {
        $(this).css("pointer-events", "none");
        var choiceID = $(this).attr('id');
        activeArray[enlarged].data.push(parseInt(choiceID[choiceID.length -1]));
        $('#anagramInput').html("<h1>" + $('#anagramInput').text() + $(this).text() + "</h1>");
        $(this).fadeTo("fast", 0.2);
        activeArray[enlarged].input = $('#anagramInput').text();

        var currInput = $('#anagramInput').text();

        if(currInput.length == activeArray[enlarged].answer.length){
            if(checkWord(currInput)){
                $('#anagramAnswer').html("<h1>" + "You Win!" + "</h1>");
                resetGame();
                endGame(enlarged);
            } else {
                wrongAnswer();
                $('#anagramAnswer').html("<h1>" + "Try Again" + "</h1>");
                activeArray[enlarged].input = [];
                activeArray[enlarged].data = [];
                resetGame();
            }

        }

    });
    $('#anagramInput').click(function(){
        $(this).html("<h1>" + $(this).text().slice(0, -1) + "</h1>");
        var lastPressed = activeArray[enlarged].data.pop();
        $("#letterChoice" + lastPressed).css("opacity", 1.0);
        $("#letterChoice" + lastPressed).css("pointer-events", "auto");
    })

});
/* this function takes in a word and checks if it exists in the dictionary.
Returns true if a match is found and false if there are no matches.
 */
function checkWord(validate){
    var valid = false;
    
    $.ajax({
        async: false,
        type: 'GET',
        url: '../dictionary/get_match.php',
        data: {word: validate},
        success: function(response) {
            valid = response;
        }
    });
    
    return valid == 1;
}

function resetGame() {
    $('#anagramInput').html("<h1></h1>");
    setTimeout(function(){
        $('.letterChoice').each(function(){
            $(this).fadeTo("fast", 1);
            $(this).css("pointer-events", "auto");
        });
        $('#anagramAnswer').html("<h1></h1>");
    }, 600);
}

/*  this function loads the saved state of the game module */
function loadAnagram(){
    $('#anagramInput').html("<h1>" + activeArray[enlarged].input + "</h1>");
    var scrambled = activeArray[enlarged].answer.split("");
    var pressed = activeArray[enlarged].data;
    var i = 0;
    $('.letterChoice').each(function(){
        $(this).css("opacity", 1.0);
	if($(this).text() == "") {
	    $(this).css("pointer-events", "none");
	}
        if(i < scrambled.length){
            $(this).html("<h1>" + scrambled[i++] + "</h1>");
	    $(this).css("pointer-events", "auto");
        }
    });

    $.each(pressed, function(index, value){
        $("#letterChoice" + value).css("opacity", 0.2);
    });
}

/* this function calls the database to return a random word given
the word length and difficulty(rarity).
 */
function getWordFromDictionary(size, diff){
    var word;
    
    $.ajax({
        async: false,
        type: 'GET',
        url: '../dictionary/get_word.php',
        data: {
            length: size,
            rank: diff,
        },
        success: function(response) {
            word = response;
        }
    });

    return word;
}

/* Creates a new Anagram game */
function generateAnagram(){
    var gameInfo = {
        type: "anagramGame",
        answer: "",
        data: [],
    };
    
    var diff;
    if(sec >= 54){
	diff = 10;
    } else {
	diff = 1 + Math.floor(sec / 6);
    }

    var selectedWord = getWordFromDictionary(difficulty + 2, diff);
    var lettersArray = selectedWord.split("");

    

    for(var i = lettersArray.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * lettersArray.length);
        var tmp = lettersArray[i];
        lettersArray[i] = lettersArray[j];
        lettersArray[j] = tmp;
    }

    gameInfo.answer = lettersArray.join("");
    return gameInfo;
}

