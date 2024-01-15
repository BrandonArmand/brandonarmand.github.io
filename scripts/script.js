var cmdHistory = []
var cmdHistoryIndex = 0

const cdList = [
    '<span class="code-snippet cd-projects-btn" style="margin-left: 20px; margin-bottom: 10px"><h5 class="text-highlight" style="color: orange; margin: 0;">projects</h5>/</span><br/>'
  , '<span class="code-snippet cd-about-btn" style="margin-left: 20px; margin-bottom: 10px""><h5 class="text-highlight" style="color: #bedbf3; margin: 0;">about</h5>/</span><br/>'
  , '<span class="code-snippet cd-contact-btn" style="margin-left: 20px; margin-bottom: 10px""><h5 class="text-highlight" style="color: #b0e6b8; margin: 0;">contact</h5>/</span><br/>']
const nodeList = [
    '<span class="code-snippet cd-welcome-btn" style="margin-left: 20px; margin-bottom: 10px""><h5 class="text-highlight" style="color: white; margin: 0;">welcome.js</h5></span><br/>'
  , '<span class="code-snippet cd-beep-btn" style="margin-left: 20px; margin-bottom: 10px""><h5 class="text-highlight" style="color: white; margin: 0;">beep.boop.js</h5></span><br/>'
  , '<span class="code-snippet cd-hire-btn" style="margin-left: 20px; margin-bottom: 10px""><h5 class="text-highlight" style="color: white; margin: 0;">hire-me.js</h5></span><br/>']

function setCmdButtons() {
    $('.help-btn').off('click')
    $('.ls-btn').off('click')
    $('.cd-btn').off('click')
    $('.history-btn').off('click')
    $('.why-btn').off('click')
    $('.clear-btn').off('click')
    $('.dynamic-history-btn').off('click')
    $('.cd-projects-btn').off('click')
    $('.cd-about-btn').off('click')
    $('.cd-contact-btn').off('click')
    $('.cd-welcome-btn').off('click')
    $('.cd-beep-btn').off('click')
    $('.node-btn').off('click')

    $('.help-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'help'
      fillInput(cmd)
    })
    $('.ls-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'ls'
      fillInput(cmd)
    })
    $('.cd-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'cd'
      fillInput(cmd)
    })
    $('.node-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'node'
      fillInput(cmd)
    })
    $('.history-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'history'
      fillInput(cmd)
    })
    $('.why-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'why'
      fillInput(cmd)
    })
    $('.clear-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'clear'
      fillInput(cmd)
    })
    $('.dynamic-history-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = $(this).html()
      fillInput(cmd)
    })
    $('.cd-projects-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'cd projects'
      fillInput(cmd)
    })
    $('.cd-about-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'cd about'
      fillInput(cmd)
    })
    $('.cd-contact-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'cd contact'
      fillInput(cmd)
    })
    $('.cd-welcome-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'node welcome.js'
      fillInput(cmd)
    })
    $('.cd-beep-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'node beep.boop.js'
      fillInput(cmd)
    })
    $('.cd-hire-btn').click(function () {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
      var cmd = 'node hire-me.js'
      fillInput(cmd)
    })
  }

function fillInput(command) {
    $('.input').html('')
    var i = 0;
    var interval = setInterval(function () {
      $('.input').append(command[i])
      i++
      if (i == command.length) {
        clearInterval(interval)
        setTimeout(function () {
          $('.input').trigger($.Event('keypress', { which: 13 }))
        }, Math.min(command.length * 100, 1000))
      }
    }, 100)
  }

