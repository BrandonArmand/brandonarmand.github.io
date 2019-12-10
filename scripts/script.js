$(document).ready(function(){
    var info = $('.my-info').clone()
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
              $(".toolbar").animate({
                width: "95%",
                marginLeft: "0",
                marginTop: "0",
                borderRadius: '0px',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px'
              }, 0 , function(){
                $(".toolbar").slideDown();
              })
            })
          });
          });
        });
    });2

    $(".red").click(function(){
      $(".console").slideUp(270, function(){
        $(".toolbar").slideUp(100)
        $('.stack').html('')
      })
    })

    $(".yellow").click(function(){
      $(".console").slideUp(500, function(){
        $(".toolbar").animate({
          width: "75px",
          marginLeft: "80%",
          marginTop: "80vh",
          borderRadius: "50px"
        })
      })
    })

    $(".green").click(function(){
      $(".toolbar").animate({
        width: "95%",
        marginLeft: "0",
        marginTop: "0",
        borderRadius: '0px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      }, 500, function(){
        $(".console").slideDown()
      })
    })

  $(document).on('keypress', function(e){
    console.log(e)
    switch (e.which) {
      case 113:
        $('.input').append('<span>q</span>')
        break;
      case 101:
        $('.input').append('e')
        break;
      case 114:
        $('.input').append('r')
        break;
      case 115:
        $('.input').append('s')
        break;
      case 116:
        $('.input').append('t')
        break;
      case 117:
        $('.input').append('u')
        break;
      case 118:
        $('.input').append('v')
        break;
      case 119:
        $('.input').append('w')
        break;
      case 120:
        $('.input').append('x')
        break;
      case 121:
        $('.input').append('y')
        break;
      case 122:
        $('.input').append('z')
        break;
      case 97:
        $('.input').append('a')
        break;
      case 98:
        $('.input').append('b')
        break;
      case 99:
        $('.input').append('c')
        break;
      case 100:
        $('.input').append('d')
        break;
      case 102:
        $('.input').append('f')
        break;
      case 103:
        $('.input').append('g')
        break;
      case 104:
        $('.input').append('h')
        break;
      case 105:
        $('.input').append('i')
        break;
      case 106:
        $('.input').append('j')
        break;
      case 107:
        $('.input').append('k')
        break;
      case 108:
        $('.input').append('l')
        break;
      case 109:
        $('.input').append('m')
        break;
      case 110:
        $('.input').append('n')
        break;
      case 111:
        $('.input').append('o')
        break;
      case 112:
        $('.input').append('p')
        break;
      case 95:
        $('.input').append('_')
        break;
      case 46:
        $('.input').append('.')
        break;
      case 32:
        $('.input').append(' ')
        break;
      case 13:
        $('.stack').append('<h3 class="commands display-4">$ ' + $('.input').html() + '</h3>')
        var response = $('<h5 class="my-info"></h5>')
        if($('.input').html().includes('node welcome.js')){
          $('.stack').append(info);
        }
        else if($('.input').html() == 'clear' || $('.input').html() == 'cls' ){
          $('.stack').html('')
        }
        else if($('.input').html().includes('ls')){
          $('.stack').append($('<h5 class="my-info">projects</h5>'))
          $('.stack').append($('<h5 class="my-info">about</h5>'))
          $('.stack').append($('<h5 class="my-info">resume</h5>'))
          $('.stack').append($('<h5 class="my-info">contact</h5>'))
        }
        else if($('.input').html().includes('cd projects')){
          $(".buttonProject").trigger('click')
        }
        else if($('.input').html().includes('cd resume')){
          window.location.href = 'resume.pdf'
        }
        else if($('.input').html().includes('cd contact')){
          window.location.href = 'contact.html'
        }
        else if($('.input').html().includes('cd')){
          var loc = $('.input').html().replace('cd ','')
          $('.stack').append($(`<h5 class="my-info">${loc} not found</h5>`))
        }
        else if($('.input').html().includes('help')){
          $('.stack').append($('<h5 class="my-info">ls            <br/><span style="margin-left:25%; white-space: nowrap;">- Search nearby path locations.</span></h5>'))
          $('.stack').append($('<h5 class="my-info">cd            <br/><span style="margin-left:25%; white-space: nowrap;">- Move towards next path.</span></h5>'))
          $('.stack').append($('<h5 class="my-info">node          <br/><span style="margin-left:25%; white-space: nowrap;">- Run Node script.</span></h5>'))
          $('.stack').append($('<h5 class="my-info">cls / clear   <br/><span style="margin-left:25%; white-space: nowrap;">- Clear terminal.</span></h5>'))
          $('.stack').append($('<h5 class="my-info">help          <br/><span style="margin-left:25%; white-space: nowrap;">- Help.</span></h5>'))

        }
        $('.input').html('')
        $('.console').animate({ scrollTop: $('.console').prop("scrollHeight")}, 200);
        break;
      default:
        break;
    }
  })
});
