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
                endGame(enlarged);

            } else {
                wrongAnswer();
                $('#anagramAnswer').html("<h1>" + "Try Again" + "</h1>");
                activeArray[enlarged].input = [];
                activeArray[enlarged].data = [];
                $('#anagramInput').html("<h1></h1>");
                setTimeout(function(){
                    $('.letterChoice').each(function(){
                        $(this).fadeTo("fast", 1);
                        $(this).css("pointer-events", "auto");
                    });
                    $('#anagramAnswer').html("<h1></h1>");
                }, 600);
            }

        }

    });
    $('#anagramInput').click(function(){
        $(this).html("<h1>" + $(this).text().slice(0, -1) + "</h1>");
        var lastPressed = activeArray[enlarged].data.pop();
        $("#letterChoice" + lastPressed).css("opacity", 1.0);
    })

});
/* this function takes in a word and checks if it exists in the dictionary.
Returns true if a match is found and false if there are no matches.
 */
function checkWord(word){
    /*
    return $.ajax({
        type: 'GET',
        url: '../dictionary/get_match.php',
        data: {word: word}
    });
    */
    var localWord = "doggy";
    return(word == localWord);
}

/*  this function loads the saved state of the game module */
function loadAnagram(){
    $('#anagramInput').html("<h1>" + activeArray[enlarged].input + "</h1>");
    var scrambled = activeArray[enlarged].answer.split("");
    var pressed = activeArray[enlarged].data;
    var i = 0;
    $('.letterChoice').each(function(){
        $(this).css("opacity", 1.0);
        if(i < scrambled.length){
            $(this).html("<h1>" + scrambled[i++] + "</h1>");
        }
    });

    $.each(pressed, function(index, value){
        $("#letterChoice" + value).css("opacity", 0.2);
    })
}

/* this function calls the database to return a random word given
the word length and difficulty(rarity).
 */
function getWordFromDictionary(size, difficulty){
/*
    return $.ajax({
        type: 'GET',
        url: '../dictionary/get_word.php',
        data: {length: size, rank: difficulty}
    });
*/
    /* test for local server: */
    return "doggy";
}

/* Creates a new Anagram game */
function generateAnagram(){
    var time = min;
    size = 3 + min;
    if(sec >= 54){
        difficulty = 10;
    } else {}
    difficulty = 1 + parseInt(sec / 6);
    var selectedWord = getWordFromDictionary(size, difficulty);

    var lettersArray = selectedWord.split("");

    

    for(var i = lettersArray.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * lettersArray.length);
        var tmp = lettersArray[i];
        lettersArray[i] = lettersArray[j];
        lettersArray[j] = tmp;
    }

    var scrambled = lettersArray.join("");
    return scrambled;
}

