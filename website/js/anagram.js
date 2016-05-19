
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
                $('#anagramAnswer').html("<h1>" + "You fucked up" + "</h1>");
                activeArray[enlarged].input = [];
                activeArray[enlarged].data = [];
                $('#anagramInput').html("<h1></h1>");
                setTimeout(function(){
                    $('.letterChoice').each(function(){
                        $(this).fadeTo("fast", 1);
                        $(this).css("pointer-events", "auto");
                    });
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

function checkWord(word){
    if(word == activeArray[enlarged].answer){
        return true;
    }
    return false;
}

function loadAnagram(){
    $('#anagramInput').html("<h1>" + activeArray[enlarged].input + "</h1>");
    $('#anagramAnswer').html("<h1>" + activeArray[enlarged].answer[0] + "</h1>");
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

function getWordFromDictionary(size, difficulty){

    return $.ajax({
        type: 'GET',
        url: '../dictionary/get_word.php',
        data: {length: size, rank: difficulty}
    });

    return "doggy";
}

/* Creates a new Anagram game */
function generateAnagram(){
    var size = 4;
    var difficulty = 4;
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

