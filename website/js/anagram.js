
$(document).ready(function() {
    $('.letterChoice').click(function() {
        var choiceID = $(this).attr('id');
        activeArray[enlarged].data.push(parseInt(choiceID[choiceID.length -1]));
        $('#anagramInput').html("<h1>" + $('#anagramInput').text() + $(this).text() + "</h1>");
        $('#anagramAnswer').html("<h1>" + activeArray[enlarged].answer[0] + "</h1>");
        $(this).fadeTo("fast", 0.2);
        activeArray[enlarged].input = $('#anagramInput').text();

        var a = activeArray[enlarged].answer[0];
        var b = $('#anagramInput').text();

        if(a.length == b.length){
            if(a == b){
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


function loadAnagram(){
    $('#anagramInput').html("<h1>" + activeArray[enlarged].input + "</h1>");
    $('#anagramAnswer').html("<h1>" + activeArray[enlarged].answer[0] + "</h1>");
    var scrambled = activeArray[enlarged].answer[1].split("");
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

/* Creates a new Anagram game */
function generateAnagram(){

    var wordsArray = ["can", "bar", "cat", "dog"];
    var wordSolution = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    var lettersArray = wordSolution.split("");

    for(var i = lettersArray.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * lettersArray.length);
        var tmp = lettersArray[i];
        lettersArray[i] = lettersArray[j];
        lettersArray[j] = tmp;
    }

    var scrambled = lettersArray.join("");
    return [wordSolution, scrambled];
}

