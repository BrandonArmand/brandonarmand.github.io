$(document).ready(function(){
    $(".projects").hide();

    $(".buttonProject").click(function(){
        $("#about").hide(0,function(){
          $(".projects").slideDown(1000, function(){
            $('html, body').animate({
              scrollTop: ($('#projects').offset().top)
          },500);
          });
        });
    });

    $(".buttonAbout").click(function(){
        $(".projects").slideUp(1000, function(){
          $("#about").show(0, function(){
            $('html, body').animate({
              scrollTop: ($('#about').offset().top)
          },500);
          });
        });
    });
});
