;(function(sr){

sr = {};
sr.up = function(msg){ window.parent.postMessage(msg, '*'); }  // TODO: AUDIT! THIS LOOKS SCARY, BUT '/' NOT WORK FOR SANDBOX 'null' ORIGIN. IS THERE ANYTHING BETTER?

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

//var url = window.URL.createObjectURL(new Blob(["console.log('test');"])),worker = new Worker(url); // Should webworkers be moved to here, rather than enclave?

window.onmessage = function(eve){
  var msg = eve.data;
  if(!msg){ return }
  if(u !== msg.length){ return sr.how.view(msg) }
  //if(msg.length){ return sr.how.run(msg) }
  var tmp = sr.how[msg.how];
  if(!tmp){ return }
  tmp(msg, eve);
};

var view;
sr.how = {
	html: function(msg){
		if(view){ return fail() } // only run once.
		view = document.getElementById('SecureRender');
		var div = document.createElement('div');
		div.innerHTML = msg.put;
    var all = div.getElementsByTagName('script'), i = 0, s, t;
    while(s = all[i++]){
    	if(!s.matches('secured')){
    		s.className = 'secured';
    		if(!s.id){ s.id = 's'+Math.random().toString(32).slice(2) }
    		if(t = s.innerText){
    			sr.run({how: 'script', put: t, get: s.id});
    		}
    	}
  	}
	},
	view: function(list){
		console.log("render:", list);
		//view.innerHTML = "";
    // fill
    // turn
    // size
    // grab
    // sort
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
        what.id = 'v'+name.replace(aZ09,'');
        what.turn = [0,0,0];
        what.grab = [0,0,0];
        what.zoom = [1,1,1];
	what.unit = { turn: [], zoom: [], grab: [] };
        what.contentEditable = 'true';
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
        put = map.get(tmp[1]) || '';
        if((tmp = what.nextSibling) && 'BR' === tmp.tagName){ tmp.remove() }
        if(put){ put.insertAdjacentElement(place[has], what) }
        if(text){
          if((tmp = what.previousSibling) && 'P' === tmp.tagName){ endline(tmp) }
          if((tmp = what.nextSibling) && 'P' === tmp.tagName){ endline(what) }
        }
      }
      if(u !== (tmp = change.fill)){
        var i = -1, l = tmp.length; while(++i < l){ tmp[i] = (tmp[i]*100)+'%' }
        what.style[text?'color':'background'] = "rgba("+tmp+")";
      }
      if(u !== (put = change.away)){
        what.style.verticalAlign = (-put[0])+place[put[1]]; // TODO
      }
      if(u !== (put = change.grab)){
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
        what.style.transform = "translate3d("+what.grab.join(place[what.unit.grab[0]] + ",")+") rotateZ("+what.turn[0]+"turn) " + "rotateX("+what.turn[1]+"turn) " + "rotateY("+what.turn[2]+"turn) scale3d("+what.zoom+")";
      }
    }
    function is(){}
    function old(){
			if(a = see.what){
				a = map.get(a);
				if(!a){
					map.set(c = see.what, a = document.createElement('p'));
          //a.style.transform = "translate3d(0,0,0)";
					a.id = c;
				}
				if(u !== (c = see.text)){ a.innerText = c }
				if((c = see.place) && (b = map.get(see.where))){
					//if(b === view && 1 === c){ a.ontransitionend = function(){ /*a.nextSibling.remove();*/ a.remove(); }; a.className = "hide"; continue } // exit
					//if((0.1 === c || -0.1 === c) && a.parentElement === b){ continue }
					if((d = a.nextSibling) && 'BR' === d.tagName){ d.remove() }
					if((d = b.nextSibling) && 'BR' === d.tagName){ b = d }
					b.insertAdjacentElement(p[c], a);
					a.insertAdjacentElement(p[1], document.createElement('br'));
				}
        if(b = see.turn){
          d = a.turn || (a.turn = []);
          var j = -1, l = b.length; while(++j < l){
            d[j] = b[j] || d[j] || 0;
          }
          a.style.transform = "rotateZ("+(d[0]||0)+"turn) " + "rotateX("+(d[1]||0)+"turn) " + "rotateY("+(d[2]||0)+"turn) "; // needs to be done last after size,turn,grab
        }
        if(b = see.size){
          if('P' === a.tagName){
            a.style.fontSize = (b*100)+'%';
          } else {

          }
          d = a.size || (a.size = []);
          var j = -1, l = b.length; while(++j < l){
            d[j] = b[j] || d[j] || 0;
          }
          a.style.transform = "scale3d("+d+")";
        }
      }
    }
	},
	localStore: function(msg, eve){
		var tmp;
		if(tmp = msg.to){
			(tmp = sr.workers.get(tmp)) && tmp.postMessage(msg);
			return;
		}
		msg.via = eve.target.id;
		sr.up(msg);
	},
  say: function(msg){

    location.hash = "wow";
    (beep = new SpeechSynthesisUtterance()).text = msg.text;
    beep.rate = msg.rate || 1, beep.pitch = msg.pitch || 1, speechSynthesis.speak(beep);
  }
}

