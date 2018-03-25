$(document).ready(function(){
    $(".projects").hide();
    
    $(".buttonProject").click(function(){
        $("#about").hide(0,function(){
          $(".projects").slideDown(1000);
        });
    });

    $(".buttonAbout").click(function(){
        $(".projects").slideUp(1000, function(){
          $("#about").show();
        });
    });
});
