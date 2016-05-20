/*global variables*/
var currIndex = 0;
var store = [];
var level = 0;
 var maxNumber = 0;
var baseNumber = 1;
/*takes in user input, compares with the store array*/
function numberInput() {
    $('.numberOption').click(function() {
            var choiceID = $(this).attr('id');
            if(choiceID == "numberSection" + (store[currIndex].pos + 1)) {
                /*hides the clicked button*/
                $(this).css("visibility", "hidden");
                if(currIndex == store.length -1 ) {
                    
                    endGame(enlarged);
                    /*shows the hidden buttons*/
                    $(".numberOption").css("visibility", "visible");
                    
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

}

/*generate random number and store into array*/
function randGen(level) { 
 resetStorage();
 numberInput();
 levelModifier(5);
 for (i = 0; i < 4; i++) {
     var num = {
         pos: 0,
         value: 0
     };
     if (level < 5) {
         do {
            num.value = Math.floor((Math.random() * maxNumber) + baseNumber);
          } while(store.indexOf(num.value) != -1);
         document.getElementsByClassName("number")[i].innerHTML = num;
     } else {
         var a = Math.floor((Math.random() * maxNumber) + baseNumber);
         var b = Math.floor((Math.random() * maxNumber) + baseNumber);
         num.value = a/b;
         var ab = (a + "/" + b);
         document.getElementsByClassName("number")[i].innerHTML = ab;
     }
     num.pos = i;
     store[i] = num;
 }
 /* sorts the numbers */
 store.sort(compareNumbers);
}

/*function to sort random gen number */
function compareNumbers(a,b) {
 return a.value - b.value;
}

/*function to unbind clicks */

function resetNumbersGame() {
    $(".numberOption").unbind("click");

}

/*function to reset global variables */
function resetStorage(store, currIndex) {
    this.store = [];
    this.currIndex = 0;
}

/*difficulty modifier*/
function levelModifier(level) {
    switch(level){
        case 1:
            maxNumber = 10;
            baseNumber = 1;
            break;
        case 2:
            maxNumber = 100;
            baseNumber = 1;
            break;
        case 3:
            maxNumber = 50;
            baseNumber = parseInt("-" + 50);
            break;
        case 4:
            maxNumber = 100;
            baseNumber = parseInt("-" + 100);
            break;
        case 5:
            maxNumber = 100;
            baseNumber = 1;
            break;
        }
}