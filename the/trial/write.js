;(function(){
  
  console.log("Hello Experiments! Do whatever you want in this folder or files!");
  
  function load(src, cb){
      var script = document.createElement('script');
      script.onload = cb; script.src = src;
      document.head.appendChild(script);
  }
  
  load('trial/jquery.js', () => {
    load('trial/meta.js', commands)
  })
  
  var sr = window.SecureRender;
  
  function commands() {
  
    var the = meta;
  
    meta.edit({
      name: "Tap",
      combo: ["T"],
      on: function () {
        console.log("Tap")
      }
    });
    meta.edit({
      name: "Art",
      combo: ["A"],
      on: function () {
        console.log("Art")
      }
    });
  
    function id(e){ e = $(e)[0]||''; return e._id || e.id }
  
    meta.edit({
      name: "Add",
      combo: ["A", "A"],
      up: function () {
        console.log("Add View");
        var aim = the.aim();
        console.log("---", aim);
        render.the({
          name: Math.random().toString(32).slice(2),
          size: [[250, '.'],[100, '.']],
          fill: [Math.random(), Math.random(), Math.random()],
          sort: [0.1, aim[0].name]
        });
      }
    })   
    meta.edit({
      name: "Turn",
      combo: ["A", "T"],
      on: function () {
        console.log("Turn");
        var cmd = this;
        cmd.box = the.aim()[0];
        var was = cmd.box.turn;
        var x = the.aim.x, y = the.aim.y;
        requestAnimationFrame(function frame(){
          $("#console").text("size: " + the.aim.x);
          if(!cmd.box){ return }
          requestAnimationFrame(frame);
          var w = the.aim.x - x;
          var h = the.aim.y - y;
          window.onmessage({data: [{name: cmd.box.name, turn: [was[0], was[1] + w, was[2]]}]});
        });
      },
      up: function(){
        this.box = false;
      }
    })     
    meta.edit({
      name: "Size",
      combo: ["A", "S"],
      on: function () {
        console.log("Size");
        var cmd = this;
        cmd.box = the.aim()[0];
        var was = cmd.box.size;
        var x = the.aim.x, y = the.aim.y;
        $("#console").text("size ", the.aim.x);
        requestAnimationFrame(function frame(){
          $("#console").text("size: " + the.aim.x);
          if(!cmd.box){ return }
          requestAnimationFrame(frame);
          var w = the.aim.x - x;
          var h = the.aim.y - y;
          window.onmessage({data: [{name: cmd.box.name, size: [[was[0][0] + w, '.'], [was[1][0] + h, '.']]}]});
        });
      },
      up: function(){
        this.box = false;
      }
    })   
    meta.edit({
      name: "Fill",
      combo: ["A", "F"],
      on: function () {
        console.log("Fill")
        var name = meta.aim()[0].name;
        if(!name){ return }
        window.onmessage({data: [{name: name, fill: [Math.random(), Math.random(), Math.random()]}]});
      }
    })
    meta.edit({
      name: "Grab",
      combo: ["A", "G"],
      on: function () {
        console.log("Grab")
        var name = meta.aim()[0].name;
        if(!name){ return }
        window.onmessage({data: [{name: name, grab: [Math.random(), Math.random(), Math.random()]}]});
      }
    })
  
    meta.edit({
      name: "Hear",
      combo: ["T", "H"],
  
    })
    meta.edit({
      name: "Say",
      combo: ["T", "S"],
  
    })
    meta.edit({
      name: "Look",
      combo: ["T", "L"],
  
    })
    meta.edit({
      combo: ["T", "G"]
    })
    meta.edit({
      name: "Hand",
      combo: ["T", "G","H"],
  
    })
    meta.edit({
      name: "Run",
      combo: ["T", "G","R"],
  
    })
    meta.edit({
      name: "Open",
      combo: ["T", "O"],
      on: function () {
        console.log("import");
        meta.ask("paste in code", function(data){
          console.log("paste", data);
          var c = esprima.parse(data);
          console.log("CODE:", c);
          render(c);
        })
      }
    })
  
  }
  
  
  
  
  
  
  
  
  load('trial/esprima.js', function(){
    //return;
  
  //document.body.style.background = '#000';
  //return;
  
  var code = `
  document.querySelector('#paste').style.color = 1`;
  /*
  var code = `
  a = function(m){
    var q = 9;
  }, b = 1;
  `;
  var code = `
  function z(m){
    var a = 1;
    let b = 2;
    var c = 3;
    let d = 4;
    var e = 5;
    let f = 6;
    var g = 7;
    let h = 8;
    var i = 9;
    let j = 10;
    var k = 11;
    let l = 12;
    var m = 13;
    let n = 14;
  }
  `;
  
  */
  var code = `
  document.querySelector(window.lol = '#paste').style.color = window.paste = window.document.body.querySelectorAll("#paste").value;
  `;
  
  
  
  var code = `document.querySelector('#paste').style.color = 1`;
  var code = `immediate = function(z){ var a = 1; }(2);`
  
  var code = `(function(z){
    var a, b = null;
    let c = false, d = true;
    const e = 0, f = 1, g = 1.5;
    wow = [1,[2],3];
  }(9, 8, 7, 6));`
  
  var code = `var z = function(a,b){ var m = 1, n = 2, o = 3; zap(w,u,v); b * 3; }`
  /*
  var code = `let u, a = 1, b = 3;`
  
  
  var code = `
  var a = setTimeout(window.document.body.querySelector('#paste').value = function(){
    var z = 1;
    var m = 'hello', n = 'world';
  }, 9, "cool beans", 42);
  `;
  
  var code = `
  a = 1 || 2 || 3;
  `;*/
  
  var ast = esprima.parse(code);
  console.log(ast);
  render(ast);
  
  setTimeout(function(){ $('#console').text(code).css({top: 0, left: 0, right: 0, height: '9em', bottom: 'none', 'text-align': 'left'}) },999);
  
  });
  
  var w = window;
  function render(ast){
    if(!ast){ return }
    //debugger;
    if(ast.body){
      if(ast.id){ // named function, convert to left/right:
        render.act(ast);
        return;
      }
      ast.up = ast.up || '';
      ast.$id = ast.$id || render.id(ast);
      if(!ast.up){
        //render.the({name: ast.$id, fill: [1,1,1,0]});
        render.the({
          name: ast.$id+'-start',
          size: [[1,'~'],[1,'~']],
          sort: [0.1, ast.up.$id]
        }).the({ // make label
          name: ast.$id+'-start-text',
          sort: [0.1, ast.$id+'-start'],
          fill: "on start:",
        });
      }
      render.the({ // make view
        name: ast.$id,
        size: [[1,'~'],[1,'~']],
        sort: [0.1, ast.up.$id],
        fill: ast.up? render.fill(ast) : undefined
      });
  
      if(ast.up.params || ast.params){ // treat parameters as first line.
        render.list(ast, ast.up.params || ast.params, '(', ',', ');');
      }
      render.list(ast, ast.body.body || ast.body, '', ';', ';');
      return;
    }
    if(ast.declarations || ast.expressions || ast.elements){
  
      ast.up = ast.up || '';
      ast.$id = ast.$id || render.id(ast);
  
      render.list(ast, ast.declarations||ast.expressions||ast.elements);
      return;
    }
    if(ast.test){
      //render.list(ast, );
      return;
    }
    /*if(ast.elements){
      ast.$id = ast.$id || Math.random().toString(32).slice(2);
      render.the({ // make view
        name: ast.$id,
        size: [[1,'~'],[1,'~']],
        sort: [0.1, ast.up.$id]
      });
      render.list(ast, ast.elements);
      return;
    }*/
    render.act(ast);
  }
  
  render.act = function(ast){
    if(!ast){ return }
  
    //if(ast.raw){ // end!
    if(ast.raw || 'Identifier' == ast.type){ // end!
      ast.$id = ast.$id || Math.random().toString(32).slice(2);
      render.the({ // make view
        name: ast.$id,
        fill: render.fill(ast),
        sort: [0.1, ast.up.$id]
      }).the({
        name: ast.$id+'-text',
        sort: [0.1, ast.$id],
        fill: ast.raw || ast.name,
      });
      return;
    }
  
    var act, tmp;
    if(ast.left && ast.right){
      act = ast;
    } else
    if(ast.expression){
      ast.expression.back = ast;
      act = ast = ast.expression;
    } else
    if(ast.params){
      ast.body.up = ast;
      act = {left:{property: ast.id}, operator: "=", right: ast.body};
    } else
    if("VariableDeclaration" == ast.type || "VariableDeclarator" == ast.type){
      act = {left:{property: ast.id}, operator: "=", right: ast.callee || ast.init || ast};
    } else
    if(ast.callee){
      ast.callee.back = ast;
      // ast.callee.up = ast.up;
      /*if(ast.body){ // anon functions
        ast.body.up = ast;
      }*/
      act = {left: ast.body || ast.callee, operator: ''/* || String.fromCharCode(8595)*/, right: ast.arguments};
      //ast = ast.callee; // is this buggy for path?
    }
    ast.up = ast.up || '';
    ast.$id = ast.$id || Math.random().toString(32).slice(2);
    // Call everything to the left first...
    var left = act.left, a = {object: left}, path = [];
    while(a = a.object){
      if(a.callee){ a.up = ast; render(a) } // BUG? a.up = a_.up???
      path.push((a.property||'').name||a.name||'');
    }
    path = path.reverse();
    //if(path.length > 3){ path = [path[0], String.fromCharCode(8230)].concat(path.slice(-2)) } // FEATURE!
  
    render.the({ // make view
      name: ast.$id,
      fill: render.fill(ast),
      sort: [0.1, ast.up.$id]
    });
    
    render.side(left, ast, path, 'left');
    /*if(left.body){
  
      left.up = left.up || ast;
      left.$id = left.$id || Math.random().toString(32).slice(2);
      render.the({
        name: left.$id,
        sort: [0.1, left.up.$id],
        fill: render.fill(left)
      });
      render(left);
  
    } else
    if(left.operator){
      console.log("---------");
      left.up = left.up || ast;
      render.act(left);
    } else {
      console.log("LEFT:", left, path, act);
      render.the({ // LEFT
        name: ast.$id+'-left',
        sort: [0.1, ast.$id]
      }).the({
        name: ast.$id+'-left-text',
        sort: [0.1, ast.$id+'-left'],
        fill: path.join(" . ") || left.raw || left.name
      });
  
    }*/
    
    //act.operator = ('=' == act.operator? ':' : act.operator);
    if(act.operator){
     //if(act.operator == '||'){ act.op = 'or' } 
    }
    act.operator && render.the({ // ACT
      name: ast.$id+'-act',
      sort: [0.1, ast.$id]
    }).the({
      name: ast.$id+'-act-text',
      sort: [0.1, ast.$id+'-act'],
      fill: act.op || act.operator || '',
    });
  
    var right = act.right;
    right.up = right.up || ast;
    a = {object: right};
    path = [];
    while(a = a.object){
      if(a.callee){ a.up = ast; render(a) }
      path.push((a.property||'').name||a.name||'');
    }
    path = path.reverse();
  
    render.side(right, ast, path);
    /*if(right.params){
      render.act(ast, right.params)
    }
    if(right.arguments){
      render.act(ast, right.arguments)
    }*/
  }
  render.side = function(right, ast, path, t){
     if(right.raw || 'Identifier' == right.type){
      render.the({
        name: ast.$id+'-'+(t||'right'),
        sort: [0.1, ast.$id]
      }).the({
        name: ast.$id+'-'+(t||right)+'-text',
        sort: [0.1, ast.$id+'-'+(t||'right')],
        fill: right.raw || right.name || '?'
      });
    } else 
    if(right.property){
      render.the({ // RIGHT
        name: ast.$id+'-'+(t||'right'),
        sort: [0.1, ast.$id]
      }).the({
        name: ast.$id+'-'+(t||'right')+'-text',
        sort: [0.1, ast.$id+'-'+(t||'right')],
        fill: path.join(" . ")
      });
    } else
    if(right instanceof Array){
      render.list(ast, right, '(', ',', ')');
    } else
    if(right.callee || right.operator){
      right.up = ast;
      render(right);
    } else
    if(right.body){
      right.up = right.up || ast;
      right.$id = right.$id || Math.random().toString(32).slice(2);
      render.the({ // RIGHT
        name: right.$id,
        sort: [0.1, right.up.$id],
        fill: render.fill(right)
      });
      render(right);
    } else 
    if(right.elements){
      render.the({ // make view
        name: right.$id = right.$id || render.id(right),
        sort: [0.1, ast.$id]
      });
      render.list(right, right.elements);
    }
  }
  
  render.list = function(ast, steps, s, b, e){
   
    if(ast.elements){ s = '[', b = ',', e = ']' }
    if(ast.expression){ s = '', b = ',', e = '' }
    if(ast.declarations){ s = ast.kind, b = ',', e = '' }
    //if(ast.params){ s = '<', b = '&', e = '>' }
  
    console.log("???", s,b,e, ast.$id);
    var id = render.id();
    if(s){
      render.the({ // ACT
        name: id,
        sort: [0.1, ast.$id],
      }).the({
        name: id+'-text',
        sort: [0.1, id],
        fill: s
      });
    }
  
    (steps||[]).forEach(function(a, i){
  
      i && render.the({
        name: id+'-'+i,
        sort: [0.1, ast.$id],
        fill: b || ""
      });
  
      if(a.expression){
        a.expression.back = a;
        a = a.expression; // use the expression, if available.
      }
  
      a.up = ast;
      render.the({
        name: a.$id = a.$id || render.id(a),
        size: [[1,'~'],[1,'~']],
        sort: [0.1, ast.$id]
      });
      render(a);
  
      return; // MARK TEMP???
  
      /*v.$id = v.$id || Math.random().toString(32).slice(2);
      render.the({ // make view
        name: v.$id,
        size: [[1,'~'],[1,'~']],
        fill: render.fill(ast),
        sort: [0.1, ast.$id]
      });
  
      render.the({
        name: v.$id+'-left',
        sort: [0.1, v.$id]
      }).the({
        name: v.$id+'-left-text',
        sort: [0.1, v.$id+'-left'],
        fill: (v.id||'').name || v.name || v.raw || "?"
      });*/
  
      if(ast.params || (ast.up||'').params){
  
        render.the({
          name: a.$id+'-act',
          sort: [0.1, a.$id]
        }).the({
          name: a.$id+'-act-text',
          sort: [0.1, a.$id+'-act'],
          fill: "="
        });
  
        render.the({
          name: a.$id+'-right',
          sort: [0.1, a.$id]
        }).the({
          name: a.$id+'-right-text',
          sort: [0.1, a.$id+'-right'],
          fill: (a.init||'').raw || '?'
        });
  
        if((a.init||'').body){ // TODO: BUGS???
          render.the({name: a.$id +'-right-text', fill: String.fromCharCode(8595)});
          a.init.body.up = v;
          render(a.init.body);
        }
        if((a.init||'').arguments){
          render.ask(v, a.init.arguments)
        }
      }
    });
  
    if(e){
      console.log("???--", ast.$id, s,b,e);  
      render.the({ // ACT
        name: id+'-end',
        sort: [0.1, ast.$id],
      }).the({
        name: id+'-end-text',
        sort: [0.1, id+'-end'],
        fill: e
      });
    }
  }
  
  render.ask = function(v, args){
    console.log("????????????????????");
  
    var p = render.path(v.init.callee, 3);
    render.the({name: v.$id +'-is-text', fill: p.join("'s ")});
  
    render.the({
      name: v.$id +'-acting-as',
      fill: String.fromCharCode(8592),
      sort: [0.1, v.$id]
    });
    args.forEach(function(a, i){
  
      a.$id = a.$id || Math.random().toString(32).slice(2);
      render.the({
        name: a.$id,
        fill: [Math.random(), Math.random(), Math.random()],
        sort: [0.1, v.$id]
      }).the({
        name: a.$id+'-text',
        fill: a.raw || '?',
        sort: [0.1, a.$id]
      });
      if(a.body){
        render.the({
          name: a.$id +'-text',
          //size: [[100,'%'],[1,'~']],
          size: [[1,'~'],[1,'~']],
          fill: String.fromCharCode(8595)
        }).the({
          name: a.$id +'-text-',
          fill: "",
          sort: [1,a.$id +'-text']
        });
        a.body.up = a;
        render(a.body);
      }
  
      render.the({
        name: v.$id +'-acting-'+i,
        fill: String.fromCharCode(8592),
        sort: [0.1, v.$id]
      });
    });
  }
  render.fill = function(ast){
    return [Math.random()-0.2, Math.random()-0.2, Math.random()-0.2];
  }
  render.id = function(ast) {
    return Math.random().toString(32).slice(2);
  }
  render.the = function(o){
    window.onmessage({data:[o]});
    return render;
  }
  
  }());