;(function(){
	
console.log("Hello Experiments! Do whatever you want in this folder or files!");

setTimeout(function(){
  window.onmessage({data: []})
}, )

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
  meta.edit({
    name: "Design",
    combo: ["D"],
    on: function () {
      console.log("Design")
    }
  }),
  meta.edit({
    name: "Edit",
    combo: ["E"],
    on: function () {
      console.log("Edit Code")
    }
  })

  meta.edit({
    name: "Add",
    combo: ["D", "A"],
    on: function () {
      console.log("Add View")
      
      window.onmessage({data: [{name: Math.random().toString(32), size: [[1, '~'],[1, '~']],  fill: [Math.random(), Math.random(), Math.random()], sort: [0.1, "SecureRender"]}]})
    }
  })   
  meta.edit({
    name: "Turn",
    combo: ["D", "T"],
    on: function () {
      console.log("Turn it")
    }
  })   
  meta.edit({
    name: "Size",
    combo: ["D", "S"],
    on: function () {
      console.log("Size")
      // window.onmessage({data: [{name: "first", grab: [box.grab[0] ,box.grab[1] , (box.grab[2] + 1) * 2]}]})
    }
  })   
  meta.edit({
    name: "Fill",
    combo: ["D", "F"],
    on: function () {
      var name = meta.tap()[0].id;
      console.log(name)
      if (name !== "") {
        console.log("Fill")
        window.onmessage({data: [{name: name, fill: [Math.random(), Math.random(), Math.random()]}]});
      }
    }
  })

  meta.edit({
    name: "Hear",
    combo: ["E", "H"],

  })
  meta.edit({
    name: "Say",
    combo: ["E", "S"],

  })
  meta.edit({
    name: "Look",
    combo: ["E", "L"],

  })
  meta.edit({
    combo: ["E", "G"]
  })
  meta.edit({
    name: "Hand",
    combo: ["E", "G","H"],

  })
  meta.edit({
    name: "Run",
    combo: ["E", "G","R"],

  })
  meta.edit({
    name: "Open",
    combo: ["E", "O"],
    on: function () {
      console.log("import");
      meta.ask("paste in code", function(data){
        console.log("paste", data);
        var syntax = esprima.parse(data);
        console.log('pasted:', syntax);
      })
    }
  })

}

}());