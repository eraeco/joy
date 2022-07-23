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
load('trial/esprima.js');

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
      window.onmessage({data:[{
        name: Math.random().toString(32).slice(2),
        size: [[250, '.'],[100, '.']],
        fill: [Math.random(), Math.random(), Math.random()],
        sort: [0.1, aim[0].name]
      }]})
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

function render(ast){
  return;
  console.log(ast);
  if(ast.body){
    ast.name = ast.name || (ast.id||'').name || Math.random().toString().slice(2);
    window.onmessage({data:[{
      name: ast.name,
      size: [[1,'~'],[1,'~']],
      fill: [Math.random(), Math.random(), Math.random()],
      sort: [0.1, (ast.up||'').name]
    }]});
    var i = 0;
    ast.body.forEach(function(a){
      a.up = ast;
      a.step = ++i;
      render(a);
    });
  }
  if(ast.declarations){
    (ast.up = ast.up || {}).scope = ast.up.scope || {};

    window.onmessage({data:[{
      name: path(ast.up) ,
      size: [[1,'~'],[1,'~']],
      fill: [Math.random(), Math.random(), Math.random()],
      sort: [0.1, path(ast.up)]
    }]});

    ast.declarations.forEach(function(v){  
      var name = (v.id||'').name;
      var is = v.init;
      ast.up.scope[name] = is;

      window.onmessage({data:[{
        name: ast.name,
        size: [[1,'~'],[1,'~']],
        fill: [Math.random(), Math.random(), Math.random()],
        sort: [0.1, (ast.up||'').name]
      }]});
    })
  }
  if((ast.expression||'').operator === '='){
    (ast.up = ast.up || {}).scope = ast.up.scope || {};
  }
  //ast.be = ((ast.expression||'').operator === '=' && ast.expression.right) || 
  /*if(name){
    window.onmessage({data:[{
      name: name,
      size: [[1,'~'],[1,'~']],
      fill: [Math.random(), Math.random(), Math.random()],
      sort: [0.1, render?.up?.id?.name || 'SecureRender']
    }]});
    var label = name;
    if("FunctionDeclaration" == ast.type){
      render.up = ast;
      label += " : ";
    }
    window.onmessage({data:[{
      name: name + '_name',
      fill: label,
      sort: [0.1, name]
    }]});
  }*/
  //render.up = ast;
  //each(ast.params, render);
  //each(ast.declarations, render);
}
function render(ast){
  var name = path(ast);
  ast.up = ast.up || '';
  ast.$id = ast.$id || Math.random().toString(32).slice(2);
  if(ast.body){
    window.onmessage({data:[{ // make container
      name: ast.$id,
      size: [[100,'%'],[1,'~']],
      fill: [Math.random(), Math.random(), Math.random()],
      sort: [0.1, ast.up.$id]
    }]});
    window.onmessage({data:[{ // make label
      name: ast.$id +'-label',
      size: [[100,'%'],[1,'~']],
      sort: [0.1, ast.$id]
    }]});
    window.onmessage({data:[{ // make label
      name: ast.$id +'-label-go',
      fill: "on start:",
      sort: [0.1, ast.$id+'-label']
    }]});
    ast.body.forEach(function(a){
      a.up = ast;
      render(a);
    })
  }
  if(ast.declarations){
    window.onmessage({data:[{ // make container
      name: ast.$id,
      size: [[100,'%'],[1,'~']],
      sort: [0.1, ast.up.$id]
    }]});
    window.onmessage({data:[{ // make label
      name: ast.$id +'-type',
      fill: "make",
      sort: [0.1, ast.$id]
    }]});
    ast.declarations.forEach(function(v, i){
      if(i){
        window.onmessage({data:[{ // make label
          name: ast.$id +'-type-'+i,
          fill: ",",
          sort: [0.1, ast.$id]
        }]});
      }
      v.$id = v.$id || Math.random().toString(32).slice(2);
      window.onmessage({data:[{
        name: v.$id,
        size: [[1,'~'],[1,'~']],
        fill: [Math.random(), Math.random(), Math.random()],
        sort: [0.1, ast.$id]
      }]});

      window.onmessage({data:[{
        name: v.$id +'-name',
        //fill: [Math.random(), Math.random(), Math.random()],
        sort: [0.1, v.$id]
      }]});
        window.onmessage({data:[{
          name: v.$id +'-name-l',
          fill: (v.id||'').name || "?",
          sort: [0.1, v.$id+'-name']
        }]});

      window.onmessage({data:[{
        name: v.$id +'-be',
        //fill: [Math.random(), Math.random(), Math.random()],
        sort: [0.1, v.$id]
      }]});
        window.onmessage({data:[{
          name: v.$id +'-be-op',
          //size: [[1,'~'],[1,'~']],
          fill: "=",
          sort: [0.1, v.$id+'-be']
        }]});

      window.onmessage({data:[{
        name: v.$id +'-is',
        //fill: [Math.random(), Math.random(), Math.random()],
        sort: [0.1, v.$id]
      }]});
        window.onmessage({data:[{
          name: v.$id +'-is-r',
          fill: (v.init||'').raw,
          sort: [0.1, v.$id+'-is']
        }]});
    });
    window.onmessage({data:[{ // make label
      name: ast.$id +'-type-end',
      fill: ".",
      sort: [0.1, ast.$id]
    }]});
  }
}
function each(l,cb){
  if(!l){ return }
  l = l.body || l;
  if(l instanceof Array){
    l.forEach(cb);
  }
}
function path(ast){
  var t = [], a = {up: ast};
  while(a = a.up){ t.push(a.name||'') }
  return t.reverse().join('-');
}

/*setTimeout(function(){
  var ast = esprima.parse(`
  var a = 9, b = 8, c = 7, d = 6;
  var x = 1, y = 2, z = 3;
  `);
  console.log(ast);
  render(ast);
}, 999);*/

}());