$(document).ready(function() {
    function resizeMain() {
        $("main").width($("main").height());
        $("main").css("margin-top", $(window).height() / 2 - $("main").height() / 2);
        $("main").css("margin-left", $(window).width() / 2 - $("main").height() / 2);
    }
    resizeMain();
    
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
						
			/*fades the minigauge in when module is expanded*/
            $('.minigauge').fadeIn(2000);
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
	
    	/*animates the clicked minigauge to the front*/
    $('.miniModule').click(function() {
        var hexNum;
        $('.module').hide();
    
        
        $(this).siblings().hide();
        
        
        $('.hexagon-in2').animate({top:'30%', left:'5%'}, 500);
        $('.hexagon-in2').animate({height:'90%', width:'75%'}, 750);

      
    });
    
    
    $(window).resize(function(e) {
        resizeMain();
    });
});