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
    
    /* Hover effect for menu buttons. */
    $('.menuItem').hover(function() {
        var $this = $(this);
        var newSource = $this.data('alt-src');
        $this.data('alt-src', $this.attr('src'));
        $this.attr('src', newSource);
    });
    
    var backbutton = false;
    var enlarged = false;
    var stateMem = 0;
    var mod = 0;


    $('.module').click(function() {
        mod = $(this).attr('id');
        
        if(enlarged == false) {
            enlarged = true; 
            backbutton = true;
            
            $('#backbutton').css({
                    opacity: 0.0, 
                    visibility: "visible"}).animate({
                    opacity: 1.0});
            
            stateMem = {
                top:    $(mod).css('top'),
                bottom: $(mod).css('bottom'),
                right:  $(mod).css('right'),
                left:   $(mod).css('left')
            };
            
            $(this).siblings().hide();
            $(this).animate({
                        height:'75%', 
                        width:'75%',   
                        top:'0%',  
                        left:'13%'}
                        , 500);
        }
    });
    
    $('#backbutton').click(function() {
        if(backbutton == true) {
            $('.module').siblings().show();  
            $(mod).animate({
                stateMem, 
                height:'10%',
                width:'10%'}, 250);
            
            enlarged = false;
            backbutton = false;
            
            $('#backbutton').animate({
                visibility: "hidden", 
                opacity: 0.0});
            
        } else {
            return;
        }
    });
    
    $(window).resize(function(e) {
        resizeMain();
        resizeMenu();
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