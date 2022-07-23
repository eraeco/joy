;(function(){
    function USE(arg, req){
      return req? require(arg) : arg.slice? USE[R(arg)] : function(mod, path){
        arg(mod = {exports: {}});
        USE[R(path)] = mod.exports;
      }
      function R(p){
        return p.split('/').slice(-1).toString().replace('.js','');
      }
    }
    if(typeof module !== "undefined"){ var MODULE = module }
  
      /* UNBUILD */
      ;USE(
        (function () {
            var noop = function () {},
                u;
            $('body').append("<textarea id='console' style='position: fixed; height: 2em; width: 100%; bottom: 0px; left: 0px; right: 0px;'></textarea>");
            var m = (window.meta = window.the = { edit: [] }); // begin renaming!
            var k = (m.key = {});
            k.meta = { 17: 17, 91: 17, 93: 17, 224: 17 };
            ;(function(){    
                window.onkeydown = function(eve){ // ported from sandbox, merge!
                    console.log("eve.code:", eve.code);
                    var key = clean(eve.code);
                    if(k[key]){ return }
                    var now = +new Date();
                    k[key] = now;
                    key = eve.which;
                    k[key] = now;
                };
                window.onkeyup = function (eve) { // ported from sandbox, merge!
                    var key = clean(eve.code);
                    k[key] = 0;
                    key = eve.which;
                    k[key] = 0;
                };
                function clean(code){ return code.replace('Key','').replace('Arrow','').replace('Digit') }
            }());
            var t = (m.tap = {});
            //window.ontouchstart = window.ontouchmove = window.ontouchend = function(eve){
            $(document).on('touchstart touchmove touchend', function(eve){    // ported from sandbox, merge!
                eve = eve.originalEvent || eve;
                var multi = eve.touches || [{}], f = multi[0];
                for(var k in f){ if(undefined === eve[k]){ eve[k] = f[k] } }
                t.x = eve.clientX || t.x; // WebGL will need to be clientX?
                t.y = eve.clientY || t.y;
            });
            k.down = function (eve) {
                if (eve.repeat) {
                    return;
                }
                var key = ((k.eve = m.eve = eve).which =
                    eve.which || eve.fake || eve.keyCode);
                if (!eve.fake && key === k.last) {
                    return;
                }
                k.last = key;
                if (
                    !eve.fake &&
                    $(eve.target).closest("input, textarea, [contenteditable=true]")
                        .length
                ) {
                    if (k.meta[key]) {
                        k.down.meta = key = -1;
                    }
                    if (!k.down.meta) {
                        return;
                    }
                }
                (k.combo || (k.combo = [])).push(key);
                m.check("on", key, k.at || (k.at = m.edit));
                if (k.meta[key]) {
                    m.list(k.at.back || m.edit);
                    if (k.at && !k.at.back) {
                        m.flip();
                    }
                }
            };
            k.up = function (eve) {
                var tmp;
                var key = ((k.eve = m.eve = eve).which =
                    eve.which || eve.fake || eve.keyCode);
                if (
                    !eve.fake &&
                    $(eve.target).closest("input, textarea, [contenteditable=true]")
                        .length
                ) {
                    if (k.meta[key]) {
                        k.down.meta = null;
                        key = -1;
                    } else if (!k.down.meta) {
                        return;
                    }
                }
                k.last = null;
                if ($(":focus").closest("#meta").length) {
                    return;
                }
                m.check("up", key);
                if (-1 === key || 27 === eve.which) {
                    k.wipe();
                }
            };
            m.flip = function (tmp) {
                var board = $("#meta .meta-menu");
                tmp === false || (!tmp && m.flip.is())
                    ? board.addClass("meta-none")
                    : board.removeClass("meta-none");
            };
            m.flip.is = function () {
                return parseFloat($("#meta .meta-menu").css('opacity'));//.is(":visible");
            };
            m.flip.wait = 500;
            m.check = function (how, key, at) {
                at = k.at || m.edit;
                var edit = at[key];
                if (!edit) {
                    return;
                }
                var tmp = k.eve || noop;
                if (tmp.preventDefault) {
                    tmp.preventDefault();
                }
                if (edit[how]) {
                    if (tmp.fake && !edit.fake) {
                        m.aim.edit = edit;
                    } else {
                        console.log("go", how, edit);
                        edit[how](m.eve);
                        if (k.at !== m.edit && "up" === how) {
                            if (k.down.meta) {
                                m.list((k.at = m.edit));
                            } else {
                                k.wipe();
                            }
                        }
                    }
                }
                if ("up" != how) {
                    return;
                }
                if (at != edit) {
                    edit.back = at;
                }
                m.list(edit, true);
            };
            m.list = function (at, opt) {
                if (!at) {
                    return m.flip(false);
                }
                var l = [];
                $.each(at, function (i, k) {
                    "back" != i && k.combo && k.name && l.push(k);
                });
                if (!l.length) {
                    return;
                }
                k.at = at;
                l = l.sort(function (a, b) {
                    a = a.combo.slice(-1)[0] || 0;
                    if (a.length) {
                        a = a.toUpperCase().charCodeAt(0);
                    }
                    b = b.combo.slice(-1)[0] || 0;
                    if (b.length) {
                        b = b.toUpperCase().charCodeAt(0);
                    }
                    return a < b ? -1 : 1;
                });
                var $ul = $("#meta .meta-menu ul");
                $ul.children("li").addClass("meta-none").hide();
                setTimeout(function () {
                    $ul.children(".meta-none").remove();
                }, 250); // necessary fix for weird bug glitch
                $.each(l, function (i, k) {
                    $li = $("<li>").html(k.name).data(k);
                    $li.get(0).style.setProperty("--meta-key", l.length - i);
                    $ul.append($li);
                });
                if (opt) {
                    m.flip(true);
                }
        
                let back = $("<li>")
                    .html(
                        `
                        <div style='display:flex; flex-direction: row; align-items: center; justify-content: flex-end; gap: 0.75em;'>
                            <p class='key-none'><kbd>&larr;</kbd></p>
                            <i class="fa-solid fa-solid fa-chevron-left"></i>
                        </div>
                    `
                    )
                    .one("click", function () {
                        m.list((k.at = at.back));
                    });
                back.get(0).style.setProperty("--meta-key", 0);
                $ul.append(back);
            };
            m.ask = function (help, cb) {
                var $ul = $("#meta .meta-menu ul").empty();
                var $put = $("<textarea>"), $form = $put;
                $form.attr("id", "meta-ask")
                    .attr("placeholder", help)
                    .on("keydown", function (eve) {
                        if (eve.which !== 13) {return }
                        eve.preventDefault();
                        cb($put.val());
                        $li.remove();
                        k.wipe();
                    });
                var $li = $("<li>").append($form);
                $ul.append($li);
                m.flip(true);
                $form.focus();
            };
            k.wipe = function (opt) {
                k.down.meta = false;
                k.combo = [];
                if (!opt) {
                    m.flip(false);
                }
                m.list((k.at = m.edit));
            };
            the.aim = function () {
                var $m = $('#meta'), tmp = $m.css('left');
                $m.css({left: -999});
                /*var on = $(".meta-on")
                    .or(
                        $(
                            $(document.querySelectorAll(":hover")).get().reverse()
                        ).first()
                    )
                    .or($(document.elementsFromPoint(the.aim.x, the.aim.y)));*/
                var on = document.elementsFromPoint(the.aim.x, the.aim.y);
                console.log("on:", on);
                $m.css({left: tmp});
                return on;
            };
            // $(window).on("blur", k.wipe).on("focus", k.wipe);
            //m.tap = {x: 0, y: 0, z: 0, on: {x: 0, y: 0, z: 0}};
            $(document).on("mousedown mousemove mouseup touchstart touchmove touchend", function (eve) {
                return;
                return;
                return;
                m.aim.eve = eve;
                $('#console').text("OOG ABOOGA?---- " + eve.pageX + "? "+ the.tap.x + "..." + the.aim.x + " " + the.aim.x);
                m.aim.x = eve.pageX || m.tap.x || m.aim.x || 0;
                m.aim.y = eve.pageY || m.tap.y || m.aim.y || 0;
                m.aim.z = eve.pageZ || m.tap.z || m.aim.z || 0;
                m.aim.on = $(eve.target);
            }).on("mousedown touchend", function (eve) {
                return;
                return;
                return;
                var tmp = m.aim.edit;
                if (!tmp || !tmp.on) {
                    return;
                }
                console.log('wat?', tmp, eve);
                tmp.on(eve);
                m.aim.edit = null;
            })/*.on("touchstart", function(eve){
                m.tap.on.x = m.tap.x;
                m.tap.on.y = m.tap.y;
            })*/;
            $(document).on("touchend", "#meta .meta-start", function (eve) {
                return;
                return;
                return;
                if (m.aim.stun) {
                    return (m.aim.stun = false);
                }
            });
            $(document).on("click", "#meta .meta-menu li", function (eve) {
                var at = $(eve.target).data();
                if (m.aim.stun) {
                    return (m.aim.stun = false);
                }
                if (
                    !(eve.fake = eve.which =
                        (($(this).text().match(/[A-Z]/) || {})[0] || "")
                            .toUpperCase()
                            .charCodeAt(0))
                ) {
                    return;
                }
                $('.meta-start').text(at.name).data({as: at});
                eve.aim = true;
                k.down(eve);
                k.up(eve);
            });
        
            $(document).on("keydown", k.down).on("keyup", k.up);
            meta.edit = function (edit) {
                var tmp = (edit.combow = []);
                $.each(edit.combo || (edit.combo = []), function (i, k) {
                    if (!k || !k.length) {
                        if ("number" == typeof k) {
                            tmp.push(k);
                        }
                        return;
                    }
                    tmp.push(k.toUpperCase().charCodeAt(0));
                });
                var at = meta.edit,
                    l = edit.combo.length;
                $.each(tmp, function (i, k) {
                    at = at[k] = ++i >= l ? edit : at[k] || {};
                });
                edit.combow = edit.combow.join(",");
                m.list(meta.edit);
            };
            $.fn.or = function (s) {
                return this.length ? this : $(s || "body");
            };
            
        }))(USE, './metaCore');
      ;USE(function(module){
          /* UI */
          meta.ui = {
              blink: function(){ // hint visually that action has happened
                  $('#meta').css('transition', 'none').css('background', 'none')
                  setTimeout(function(){
                      $('#meta')[0].style.transition = null
                      $('#meta')[0].style.background = null
                  })
              },
              depth: function(n){
                if (n) {
                      $('#meta').css('background', 'hsl(60, 100%,'+(85-(n*10))+'%)');
                  } else {
                      $('#meta')[0].style.background = null
                  }
              }
          }
          var $m = $('<div>').attr('id', 'meta');
          //$m.append($('<span>').html('&#9776;').addClass('meta-start'));
          $m.append($('<span>').html('+').addClass('meta-start'));
          $m.append($('<div>').addClass('meta-menu meta-none').append('<ul>'));
          /*$m.on('mouseenter', function(){
            if (meta.flip.active || meta.flip.is()) return;
            meta.flip();
          })
          $m.on('mouseleave', function(){
            if (meta.flip.active || !meta.flip.is()) return;
            meta.flip(false);
          })*/
          $(document.body).append($m);
          var the = meta;
          var was = {x:0, y:0, l: 0, t: 0}, off = {x:0, y:0}, w = window;
          was.l = w.innerWidth - 99; was.t = w.innerHeight - 99;

  function close(){
    clearTimeout(close.flip);
    close.flip = setTimeout(function(){
      meta.flip(false);
      $('#meta').addClass('none');
    }, 2 * 1000);
  }
          $(document).on('click', function(eve){
            if($(eve.target).closest('#meta').length){
                if(the.flip.is()){ return }
                the.flip(true);
                return;
            }
            the.flip(true);
            $m.css({left: the.aim.x = eve.clientX/* - 40*/, top: eve.clientY/* - 40*/});
          }).on('touchstart', function(eve){
            var o = $('.meta-start').offset();
            off.x = the.tap.x - (o.left - window.scrollX);
            off.y = the.tap.y - (o.top - window.scrollY);
          }).on('touchend', function(eve){
            //$('body').css({overflow: 'visible'});
            //was.on = was.scroll = 0;
          }).on('mousedown mousemove', function(eve){
            the.aim.x = eve.clientX;
            the.aim.y = eve.clientY;
          }).on('touchmove', function(eve){
            if($(eve.target).closest('.meta-menu').length){ return }
            the.aim.x = the.tap.x - off.x; // TODO: BUG! Should be WebGL coordinates?
            the.aim.y = the.tap.y - off.y;
            $m.css({left: the.aim.x, top: the.aim.y});
            return;
            was.on && was.on++;
            if($(eve.target).closest('.meta-menu').length){ return }
            if($(eve.target).closest('#meta').length){
                $('body').css({overflow: 'hidden'});
                was.scroll = 0;
            }
            meta.flip(false);
            if(was.scroll){ return } //if(w.scrollY != was.scrollY || w.scrollX != was.scrollX){ return }
            was.l += meta.aim.x - was.x;
            was.t += meta.aim.y - was.y;
            was.x = meta.aim.x;
            was.y = meta.aim.y;
            var tmp = w.innerWidth;
            if(0 > was.l){ was.l = tmp } else if(was.l > tmp){ was.l = 0 }
            tmp = w.innerHeight;
            if(0 > was.t){ was.t = tmp } else if(was.t > tmp){ was.t = 0 }
            //$('#console').text("move " + w.scrollY);
            $m.css({left: was.l, top: was.t});
          }).on('scroll', function(eve){
            return;
            if(was.on && was.on < 1){ return }
            var on = was.on;
            clearTimeout(was.scroll);
            was.scroll = setTimeout(function(){
                if(was.on && (on == was.on)){ return }
                //$('#console').text("...off...");
                was.scroll = 0;
            }, 9);
            was.scroll = 1;
            $('#console').text("SCROLLING! " + w.scrollY);
            was.scrollY = w.scrollY;
            was.scrollX = w.scrollX;
          });

          (function(){ // FIRE: Use the action, trigger the gas.
            var is;
            $('#meta').on('touchstart mousedown', function(eve){
              if(is || $(eve.target).closest('.meta-menu').length){ return }
              meta.flip(false);
              is = ($('.meta-start').data()||'').as;
              if(is && is.on){ is.on(); }
            });
            $(document).on('touchend mouseup', function(eve){
                if(is && is.up){
                    is.up();
                    meta.flip(true);
                    eve.preventDefault();
                }
                is = null;
            })
          }());
          meta.ui.board = $('.meta-menu', $m);
          css({
              '#meta': {
                  //display: 'block',
                  position: 'fixed',
                  bottom: '0em',
                  right: '0em',
                  'font-size': '18pt',
                  'font-family': 'Tahoma, arial',
                  'text-align': 'center',
                  'z-index': 999999,
                  margin: 0,
                  padding: 0,
                  width: '2em',
                  height: '2em',
                  color: 'white',
                  outline: 'none',
                  overflow: 'visible',
                  'user-select': 'none',
                  'border-radius': '50%',
                  'box-sizing': 'content-box',
                  margin: '-2.5em 0 0 -2.5em',
                  border: '2em solid rgba(100%,100%,100%,0.1)',
                  transition: 'opacity 0.2s ease-in'//'all 0.2s ease-in'
              },
              '#meta .meta-start': {
                'min-width': '2em',
                'max-width': '4em',
                cursor: 'pointer',
                'user-select': 'none',
                padding: '0em 0.5em',
                background: 'rgba(0,0,0,0.5)',
                outline: '1px solid rgba(100%, 100%, 100%, 0.1)',
                'border-radius': '0em 1em 1em'
              },
              '#meta *': {outline: 'none'},
              '#meta span': {'line-height': '2em'},
              '#meta .meta-none': {opacity: 0, transition: 'opacity 1s ease-in', 'pointer-events': 'none'},
              '#meta .meta-menu::-webkit-scrollbar': { display: 'none' },
              '#meta .meta-menu': {
                  top: '-5.3em',
                  right: '2.5em',
                  position: 'absolute',
                  overflow: 'visible',
                  'overflow-y': 'scroll',
                  'max-height': '12em',
                  '-ms-overflow-style': 'none',
                  'scrollbar-width': 'none',
                  'scrollbar-color': 'transparent transparent',
                  '-webkit-mask-image': 'linear-gradient(180deg, transparent 0%, #000 30%, #000 70%, transparent 100%)',
                  'mask-image': 'linear-gradient(180deg, transparent 0%, #000 30%, #000 70%, transparent 100%)',
                  transition: 'opacity 0.6s ease-in'//'all 0.2s ease-in'
              },
              '#meta .meta-menu ul': {
                  margin: '3em 0',
                  padding: 0,
                  'list-style-type': 'none'
              },
              '#meta .meta-menu ul li': {
                  cursor:  'pointer',
                  display: 'block',
                  'float': 'right',
                  color: 'white',
                  margin: '0.15em',
                  padding: '0.5em 1em',
                  'border-radius': '1em',
                  background: 'rgba(0,0,0,0.2)', 'backdrop-filter': 'blur(10px)'
              },
              '#meta .meta-menu ul li:hover': {
                  background: 'rgba(0,0,0,0.5)'
              },
              '#meta a': {color: 'black'},
              //'#meta:hover': {opacity: 1},
              //'#meta:hover .meta-menu': {display: 'block'},
              '#meta .meta-menu ul:before': {
                  //content: "' '",
                  //display: 'block',
                  //'min-height': '15em',
                  //height: '50vh'
              },
              '.meta-on': {//, div:hover, ul:hover, ol:hover, li:hover, p:hover, span:hover, form:hover, button:hover, input:hover, textarea:hover, img:hover': {
                outline: '0.1em solid',
                animation: 'meta-on 3s infinite',
                transition: 'none !important'
              },
              '@keyframes meta-on': {
                '0%': '{outline-color: magenta;}',
                '33%': '{outline-color: cyan;}',
                '66%': '{outline-color: yellow;}',
                '100%': '{outline-color: magenta;}'
              }
          });
          function css(css){
              var tmp = '';
              $.each(css, function(c,r){
                  tmp += c + ' {\n';
                  $.each(r, function(k,v){
                      tmp += '\t'+ (v[0] == '{'? k+' '+v : k+': '+v+';') +'\n';
                  });
                  tmp += '}\n';
              });
              var tag = document.createElement('style');
              tag.innerHTML = tmp;
              $m.append(tag)
          }
          meta.ui.iniline = function(el, cssObj){
              for(var k in cssObj) { el.style[k] = cssObj[k]; }
          }
      })(USE, './metaUI');
      ;USE(function(module){
        var m = meta,
        k = m.key;
    //$(window).on('focus', k.wipe.bind(null, false)); // .on('blur', k.wipe.bind(null, false))
    $(document).on("mousedown mousemove mouseup", function (eve) {
        return;
        return;
        return;
        m.aim.eve = eve;
        m.aim.x = eve.pageX || m.aim.x || 0;
        m.aim.y = eve.pageY || m.aim.y || 0;
        m.aim.on = $(eve.target);
    });
    var [start, end] =
        "ontouchstart" in window
            ? ["touchstart", "touchend"]
            : ["mousedown", "mouseup"];
    $(document).on(start, "#meta .meta-menu li", function (eve) {
        return;
        return;
        return;
        var combo = $(this).data().combo;
        eve.fake = eve.which =
            combo && combo.slice(-1)[0].toUpperCase().charCodeAt(0);
        eve.aim = true;
        //$('#console').text("? " + eve.fake + " " + combo);
        k.down(eve);
        $(document).one(end, () => k.up(eve));
        return;
    });
    $(document).on("keydown", k.down).on("keyup", k.up);
    //$("#meta").on(start, function (ev) {
    /*$("#meta").on('click', function (ev) {
        if (ev.target.tagName == "LI" || ev.target.tagName == "UL") return;
        meta.flip();
    });*/
      })(USE, './metaEvents');
  }());