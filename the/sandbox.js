;(function(sr){

sr = {};
sr.up = function(msg){ window.parent.postMessage(msg, '*'); }  // NOTE: THIS LOOKS SCARY, BUT INSIDE A SANDBOX 'null' ORIGIN MEANS WE CANNOT USE '/' & ONLY PARENT, NO GRANDPARENT/SIBLINGS, CAN RECEIVE.

function fail(){ fail.yes = 1; document.body.innerHTML = "<center>SecureRender has detected an external threat trying to tamper with the security of your application.<br/>Please reload to restore security. If you still have problems, search for a more trusted source to load the application from.</center>" }

;(function(){
  sr.fail = "Blocked a script from leaking secure data (sandbox).";
  sr.ban = new Map;
  var tmp = window;
  while(tmp !== tmp.parent && (tmp = tmp.parent)){
    sr.ban.set(tmp, 1);
    sr.ban.set(tmp.postMessage, 1);
  }
}());

// Because ServiceWorker cannot intercept 'null' origin requests, enclave has to scrape sandbox html into localstorage with the JS inlined so it is not loaded externally next times. But this requires we use a srcDoc and allow for inline, which we previously did not need, and it turns out we can turn it off after we run so nobody else can do it later:
(sr.csp = document.querySelector('meta')).content = (sr.old = sr.csp.content).replace("'unsafe-inline'",'');

window.onmessage = function(eve){ // hear from app, enclave, and workers.
  var msg = eve.data;
  if(!msg){ return }
  if(u !== msg.length){ return sr.how.view(msg) }
  //if(msg.length){ return sr.how.run(msg) }
  var tmp = sr.how[msg.how];
  if(!tmp){ return }
  tmp(msg, eve);
};

sr.workers = new Map;
sr.run = function(msg, eve){
  if(sr.workers.get(msg.get)){ return }
  console.log("spawn untrusted script in worker:", msg);

  var url = window.URL.createObjectURL(new Blob(["("+the+")()||(breath = async function(){"+msg.put+"})"]));
  var worker = new Worker(url), u;
  sr.workers.set(worker.id = msg.get, worker);
  worker.last = worker.rate = msg.rate || 16; // 1000/60

  worker.addEventListener('message', window.onmessage);
}

;(function(){
  return; // MUST NOT BE COMMENTED FOR PRs!
  function load(src, cb){
    var script = document.createElement('script');
    script.onload = cb; script.src = src;
    document.head.appendChild(script);
  }
  load('trial/write.js')
}());

var view;
sr.how = {}; // RPC
sr.how.html = function(msg){
  if(view){ return fail() } // only run once.
  view = document.getElementById('SecureRender');
  var div = document.createElement('div');
  div.innerHTML = msg.put;
  var all = div.getElementsByTagName('script'), i = 0, s, t;
  while(s = all[i++]){
    if(!s.matches('secured')){
      s.className = 'secured';
      if(!s.id){ s.id = 's'+Math.random().toString(32).slice(2) }
      if(!s.rate){ s.rate = (parseFloat(s.getAttribute('rate'))||0.016)*1000 }
      if(t = s.innerText){
        sr.run({how: 'script', put: t, get: s.id, rate: s.rate});
      }
    }
  }
}

sr.how.store = function(msg, eve){
  var tmp;
  if(tmp = msg.to){
    if(msg.get){
      share.set('player_'+msg.get, msg.put);
      return;
    }
    (tmp = sr.workers.get(tmp)) && tmp.postMessage(msg);
    return;
  }
  msg.via = eve.target.id;
  sr.up(msg);
}

sr.how.say = function(msg){
  (beep = new SpeechSynthesisUtterance()).text = msg.text;
  beep.rate = msg.rate || 1, beep.pitch = msg.pitch || 1, speechSynthesis.speak(beep);
}

function the(){ // THIS CODE RUNS INSIDE THE WEBWORKER!
  if(this.the){ return the }
  this.the = the;
  the.aim = the.aim || {};//function(){};
  the.key = the.key || {};//function(){};
  onmessage = async function(eve){
    var msg = eve.data;
    if(view !== the.view){
      place(stay).into(view);
      place(the.view).into(stay);
      the.view = view;
    }
    if(!msg){ return }
    if(u !== msg.length){
      if(breath.ago){ return } // app wants to await an earlier frame, so hold breath. :(
      var l = msg.length/2, i = -1, t, p, k, v; while(++i < l){
        p = msg[i];
        v = msg[l+i];
        t = the;
        p = p.split('_');
        while((k = p.shift()) && p.length){ t = t[k] || (t[k] = {}) }
        t[k] = v;
      }
      l = breath.now || -1;
      breath.ago = ((breath.now = perf.now()) - l);
      await breath();
      breath.was = l;
      breath.ago = 0;
      if(!up.s.length){ return }
      up(up.s);
      up.s = [];
      return;
    }
    if(msg.ack){
      map.get(msg.ack).apply(this, msg.ask);
    }
  }

  var up = postMessage, opt = {}, map = new Map, id = 0, bc = 0, perf, u;
  up.s = []; perf = this.performance || {now: function(){ return +new Date }};

  Math.mix = function (a,b,m) { m = m || 0; return a + (b-a) * m }
  Math.remix = function(a,b,m){ m = m || 0; return (m - a) / (b - a) }

  this.store = new Proxy({}, {get: function(at,has,put){
    if(u !== (put = at[has])){ return put }
    put = new Promise(function(res, rej){
      var ack = Math.random(), any = function(v){
        clearTimeout(ack);
        res(at[has] = v);
        map.delete(ack);
      }, to = setTimeout(function(){any(at[has])}, opt.lack || 9000);
      map.set(ack, any);
      up({how: 'store', get: has, ack: ack});
    });
    put.toString = tS;
    return put;
  }, set: function(at,has,put){
    up({how: 'store', get: has, put: at[has] = put});
  }});
  function tS(){ return '' };

  var pid = Math.random().toString(32).slice(-4), pi = 0;
  var view = function(what){
    return places.get(what) ||
      (what && place === what.place && what) ||
      (places.set(what, what = new Proxy(what, place.ing)) && what)
  }, was = {}, stay = {fill:''}, places = new Map, place;
  places.set(the.view = view, {name:'SecureRender'});
  place = view.place = function(what, how, where){
    if(!how){
      was.what = what;
      was.how = how;
      was.where = where;
      return place;
    }
    var b = places.get(where || the.view) || (place === where.place && where)
    if(!b){ return }
    if(what instanceof Array){
      if(where){ where.fill = u }
      var i = 0, tmp;
      while(tmp = what[i++]){ place(tmp, how, where) }
      return;
    }
    var a = places.get(what) || (what && place === what.place && what), msg = {};
    if(!a){
      text = ('string' == typeof what);
      if(text && 0.1 == how && u !== b.fill){
        b.fill = msg.fill = what; // proxy will handle it now.
        return;
      } else {
        if(text){
          a = {fill: msg.fill = what};
        } else {
          a = msg = what;
        }
        places.set(what, a = new Proxy(a, place.ing));
      }
    }
    a.fill = what.fill;
    if((0.1 === how) || (-0.1 === how)){
      //if(b === a.up){ return }
      //a.up = b;
    } else {
      //a.up = b.up;
    }

    msg.name = a.name || ((msg = what).name = (pid+(++pi)));
    msg.sort = [how, (b||'').name];
    up.s.push(msg);
    return a;
  };
  place.ing = {get: function(at,has,put){
    if(place[has]){ return place(at)[has] }
    return at[has];
  }, set: function(at,has,put){
    if(put === at[has]){ return }
    if(put instanceof Promise){ return }
    var msg = {name: at.name};
    if(put){
      if(put.then){ at[has] = u; return }
      //if('function' == typeof put){ put = put.toString().slice(14, -4) } // TODO: shader support
    }
    msg[has] = at[has] = put;
    up.s.push(msg);
  }};
  place.place = place;
  place.begin = function(on){ return place(was.what, -0.1, on) }
  place.after = function(on){ return place(was.what, 1, on) }
  place.before = function(on){ return place(was.what, -1, on) }
  place.into = function(on){ return place(was.what, 0.1, on) }
  //place.text = function(t){ pm.s.push({what: }) }

  the.player = this.store;
  the.words = "english"; // TODO! Do not hardcode.
  the.unit = {cs: 5, ps: 1}; // TODO! Do not hardcode.
}

var breathe = function(){
  var time = perf.now();
  var change = Array.from(share.keys());
  push.apply(change, Array.from(share.values()));
  share = new Map;
  var s = sr.workers, l = Array.from(s.keys()), i = 0, c = change.length, w;
  while(w = l[i++]){
    if((w = s.get(w)) && c || (time - w.last) > w.rate){
      w.postMessage(change)
      w.last = time;
    }
  }
}, push = Array.prototype.push, share = new Map, u;
var perf = window.performance || {now: function(){ return +new Date }};
setInterval(breathe,0);

;(function(){
  // This module needs to serialize various web events
  // so they are accessible in the web worker
  var w = window, the = {};
  Math.mix = function (a,b,m) { m = m || 0; return a + (b-a) * m }
  Math.remix = function(a,b,m){ m = m || 0; return (m - a) / (b - a) }

  var aim = the.aim = function(){}, tap = the.tap = function(){};
  function mousemove(eve){ // Needs to be viewport x/y/z, not html.
    share.set('aim_x', tap.x = Math.mix(-1, 1, Math.remix(0, w.innerWidth, eve.clientX)));
    share.set('aim_y', tap.y = -Math.mix(-1, 1, Math.remix(0, w.innerHeight, eve.clientY)));
    share.set('aim_z', tap.z = 0); // VR!
  }
  w.onmousemove = mousemove;
  w.ontouchmove = function(eve){
    var multi = eve.touches || [{}], t = multi[0];
    for(var k in t){ if(undefined === eve[k]){ eve[k] = t[k] } }
    mousemove(eve);
  }
  var keys = the.keys = function(){};
  w.onkeydown = function(eve){
    var key = clean(eve.code);
    if (keys[key]) {
      return;
    }
    var now = +new Date();
    share.set("key_"+key, (keys[key] = now));
    key = eve.which;
    share.set("key_"+key, (keys[key] = now));
  };
  w.onkeyup = function(eve){
    var key = clean(eve.code);
    share.set("key_"+key, (keys[key] = 0));
    key = eve.which;
    share.set("key_"+key, (keys[key] = 0));
  };
  function clean(code){ return code.replace('Key','').replace('Arrow','').replace('Digit') }
  /* JOY
    LS move: [WASD]
      tap (or quick charge): jump (standing), leap (moving), hurdle/climb (obstacle), rebound (wall). [WW,AA,SS,DD]
      hold: drop (standing), slide (moving), dive (in air). [WS,SW]
    RS aim: [pointer]
      tap: grab/toss/interact, bash (double tap), crawl/climb
      hold: brace/shield (chargeable),
    RT/LT fire/use (secondary, grenade) [space/shift]
    RB/LB switch/inventory [cmd/caps]
  */
  // 20dice 7px min.
}());

;(function(){
// this is the CSS3 matrix transform rendering engine fallback. WebGL would be preferred.
sr.how.view = function(list){
  //console.log("render:", list);
  //view.innerHTML = "";
  // fill
  // turn
  // size
  // grab
  // sort
  console.log('**** CSS render(list) ***. List = ', list);

  var change, i = 0, u;
  while(change = list[i++]){ each(change) }
  function each(change, name, what, has, put, text, tmp){
    if(!(name = change.name)){ return }
    text = ('string' == typeof change.fill);
    if(!(what = map.get(name))){
      map.set(name, what = (text?
        document.createElement('p')
      : document.createElement('div')));
      if(!text){
        what.style.minWidth = '1'+place['cs'];
        what.style.minHeight = '1'+place['cs'];
      }
      what.name = name;
      what.id = 'v'+name.replace(aZ09,'');
      what.turn = [0,0,0];
      what.grab = [0,0,0];
      what.zoom = [1,1,1];
      //what.fill = [0,0,0,0];
      what.size = change.size || [[1, '~'], [1, '~'], [1, '~']];
      what.unit = { turn: [], zoom: [], grab: [] };
      //what.contentEditable = 'true';
    }
    if(u !== (put = change.time)){
      what.style.transitionDuration = put+'s';
    }
    if(u !== (put = change.flow)){
      what.style.textOrientation = 'upright';
      tmp = (put[0][0] || put[0]);
      what.style.whiteSpace = ('' == put[1])? 'nowrap' : 'normal';
      if('v' == put[1]){ what.style.writingMode = 'horizontal-tb' }
      else if('^' == put[1]){ console.warn('Flow up not supported.') }
      if('>' == tmp || '>' == put[1]){
        what.dir = 'ltr';
        if('v' == tmp){
          what.style.writingMode = what.stand = 'vertical-lr';
        } else
        if('^' == tmp){
          what.dir = 'rtl';
          what.style.writingMode = what.stand = 'vertical-lr';
        } else { what.stand = 0 }
      } else
      if('<' == tmp || '<' == put[1]){
        what.dir = 'rtl';
        if('v' == tmp){
          what.dir = 'ltr';
          what.style.writingMode = what.stand = 'vertical-rl';
        } else
        if('^' == tmp){
          what.style.writingMode = what.stand = 'vertical-rl';
        } else { what.stand = 0 }
      }
      change.drip = (u === (tmp = change.drip))? what.drip : tmp;
    }
    if(u !== (put = change.size)){
      what.size = put; // TODO: Handle units
      if(text){
        what.style.fontSize = (put[0] || put)*100+'%';
      } else {
        if(tmp = put[0]){
          what.style.minWidth = tmp[0]+place[tmp[1]];
          what.style.maxWidth = tmp[2]+place[tmp[3]];
          if(what.stand){ what.style.lineHeight = what.style.minWidth }
        }
        // TODO: Support a default "resting state" between min/max.
        if(tmp = put[1]){
          what.style.minHeight = tmp[0]+place[tmp[1]];
          what.style.maxHeight = tmp[2]+place[tmp[3]];
          if(!what.stand){ what.style.lineHeight = what.style.minHeight }
        }
      }
    }
    if(u !== (put = change.drip)){
      what.drip = change.drip;
      tmp = ('rtl' === what.dir && what.stand)? ((1 === put)? 'right' : 'left') : '';
      what.style.textAlign = (1 === put)? (tmp || 'left') : ((-1 === put)? (tmp || 'right') : 'center');
    }
    //change.top && (what.style.verticalAlign = '-1em');
    if(text){ what.innerText = change.fill }
    if(u !== (tmp = change.sort)){
      // A dot on a line is at a defined place, but it might stretch up to a max.
      has = tmp[0][0] || tmp[0];
      put = map.get(tmp[1] || 'SecureRender') || '';
      if((tmp = what.nextSibling) && 'BR' === tmp.tagName){ tmp.remove() }
      if(put){ put.insertAdjacentElement(place[has], what) }
      if(text){
        if((tmp = what.previousSibling) && 'P' === tmp.tagName){ endline(tmp) }
        if((tmp = what.nextSibling) && 'P' === tmp.tagName){ endline(what) }
      }
    }
    if(u !== (tmp = change.fill)){
      what.fill = tmp;
      var i = -1, l = tmp.length; while(++i < l){ tmp[i] = (tmp[i]*100)+'%' }
      what.style[text?'color':'background'] = "rgba("+tmp+")";
    }
    // /*tmp! delete*/ if(!what.innerText && what.fill){ what.style.color = '#FFF'; what.style.padding = '0.25em'; } // TODO: DELETE!
    if(u !== (put = change.away)){
      what.style.verticalAlign = (-put[0])+place[put[1]]; // TODO
    }
    if(u !== (put = change.grab)){
      if(u !== put[2]){ change.zoom = [put[2], put[2], what.zoom[2]]; put[2] = 0; } // simulate 3D by converting Z to zoom.
      tmp = what.grab;
      var j = -1, l = put.length; while(++j < l){
        tmp[j] = put[j] || tmp[j] || 0;
         what.unit.grab[j] = "~";
      }
      change.t = 1;
    }
    if(u !== (put = change.turn)){
      tmp = what.turn;
      var j = -1, l = put.length; while(++j < l){
        tmp[j] = put[j] || tmp[j] || 0;
      }
      change.t = 1;
    }
    if(u !== (put = change.zoom)){
      tmp = what.zoom;
      var j = -1, l = put.length; while(++j < l){
        tmp[j] = put[j] || tmp[j] || 0;
      }
      change.t = 1;
    }
    if(change.t){
      tmp = what.style.transform = "translate3d("+what.grab.join(place[what.unit.grab[0]] + ",")+") rotateZ("+what.turn[0]+"turn) " + "rotateX("+what.turn[1]+"turn) " + "rotateY("+what.turn[2]+"turn) scale3d("+what.zoom+")";
    }
  }

};

map = new Map, place = {'-1':'beforebegin', '-0.1': 'afterbegin', '0.1':'beforeend', '1': 'afterend', '%':'%', '~':'em', '.':'px', comfort: 50}, aZ09 = /\W/ig;
function endline(tmp){ tmp.insertAdjacentElement(place[1], document.createElement('br')); }
map.set('SecureRender', document.getElementById('SecureRender'));
map.set(1, window);

}());


;(function(){

// *WEBGL
//return; // WEBGL RENDERER TURNED OFF BY DEFAULT, COMMENT OUT THIS LINE TO REPLACE THE HTML ONE. IT IS STILL COMPLETELY BROKEN AND DOES NOT OBEY THE LAYOUT RULES YET.
var see = {};
var glSceneGraph = new Map;

const vertexShaderSource = `
attribute vec4 dot;
attribute vec4 grab;

attribute vec4 hue;
attribute vec3 size;

uniform mat4 projection;

varying vec4 fill;

void main() {
  mat4 move = mat4(
    vec4(size.x, 0, 0, 0),
    vec4(0, size.y, 0, 0),
    vec4(0, 0, 1, 0),
    grab
  );

  gl_Position = projection * move * dot;
  fill = hue;
}
`;


const fragmentShaderSource = `
precision mediump float;
varying vec4 fill;

void main() {
  gl_FragColor = fill;
}
`;

function setupProjectionMatrix(gl, program) {
  const aspect = gl.canvas.width / gl.canvas.height;

  const M = [
  2/aspect,0,0,0,
    0,2,0,0,
    0,0,2,0,
    0,0,0,2
  ];

  const projectionUnifLoc = gl.getUniformLocation(program, 'projection');
  gl.uniformMatrix4fv(projectionUnifLoc, false, M);

}

function linkAttributesToBuffers(gl, program) {
  // Bind "dot" attr

  const dotAttrLoc = gl.getAttribLocation(program, "dot");
  gl.enableVertexAttribArray(dotAttrLoc);

  const dotBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, dotBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([ // a single box wireframe
    0, 0, 1, 0, 1, -1,
    0, 0, 0, -1, 1, -1
  ]), gl.STATIC_DRAW);

  var size = 2;          // 2 components per iteration
  var normalize = false; // don't normalize the data

  gl.vertexAttribPointer(dotAttrLoc, size, gl.FLOAT, normalize, /*stride=*/ 0, /*offset = */ 0);

  // Bind dynamic attributes

  const grabAttrLoc = gl.getAttribLocation(program, "grab");
  const hueAttrLoc = gl.getAttribLocation(program, "hue");
  const sizeAttrLoc = gl.getAttribLocation(program, "size");

  gl.enableVertexAttribArray(grabAttrLoc);
  gl.enableVertexAttribArray(hueAttrLoc);
  gl.enableVertexAttribArray(sizeAttrLoc);

  gl.many.vertexAttribDivisorANGLE(grabAttrLoc, 1);
  gl.many.vertexAttribDivisorANGLE(hueAttrLoc, 1);
  gl.many.vertexAttribDivisorANGLE(sizeAttrLoc, 1);

  const dynAttrBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, dynAttrBuffer);

  const bytes = Float32Array.BYTES_PER_ELEMENT;
  const nDynAttr = 10;

  const stride = nDynAttr * bytes;

  gl.vertexAttribPointer(grabAttrLoc, 3, gl.FLOAT, normalize, stride, 0);
  gl.vertexAttribPointer(hueAttrLoc, 4, gl.FLOAT, normalize, stride, 3 * bytes);
  gl.vertexAttribPointer(sizeAttrLoc, 3, gl.FLOAT, normalize, stride, 7 * bytes);

  return dynAttrBuffer;
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

// boxes: [{ size: [[dx, '~'], [dy, '~']], fill: [r, g, b, a] }]
// -> [[...grab, ...fill, ...size]]
function calcOffsets(boxes, cWidth) {
  const oneTilde = 50;

  let offsetY = 0.;
  const result = [];
  let i = 0;

  while (i < boxes.length) {
    let j = i, lineWidth = 0., maxHeight = 0.;

    while (j < boxes.length) {
      let [[dx], [dy]] = boxes[j].size;
      [dx, dy] = [dx / oneTilde, dy / oneTilde];

      if (lineWidth + dx > cWidth) break;

      const fill = boxes[j++].fill;
      if (fill.length < 4) fill[3] = 1;


      result.push([0,0,0, ...fill, dx, dy, 1.]);

      lineWidth += dx;
      if (dy > maxHeight) maxHeight = dy;
    }

    let offsetX = 0.5 * (cWidth - lineWidth);

    while (i < j) {
      result[i][0] = (offsetX - 1.0) + boxes[i].grab[0];
      result[i][1] = (offsetY) + boxes[i].grab[1];
      offsetX += result[i++][7];
    }
    offsetY += maxHeight;
  }

  for (let i = 0, h = 0.5 * offsetY; i < result.length; i++) {
    result[i][1] = h - result[i][1];
  }

  return result;
}


see.create = function(){
  if(see.DOM){ return }
  var w = window, c = document.createElement('canvas'), tmp;
  c.width = w.innerWidth, c.height = see.tall = w.innerHeight;
  (tmp = c.style).position = 'fixed'; tmp.left = tmp.top = 0;
  SecureRender.appendChild(see.DOM = c);
  var gl = see.gl = c.getContext('webgl');
  gl.many = gl.getExtension('ANGLE_instanced_arrays');

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  const program = see.program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  see.mainBuffer = linkAttributesToBuffers(gl, program);

  sr.how.view = render;
}

see.create();
see.all = 0;

window.onresize = function(){
  var gl = see.gl;
  gl.viewport(0, 0, window.innerWidth, window.innerHeight);

  setupProjectionMatrix(gl, see.program);
}
window.onresize();

//function grow(a, x, r){ return (r = new Numbers(a.length + (x||100))).set(a, 0), r } // however much bigger you want it. Delete this, just inline it!
function render(list){
  //console.log('**** WEBGL render, list', list);

  //return;
  const gl = see.gl;
  let nBoxes = glSceneGraph.size;

  for (let change of list) {
    if (!change.name) {
      console.error('No change.name in render', change);
      continue;
    }

    const name = change.name;
    let what = glSceneGraph.get(name);

    if (!what) {
      glSceneGraph.set(name, what = {});

      what.id = 'v'+name.replace(aZ09,'');
      what.size = [1,1,1];
      what.turn = [0,0,0];
      what.grab = [0,0,0];
      what.zoom = [1,1,1];
      what.fill = [0,0,0];
      what.away;
      what.drip;
      what.flow;
      what.sort;
      what.unit = { turn: [], zoom: [], grab: [] };
    }

    Object.assign(what, change);
  }

  const boxes = calcOffsets([...glSceneGraph.values()], 2.);
  const boxAttributes = new Float32Array(boxes.flat());

  gl.bindBuffer(gl.ARRAY_BUFFER, see.mainBuffer);

  if (nBoxes < glSceneGraph.size) {
    gl.bufferData(gl.ARRAY_BUFFER, boxAttributes, gl.DYNAMIC_DRAW);
  }
  else {
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, boxAttributes);
  }

  gl.many.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, boxes.length);
}

// render.scroll = function(){ // UPGRADE THIS TO VIEW MATRIX TRANSFORM.
//   var gl = see.gl, box = see.view.box;
//   box.scroll = gl.getUniformLocation(box, 'scroll'); // THIS IS THE SLOW WAY TO DO THIS, REFACTOR TO viewspace/translation
//   gl.uniform1f(box.scroll, see.scroll); // out of the selected buffer.
//   render([]);
// }

// see.scroll = 0;
// ;(function(){ // TMP! DELTE! // NOTE: Why is this with GL? It should work with both. But for now, we're working on GL, so ... we hacked it in here.
// var s = document.body.style, i = window.innerHeight, h = i, _y;
// s.height = (h *= 10)+'px';
// function scroll(){
//   var y = window.scrollY, r = y / h, d = y - _y; _y = y;
//   see.scroll = y/see.tall;
//   if(d > 0){
//     s.height = (h += i*0.1*r)+'px';
//   } else
//   if(r < 0.75 && (i*10) < h){
//     s.height = (h -= i*0.1)+'px';
//   }
//   render.scroll();
// }
// window.onwheel = scroll;
// if('ontouchstart' in window){ window.onscroll = scroll }
// }());

}());

}());