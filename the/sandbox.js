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
  eve.worker = sr.workers.get(eve.target.id);
  tmp(msg, eve);
};

sr.workers = new Map;
sr.run = function(msg, eve){
  if(sr.workers.get(msg.get)){ return }
  console.log("spawn untrusted script in worker:", msg);

  var url = window.URL.createObjectURL(new Blob([(msg.deps||'')+"\n;("+the+")()||(breath = async function(){"+msg.put+"})"]));
  var worker = new Worker(url), u;
  sr.workers.set(worker.id = msg.get, worker);
  worker.last = worker.rate = msg.rate || 16; // 1000/60
  worker.send = worker.postMessage;
  worker.addEventListener('message', window.onmessage);
}

function load(src, cb){
  var script = document.createElement('script');
  script.onload = cb; script.src = src;
  document.head.appendChild(script);
}

;(function(){
  return;
  load('./trial/jquery.js');
  load('./trial/meta.js');
  return; // MUST NOT BE COMMENTED FOR PRs!
  load('plug/joy.js');
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
        sr.run({how: 'script', put: t, get: s.id, rate: s.rate, deps: msg.deps});
      }
    }
  }
}

sr.how.store = function (msg, eve) {
  var tmp;
  if(tmp = msg.to){
    if(msg.get){
      share.set('player.'+msg.get, msg.put);
      return;
    }
    (tmp = sr.workers.get(tmp)) && tmp.send(msg);
    return;
  }
  msg.via = eve.worker.id;
  sr.up(msg);
}

sr.how.file = function(msg, eve){
  if(msg.get){
    var f = files.files[msg.at];
    if(!f || f.name != msg.get){
      console.log(f.name, "not found");
      return;
    }
    var r = new FileReader();
    r.onload = function(e) {
      var data = e.target.result;
      eve.worker.send({ack: 'file', get: msg.get, put: data});
    };
    r.readAsText(f); // add support for data URL, array buffer, etc.
    return;
  }
  files.ack = eve.worker; // TODO: BUG? Only 1 worker can ask for files at a time.
  if(files.wait){ return this } files.wait = 1;
  files.click();
}
files.onchange = function(eve){ eve.stopPropagation();
  files.wait = 0;
  if(files.ack){
    files.ack.send({ack:'file', s: files.files}); // TODO: BUG? Should all workers share file access events?
  }
}

sr.how.say = function(msg){
  (beep = new SpeechSynthesisUtterance()).text = msg.text;
  beep.rate = msg.rate || 1, beep.pitch = msg.pitch || 1, speechSynthesis.speak(beep);
}

