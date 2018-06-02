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
          },500, function(){
            $(".console").slideDown(300, function(){
              $(".toolbar").slideDown(100, function(){
                $(".toolbar").animate({
                  width: "95%"
                })
              })
            })
          });
          });
        });
    });

    $(".red").click(function(){
      $(".console").slideUp(270, function(){
        $(".toolbar").slideUp(100)
      })
    })

    $(".yellow").click(function(){
      $(".console").slideUp(500, function(){
        $(".toolbar").animate({
          width: "75px"
        })
      })
    })

    $(".green").click(function(){
      $(".toolbar").animate({
        width: "95%"
      }, 500, function(){
        $(".console").slideDown()
      })
    })
});
