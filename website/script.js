$(document).ready(function() {
    function resizeMain() {
        $("main").width($("main").height());
        $("main").css("margin-top", $(window).height() / 2 - $("main").height() / 2);
        $("main").css("margin-left", $(window).width() / 2 - $("main").height() / 2);
    }
    resizeMain();
    
    function resizeMenu() {
        $(".menu").width($(".menu").height());
        $(".menu").css("margin-top", $(window).height() / 2 - $(".menu").height() / 2);
        $(".menu").css("margin-left", $(window).width() / 2 - $(".menu").height() / 2);
    }
    resizeMenu();
    
    $(window).resize(function(e) {
        resizeMain();
        resizeMenu();
    });
    
    /* To make sure everything works fine for clicking modules. */
    $("#module1").click(function() {
        window.alert("Module 1 clicked");
    });
    
    /* Hover effect for menu buttons. */
    $('.menuItem').hover(function() {
        var $this = $(this);
        var newSource = $this.data('alt-src');
        $this.data('alt-src', $this.attr('src'));
        $this.attr('src', newSource);
    });
    
});

/* At this current moment, all this does is fade from Menu to Game.
   used for onclick on PlayButton.*/
function playGame() {
    $(".menu").hide();
    
    $("footer").fadeIn(500, function() {
        $(this).css("display", "inline-block");
    });
    $("header").fadeIn(500, function() {
        $(this).css("display", "block");
    });
    $(".module").fadeIn(500, function() {
        $(this).css("display", "inline-block");
    });
}

var logoCount = 0;
function logoClick() {
    logoCount++;
}