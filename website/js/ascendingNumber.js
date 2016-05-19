
var currIndex = 0;
var store = [];
function numberInput() {
//$(document).ready(function() {
//    
    $('.numberOption').click(function() {
            var clickValue = parseInt($(this).text());
            var choiceID = $(this).attr('id');
        /*added this*/
          
        /*up to here*/
            if(clickValue == store[currIndex]) {
                $(this).css("opacity", 0);
                if(currIndex == store.length -1 ) {
                    
                    endGame(enlarged);
                    $(".numberOption").css("opacity", 100);
                    resetNumbersGame();
                    resetStorage();
                  
                }
                currIndex++;
                return;
            } else {
                wrongAnswer();
                return;
            }
        }
    )
//});
}

/*generate random number and store into array*/
function randGen() {
 var baseNumber = 1;
 var maxNumber = 100;
 var number = 0;
 resetStorage();
 numberInput();
    
 for (i = 0; i < 4; i++) {
  do {
   number = Math.floor((Math.random() * maxNumber) + baseNumber);
  } while(store.indexOf(number) != -1);

  store[i] = number;
      document.getElementsByClassName("numberOption")[i].innerHTML = number;
 }
 /* sorts the numbers */
 store.sort(compareNumbers);
}

/* function to hide each circle on click upon correct */

/*function to sort random gen number */
function compareNumbers(a,b) {
 return a - b;
}

/*function to compare answer */

function resetNumbersGame() {
    $(".numberOption").unbind("click");

}


function resetStorage() {
    store = [];
    currIndex = 0;
}