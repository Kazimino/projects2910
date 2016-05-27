$(document).ready(function() { 
    /*QUnit test for the padding time function*/
    QUnit.test("Time Pad Test", function(assert) {
        var sec  = 1;
        var min  = 10;
        var sec1 = 10;
        var min1 = 1;
        
        assert.equal(pad(sec), 01,"padding test 1: pass");
        assert.equal(pad(min), 10,"padding test 2: pass");
        assert.notEqual(pad(sec1), 010, "padding test3: pass");
        assert.notEqual(pad(min1), 010, "padding test3: pass");
    });
    
    /*QUnit testing for endgame/activeArray function*/
    QUnit.test("endGame Test", function(assert) {
        var pos1 = 'top';
        var pos2 = 'bottom';
             
        assert.equal(activeArray, 0, "array1 pass");
        activeArray[0] = pos1;
        activeArray[1] = pos2;
        assert.equal(activeArray.length, 2, "array2 pass");
        
        endGame(pos2);
        endGame(pos1);
        assert.notEqual(activeArray.length, 1, "array3 pass");
    });
});




