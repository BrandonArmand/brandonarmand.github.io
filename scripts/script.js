$(document).ready(function(){
    var info = $('.my-info').clone()
    // remove the class 'delay-init' from the child div of info
    info.children().removeClass('delay-init')
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
      $('.stack').html('')
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
        $('.input').append('&nbsp;')
        break;
      case 47:
        $('.input').append('/')
        break;
      case 58:
        $('.input').append(':')
        break;
      case 59:
        $('.input').append(';')
        break;
      case 60:
        $('.input').append('<')
        break;
      case 61:
        $('.input').append('=')
        break;
      case 62:
        $('.input').append('>')
        break;
      case 63:
        $('.input').append('?')
        break;
      case 64:
        $('.input').append('@')
        break;
      case 91:
        $('.input').append('[')
        break;
      case 92:
        $('.input').append('\\')
        break;
      case 93:
        $('.input').append(']')
        break;
      // case backspace, handled in the index.html 
      case 8:
        $('.input').html($('.input').html().slice(0, -1))
        break;
      case 13:
        $('.stack').append('<h3 class="commands display-4">$ ' + $('.input').html() + '</h3>')
        var response = $('<h5 class="my-info"></h5>')
        if($('.input').html().includes('node&nbsp;welcome.js')){
          $('.stack').append(info.clone());
        }
        else if($('.input').html() == 'clear' || $('.input').html() == 'cls' ){
          $('.stack').html('')
        }
        else if($('.input').html().includes('ls')){
          $('.stack').append($('<span class="code-snippet" style="margin-left: 20px; margin-bottom: 10px"><h5 class="text-highlight" style="color: orange; margin: 0;">projects</h5>/</span><br/>'))
          $('.stack').append($('<span class="code-snippet" style="margin-left: 20px; margin-bottom: 10px""><h5 class="text-highlight" style="color: #bedbf3; margin: 0;">about</h5>/</span><br/>'))
          $('.stack').append($('<span class="code-snippet" style="margin-left: 20px; margin-bottom: 10px""><h5 class="text-highlight" style="color: #b0e6b8; margin: 0;">contact</h5>/</span><br/>'))
          $('.stack').append($('<span class="code-snippet" style="margin-left: 20px; margin-bottom: 10px""><h5 class="text-highlight" style="color: white; margin: 0;">welcome.js</h5></span><br/>'))
        }
        else if($('.input').html().includes('cd&nbsp;projects')){
          $(".buttonProject").trigger('click')
          $('.stack').html('')
        }
        else if($('.input').html().includes('cd&nbsp;about')){
          $('.stack').append($(`<h5 class="my-info">You're already here!</h5>`))
        }
        else if($('.input').html().includes('cd&nbsp;contact')){
          window.location.href = 'contact.html'
        }
        else if($('.input').html().includes('cd')){
          var loc = $('.input').html().replace('cd ','')
          $('.stack').append($(`<h5 class="my-info">${loc} not found</h5>`))
        }
        else if($('.input').html().includes('help')){
          $('.stack').append($('<h5 class="my-info"><span class="code-snippet">ls</span>            <br/><span style="margin-left:25%; white-space: nowrap;">Search nearby paths (pages).</span></h5>'))
          $('.stack').append($('<h5 class="my-info"><span class="code-snippet">cd</span>            <br/><span style="margin-left:25%; white-space: nowrap;">Move towards next path (page).</span></h5>'))
          $('.stack').append($('<h5 class="my-info"><span class="code-snippet">node</span>          <br/><span style="margin-left:25%; white-space: nowrap;">Run (fake) Node script.</span></h5>'))
          $('.stack').append($('<h5 class="my-info"><span class="code-snippet">cls</span> / <span class="code-snippet">clear</span>   <br/><span style="margin-left:25%; white-space: nowrap;">Clear terminal.</span></h5>'))
          $('.stack').append($('<h5 class="my-info"><span class="code-snippet">help</span>          <br/><span style="margin-left:25%; white-space: nowrap;">This.</span></h5>'))

        }
        else {
          let command = $('.input').html();
          $('.stack').append($(`<h5 class="my-info">${command} not found.</h5>`))
        }
        $('.input').html('')
        $('.console').animate({ scrollTop: $('.console').prop("scrollHeight")}, 200);
        break;
      default:
        break;
    }
  })
});