sr.workers = new Map;
sr.run = function(msg, eve){
  if(sr.workers.get(msg.get)){ return }
  console.log("spawn untrusted script in worker:", msg);

  var url = window.URL.createObjectURL(new Blob(["("+the+")()||(breath = async function(){"+msg.put+"})()"]));
  var worker = new Worker(url), u;
  sr.workers.set(worker.id = msg.get, worker);

  worker.addEventListener('message', window.onmessage);return;
  worker.addEventListener('message', function(eve){
    var msg = eve.data;
    if(!msg){ return }
    if(u !== msg.length){ return sr.send(msg) }
    eve.via = worker;
    if(!(tmp = sr.how[msg.how])){ return }
    tmp(msg, eve);
  }, false);
}

function the(){ // THIS CODE RUNS INSIDE THE WEBWORKER!
	if(this.the){ return the }
	this.the = the;
  onmessage = function(eve){
    var msg = eve.data;
    if(view !== the.view){
    	place(stay).into(view);
    	place(the.view).into(stay);
    	the.view = view;
    }
    if(!msg){ return }
    if(u !== msg.length){
      var l = msg.length/2, i = -1, t, p, k, v; while(++i < l){
        p = msg[i];
        v = msg[l+i];
        t = the;
        p = p.split('_');
        while((k = p.shift()) && p.length){ t = t[k] || (t[k] = {}) }
        t[k] = v;
      }
      breath();
      if(!up.s.length){ return }
      up(up.s);
      up.s = [];
      return;
    }
    if(msg.ack){
      map.get(msg.ack).apply(this, msg.ask);
    }
  }

  var up = postMessage, opt = {}, map = new Map, id = 0, u;
  up.s = [];

  Math.mix = function (a,b,m) { m = m || 0; return a + (b-a) * m }
  Math.remix = function(a,b,m){ m = m || 0; return (m - a) / (b - a) }
  
  // localStorage is not async, so here is a quick async version for testing.
  // TODO: indexedDB is in webworkers, so maybe that should be encouraged instead, to stick with standards?
  this.localStore = new Proxy({}, {get: function(at,has,put){
    if(u !== (put = at[has])){ return put }
    put = new Promise(function(res, rej){
      var ack = Math.random(), any = function(v){
        res(at[has] = v);
        map.delete(ack);
        clearTimeout(ack);
      }, to = setTimeout(any, opt.lack || 9000);
      map.set(ack, any);
      up({how: 'localStore', get: has, ack: ack});
    });
    put.toString = tS;
    return put;
  }, set: function(at,has,put){
    console.log("store:", has, put);
    up({how: 'localStore', get: has, put: put});
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
    var msg = {name: at.name};
    msg[has] = at[has] = put;
    up.s.push(msg);
  }};
  place.place = place;
  place.begin = function(on){ return place(was.what, -0.1, on) }
  place.after = function(on){ return place(was.what, 1, on) }
  place.before = function(on){ return place(was.what, -1, on) }
  place.into = function(on){ return place(was.what, 0.1, on) }
  //place.text = function(t){ pm.s.push({what: }) }
  
  the.player = this.localStore;
  the.words = "english"; // TODO! Do not hardcode.
  the.unit = {cs: 5, ps: 1}; // TODO! Do not hardcode.
}


var breathe = window.requestAnimationFrame, push = Array.prototype.push, share = new Map, u;
breathe(function now(){
	breathe(now);
	var change = Array.from(share.keys());
	push.apply(change, Array.from(share.values()));
	share = new Map;
	//if(!change.length){ return }
  var s = sr.workers, l = Array.from(s.keys()), i = 0, w;
  while(w = l[i++]){ (w = s.get(w)) && w.postMessage(change) }
});

;(function(){
	// This module needs to serialize various web events
	// so they are accessible in the web worker
	window.onmousemove = function(eve){
		share.set('tap_x', eve.pageX);
		share.set('tap_y', eve.pageY);
	}
	var keys = {};
	window.onkeydown = function (eve) {
		var key = "key_" + eve.code;
		if (keys[key]) {
			return;
		}
		var now = +new Date();
		share.set(key, (keys[key] = now));
		key = "key_" + eve.which;
		share.set(key, (keys[key] = now));
	};
	window.onkeyup = function (eve) {
		var key = "key_" + eve.code;
		share.set(key, (keys[key] = 0));
		key = "key_" + eve.which;
		share.set(key, (keys[key] = 0));
	};
	// TODO: Add more than just mousemove, lol!
}());

map = new Map, place = {'-1':'beforebegin', '-0.1': 'afterbegin', '0.1':'beforeend', '1': 'afterend', '%':'%', '~':'em', '.':'px'}, aZ09 = /\W/ig;
function endline(tmp){ tmp.insertAdjacentElement(place[1], document.createElement('br')); }
map.set('SecureRender', document.getElementById('SecureRender'));
map.set(1, window);

}());
