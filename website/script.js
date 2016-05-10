$(document).ready(function() {
    function resizeMain() {
        $("main").width($("main").height());
        $("main").css("margin-top", $(window).height() / 2 - $("main").height() / 2);
        $("main").css("margin-left", $(window).width() / 2 - $("main").height() / 2);
    }
    resizeMain();
    
    
    $(window).resize(function(e) {
        resizeMain();
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
    $(".menu").fadeOut(300, function() {
        $(this).css("display", "none");
    });
    
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