function the(){ // THIS CODE RUNS INSIDE THE WEBWORKER!
  if(this.the){ return the }
  this.the = the;
  the.aim = the.aim || {};//function(){};
  the.aim.toString = function(){ return this.at }
  the.key = the.key || {};//function(){};
  the.on = {tag:{}};
  a = {};
  onmessage = async function(eve){
    var msg = eve.data, tmp;
    if(!msg){ return }
    if(u !== msg.length){
      if(breath.ago){ return } // app wants to await an earlier frame, so hold breath. :(
      var l = msg.length/2, i = -1, t, p, k, v; while(++i < l){
        p = msg[i];
        v = msg[l+i];
        t = the;
        p = p.split('.');
        while((k = p.shift()) && p.length){ t = t[k] || (t[k] = {}) }
        if('function' == typeof t[k]){
          t[k](v); // TODO: BUG!!! Replace this with msg.ack system instead?
        } else {
          t[k] = v;
        }
      }
      l = breath.now || -1;
      breath.ago = ((breath.now = perf.now()) - l);
      await breath();
      if(view !== the.view){
        eve.view = the.view; the.view = view;
        if(view.was != (eve.views = eve.view+'')){
          (tmp = view[typeof eve.view]) && tmp(eve.view);
          view.was = eve.views;
        }
      }
      breath.was = l;
      breath.ago = 0;
      if (!up.s.length) { return }
      up(up.s);
      up.s = [];
      return;
    }
    if(msg.ack){
      map.get(msg.ack).call(this, msg);
    }
  }

  var up = postMessage, opt = {}, map = new Map, id = 0, bc = 0, perf, u;
  up.s = []; perf = this.performance || {now: function(){ return +new Date }};

  Math.mix = function (a,b,m) { m = m || 0; return a + (b-a) * m }
  Math.remix = function(a,b,m){ m = m || 0; return (m - a) / (b - a) }

  this.store = new Proxy({}, {get: function(at,has,put){
    if(u !== (put = at[has])){ return put }
    put = new Promise(function(res, rej){
      var ack = Math.random(), any = function(msg){ // TODO: BUG/PERF! This could be cleaner by having a universal ack listener replies by `has` not ack, like book.
        clearTimeout(to);
        res(at[has] = (msg.put||[])[0]);
        map.delete(ack);
      }, to = setTimeout(function(){any({put:at[has]})}, opt.lack || 9000);
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
      (places.set(what, what = places.ify(what)) && what)
  }, was = {}, stay = {fill:''}, places = new Map, place; view.s = {};
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
        places.set(what, places.ify(a));
      }
    }
    a.fill = what.fill;
    if((0.1 === how) || (-0.1 === how)){
      //if(b === a.up){ return }
      //a.up = b;
      what.up = where;
      //a.up = b;
    } else {
      //a.up = b.up;
      //console.warn("unhandled how case in place");
    }
    a.sort = [how, (b||'').name];
    return a;
  };
  places.set(the.view = view, {name:'SecureRender'});
  places.ify = function(what, spy){
    spy = new Proxy(what, places.spy);
    what.name || (what.name = (pid+(++pi)));
    view.s[what.name] = spy;
    var msg = structuredClone(what);
    up.s.push(msg);
    return spy;
  }
  places.spy = {get: function(at,has,put){
    return at[has] || place(at)[has];
  }, set: function(at,has,put){
    if(put === at[has]){ return } // TODO: BUG, ahh, array diffs?
    if(put instanceof Promise){ return }
    if(put?.then){ at[has] = u; return }
    at[has] = put;
    if(!go[has]){ return }
    var last, msg = last = up.s[up.s.length-1]||'';
    if(at.name != msg.name){ msg = {name: at.name} }
    msg[has] = put;
    if(last === msg){ return }
    up.s.push(msg);
  }, has: function(at,has){
    return place.has.call(at, has);
  }};
  var go = {name:1, size:1, turn:1, grab:1, zoom:1, warp:1, fill:1, away:1, drip:1, flow:1, sort: 1, unit: 1};

  place.place = place;
  place.begin = function(on){ return place(was.what, -0.1, on) }
  place.after = function(on){ return place(was.what, 1, on) }
  place.before = function(on){ return place(was.what, -1, on) }
  place.into = function(on){ return place(was.what, 0.1, on) }

  place.has = function(has){ return (view.s[has]||place).via()[this.name] }
  place.via = function(until, ack){ ack = ack || no;
    var l = [], i=1, up = {up: this.up};
    while(up = up.up){ l.push(up); l[up.name||''] = i++; ack(up||'') }
    return l;
  }
  place.on = function(how, as){
    if(!as){
      as = how; how = as.toString();
      if('async' == how.slice(0,5)){ how = how.slice(6) }
      var i = '('==how[0]?1:0;
      return this.on(how.slice(0+i,3+i), as);
    }
    the.on[how] = place.on[how];
    (this.only||(this.only={}))[how] = as;
    return this;
  };
  // see, zip, aim, tap, hop, arc, use, act // joy0 = see // joy1| = zip // joy1- = aim // tap  = act // tap| // zip-zip = tap // tap+zip = aim
  ['see','zip','aim','tap','hop','arc','use','act'].forEach(how=>{
    place.on[how] = function(eve){
      var at = view.s[the.aim.at], ack = at => {
        ((at||'').only||'')[how] && at.only[how](eve);
        var i=0, t;
        if(!at.tags){ return }
        while(t = at.tags[i++]){
          ((the.on.tag[t]||'')[how]||'')[how] && the.on.tag[t][how](eve);
        }
      };
      if(!at){ return }
      ack(at); at.via('', ack);
    }
  });

  the.view['string'] = function(see){
    view.stay = view.stay || view({}).into(view)
    view.stay.fill = see;
  }
  the.view['function'] = function(see){
    see({});
  }

  the.file = view.s['file'] = the.view({name:'file'});
  (the.file.pick = the.file).into = function(){
    up({how: 'file'});
    return this;
  }
  map.set('file', function(msg){
    if(msg.get){
      var file = the.file.s[msg.get]||'';
      file.ack && file.ack(msg.put);
      return;
    }
    Object.keys(msg.s||{}).forEach((file,i) => { file = msg.s[i] // TODO: BUG! Make CPU scheduled.
      Object.defineProperty(file,'data',{get:function(){return new Promise(function(res,rej){
        file.ack = res; // TODO: BUG! only 1 await can happen at a time.
        up({how: 'file', get: file.name, at: i});
      })}}); // TODO: BUG! add support for data url, arraybuffer, etc.
      the.file.s[file.name] = file;
      the.aim.at = 'file';
      the.on.tap && the.on.tap(file);
    });
  });
  the.file.s = {};

  the.player = this.store;
  the.words = "english"; // TODO! Do not hardcode.
  the.unit = {cs: 5, ps: 1}; // TODO! Do not hardcode.
  function no(){};
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

  // see, aim, tap
  var aim = the.aim = function(){}, tap = the.tap = function(){}, u;
  w.onmousedown = function(eve){
    var key = "M"+eve.button;
    share.set("key."+key, (keys[key] = +new Date()));
  }
  w.onmouseup = function(eve){
    var key = "M"+eve.button;
    share.set("key."+key, (keys[key] = 0));
  }
  function mousemove(eve){ // Needs to be viewport x/y/z, not html.
    share.set('aim.x', tap.x = Math.mix(-1, 1, Math.remix(0, w.innerWidth, eve.clientX)));
    share.set('aim.y', tap.y = -Math.mix(-1, 1, Math.remix(0, w.innerHeight, eve.clientY)));
    share.set('aim.z', tap.z = 0); // VR!
    share.set("aim.at", eve?.target?.name||'');
    //share.set("aim.at", document.elementsFromPoint(eve.clientX, eve.clientY).map(function(el){ return {name: el.name, html:{}} }));
  }
  w.onmousemove = mousemove;
  w.ontouchmove = function(eve){
    var multi = eve.touches || [{}], t = multi[0];
    for(var k in t){ if(u === eve[k]){ eve[k] = t[k] } }
    mousemove(eve);
  }
  var keys = the.keys = function(){};
  w.onkeydown = function(eve){
    var key = clean(eve.code);
    if (keys[key]) {
      return;
    }
    var now = +new Date();
    share.set("key."+key, (keys[key] = now));
    key = eve.which;
    share.set("key."+key, (keys[key] = now));
  };
  w.onkeyup = function(eve){
    var key = clean(eve.code);
    share.set("key."+key, (keys[key] = 0));
    key = eve.which;
    share.set("key."+key, (keys[key] = 0));
  };
  w.onclick = function(eve){
    if(eve.target.id in {files:1}){ return }
    eve.preventDefault();
    share.set("on.tap", +new Date());
  }
  w.ondblclick = function(eve){
    eve.preventDefault();
  }
  //w.ontouchstart = 
  function clean(code){ return code.replace('Key','').replace('Arrow','').replace('Digit') }
  /* JOY
    LS move: [WASD]
      tap (or quick charge): jump (standing), leap (moving), hurdle/climb (obstacle), rebound (wall). [WW,AA,SS,DD]
      hold: drop (standing), slide (moving), dive (in air). [WS,SW]
    RS aim: [pointer]
      tap: grab/toss/interact, bash (double tap), crawl/climb
      hold: brace/shield (chargeable),
    RT/LT fire/use (secondary, grenade) [space/shift] phone accel/gyro 
    RB/LB switch/inventory [cmd/caps]
  */
  // 20dice 7px min.

}());

;(function(v){ // graphics engine renderer, swap between:
  window.sr = {how:{}};
  load('./plug/css3.js');
  load('./plug/geminigl.js');
  sr.how.view = function(list){ (v || (v = window.sr.how.view))(list) };
}());


}());