$(document).ready(function () {
    var info = $('.my-info').clone()
    info.children().removeClass('delay-init')

    setCmdButtons()
    setTimeout(function () {
      $('#init-input').html('<span style="color:#74b2c7">\></span>')
    }, 2700);

    $(".projects").hide();

    $(".buttonProject").click(function () {
      $("#about").hide(0, function () {
        $(".projects").slideDown(1000, function () {
          $('html, body').animate({
            scrollTop: ($('#projects').offset().top)
          }, 500);
        });
      });
    });

    $(".buttonAbout").click(function () {
      $('.stack').html('')
      $(".projects").slideUp(1000, function () {
        $("#about").show(0, function () {
          $('html, body').animate({
            scrollTop: ($('#about').offset().top)
          }, 500, function () {
            $(".console").slideDown(300, function () {
              $(".toolbar").animate({
                width: "95%",
                marginLeft: "0",
                marginTop: "0",
                borderRadius: '0px',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px'
              }, 0, function () {
                $(".toolbar").slideDown();
              })
            })
          });
        });
      });
    }); 2

    $(".red").click(function () {
      $(".console").slideUp(270, function () {
        $(".toolbar").slideUp(100)
        $('.stack').html('')
      })
    })

    $(".yellow").click(function () {
      $(".console").slideUp(500, function () {
        $(".toolbar").animate({
          width: "75px",
          marginLeft: "80%",
          marginTop: "80vh",
          borderRadius: "50px"
        })
      })
    })

    $(".green").click(function () {
      $(".toolbar").animate({
        width: "95%",
        marginLeft: "0",
        marginTop: "0",
        borderRadius: '0px',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      }, 500, function () {
        $(".console").slideDown()
      })
    })

    $(document).on('keypress', function (e) {
      $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
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
        case 45:
          $('.input').append('-')
          break;
        // case backspace, handled in the index.html 
        case 8:
          $('.input').html($('.input').html().slice(0, -1))
          break;
        // up arrow
        case 13:
          cmdHistoryIndex = 0;
          cmdHistory.push($('.input').html())
          var command = (($('.input').html()).replace('&nbsp;', '')).replace(' ', '');

          $('.stack').append('<h3 class="commands display-4"><span style="color:#74b2c7">\></span> ' + $('.input').html() + '</h3>')
          var response = $('<h5 class="my-info"></h5>')
          if (command === 'node') {
            $('.stack').append($(`<h5 class="my-info">Usage: <span class="code-snippet node-btn">node [file]</span></h5>`))
            $('.stack').append($(`<h5 class="my-info">Script not found. Choose one below.</h5>`))
            nodeList.forEach(el => {
              $('.stack').append($(el))
            });
          }
          else if (command.includes('nodewelcome.js')) {
            $('.stack').append(info.clone());
          }
          else if (command.includes('nodebeep.boop.js')) {
            $('.stack').append($('<span class="my-info" style="whitespace: nowrap;"><span style="color: #bedbf3">└</span>[∵<span style="color: #bedbf3">┌</span>]<span style="color: #b0e6b8;">└</span>[ ∵ ]<span style="color: #b0e6b8;">┘</span>[<span style="color: orange">┐</span>∵]<span style="color: orange">┘</span></span>'))
          }
          else if (command.includes('nodehire-me.js')) {
            $('.stack').append($('<h5 class="my-info">Reach out to me via email: <a class="email" href="mailto:contact@brandonarmand.com">contact@brandonarmand.com</span></h5>'))
            $('.stack').append($('<h5 class="my-info">Let me know you got this prompt! 😎</h5>'))
          }
          else if (command.includes('history')) {
            for (var i = 0; i < cmdHistory.length; i++) {
              $('.stack').append($(`<p class="code-snippet dynamic-history-btn" style="margin-bottom: 10px; margin-left: 20px;">${cmdHistory[i]}</p><br/>`))
            }
          }
          else if (command == 'clear' || command == 'cls') {
            $('.stack').html('')
          }
          else if (command.includes('ls')) {
            cdList.forEach(el => {
              $('.stack').append($(el))
            });
            nodeList.forEach(el => {
              $('.stack').append($(el))
            });
          }
          else if (command === 'cd') {
            $('.stack').append($(`<h5 class="my-info">Usage: <span class="code-snippet cd-btn">cd [directory]</span></h5>`))
            $('.stack').append($(`<h5 class="my-info">Directory not found. Choose one below.</h5>`))
            cdList.forEach(el => {
              $('.stack').append($(el))
            });
          }
          else if (command.includes('cdprojects')) {
            $(".buttonProject").trigger('click')
            $('.stack').html('')
          }
          else if (command.includes('cdabout')) {
            $('.stack').append($(`<h5 class="my-info">You're already here!</h5>`))
          }
          else if (command.includes('cdcontact')) {
            window.location.href = 'contact.html'
          }
          else if ($('.input').html().includes('cd')) {
            var loc = $('.input').html().replace('cd ', '')
            $('.stack').append($(`<h5 class="my-info">${loc} not found</h5>`))
          }
          else if ($('.input').html().includes('help')) {
            $('.stack').append($('<h5 class="code-snippet" style="display: inline-flex; margin-left: 20px;"><span class="fa-solid fa-caret-up" style="color: whitesmoke;"></span></h5> / <h5 class="code-snippet" style="display: inline-flex;"><span class="fa-solid fa-caret-down" style="color: whitesmoke;"></span></h5><br/><h5 class="my-info"><span style="margin-left:25%;">Navigate up and down through the command history.</span></h5>'))
            $('.stack').append($('<h5 class="my-info"><span class="code-snippet ls-btn">ls</span>            <br/><span style="margin-left:25%;">Search nearby paths (pages).</span></h5>'))
            $('.stack').append($('<h5 class="my-info"><span class="code-snippet cd-btn">cd [directory]</span>            <br/><span style="margin-left:25%;">Navigate to directory (webpage).</span></h5>'))
            $('.stack').append($('<h5 class="my-info"><span class="code-snippet node-btn">node [file]</span>          <br/><span style="margin-left:25%;">Run (fake) .js script.</span></h5>'))
            $('.stack').append($('<h5 class="my-info"><span class="code-snippet clear-btn">cls</span> / <span class="code-snippet clear-btn">clear</span>   <br/><span style="margin-left:25%;">Clear terminal.</span></h5>'))
            $('.stack').append($('<h5 class="my-info"><span class="code-snippet help-btn">help</span>          <br/><span style="margin-left:25%; ">This.</span></h5>'))
            $('.stack').append($('<h5 class="my-info"><span class="code-snippet history-btn">history</span>       <br/><span style="margin-left:25%;">Show command history.</span></h5>'))
            $('.stack').append($('<h5 class="my-info"><span class="code-snippet why-btn">why</span>       <br/><span style="margin-left:25%;">Why I built this terminal. 🤔</span></h5>'))
          }
          else if ($('.input').html().includes('why')) {
            $('.stack').append($('<h5 class="my-info"><span class="text-highlight" style="color: orange">Why</span> have I built this terminal?</h5>'))
            $('.stack').append($('<h5 class="my-info">I honest to God have <span class="text-highlight loud-text" style="color: whitesmoke">no idea</span> why. It has been fun to build, but the code is ancient, and the longer I iterate, the messier it becomes lol.</h5>'))
            $('.stack').append($('<h5 class="my-info">The complexity of it\'s functionality is impressive though!</h5>'))
            $('.stack').append($('<span class="my-info" style="whitespace: nowrap;"><span style="color: #bedbf3">└</span>[∵<span style="color: #bedbf3">┌</span>]<span style="color: #b0e6b8;">└</span>[ ∵ ]<span style="color: #b0e6b8;">┘</span>[<span style="color: orange">┐</span>∵]<span style="color: orange">┘</span></span>'))
          }
          else {
            let command = $('.input').html();
            $('.stack').append($(`<h5 class="my-info">${command} not found.</h5>`))
          }
          $('.input').html('')
          $('.console').animate({ scrollTop: $('.console').prop("scrollHeight") }, 200);
          break;
        default:
          console.log(e.which) 
          break;
      }
      setCmdButtons()
    })
  });
