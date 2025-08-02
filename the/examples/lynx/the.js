;(function(sr){
  
    if (typeof self === 'undefined') {
      globalThis.self = globalThis;
    }
    
    var u;
    Math.mix = function (a,b,m) { m = m || 0; return a + (b-a) * m }
    Math.remix = function(a,b,m){ m = m || 0; return (m - a) / (b - a) }
  
    var page = __CreatePage("0", 0), PAGE_ID = __GetElementUniqueID(page), map = new Map;
    var placeMap = {'-1':'beforebegin', '-0.1': 'afterbegin', '0.1':'beforeend', '1': 'afterend', '%':'%', '~':'em', '.':'px', comfort: 50}, aZ09 = /\W/ig;
  
    var perf = globalThis.performance || { now: function(){ return +new Date } };
    var share = new Map, push = Array.prototype.push, sr = { workers: new Map };
    var up = { s: [] }, pid = Math.random().toString(32).slice(-4), pi = 0, was = {}, stay = {fill:''}, places = new Map, place;
    var the = { aim: { at: "", x: 0, y: 0, z: 0 }, key: {}, on: {} };
    var go = { name: 1, size: 1, turn: 1, grab: 1, zoom: 1, warp: 1, fill: 1, away: 1, drip: 1, flow: 1, unit: 1 };
  
    map.set("SecureRender", __CreateView(PAGE_ID));
    __SetAttribute(map.get("SecureRender"), "id", "SecureRender");
    __SetInlineStyles(map.get("SecureRender"), "position: fixed; border: 0; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0;");
    __InsertElementBefore(page, map.get("SecureRender"), null);
  
    var view = function(what){
      return places.get(what) ||
        (what && place === what.place && what) ||
        (places.set(what, what = new Proxy(what, place.ing)) && what)
    }, was = {}, stay = {fill:''}, places = new Map, place; view.s = {};
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
        what.up = where;
      } else {
        console.warn("unhandled how case in place");
      }
  
      msg.name = a.name || (msg = JSON.parse(JSON.stringify(what))), (msg.name = what.name = (pid+(++pi))), (view.s[what.name] = a).name;
      msg.sort = [how, (b||'').name];
      up.s.push(msg);
      return a;
    };
  
    place.ing = {get: function(at,has,put){
      if(place[has]){ return at[has] || place(at)[has] }
      return at[has];
    }, set: function(at,has,put){
      if(put === at[has]){ return }
      if(put instanceof Promise){ return }
      if(put?.then){ at[has] = u; return }
      at[has] = put;
      if(!go[has]){ return }
      var msg = {name: at.name};
      msg[has] = put;
      up.s.push(msg);
    }, has: function(at,has){
      return place.has.call(at, has);
    }};
  
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
  
    ['see','zip','aim','tap','hop','arc','use','act'].forEach(how=>{
      place.on[how] = function(eve){
        var at = view.s[the.aim.at], ack = at => ((at||'').only||'')[how] && at.only[how](eve);
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
  
    function no(){};
  
    sr.how = {};
    sr.how.view = function(list){
      render(list);
    };
  
    sr.how.store = function(msg, eve){
      if(msg.get){
        share.set('player.'+msg.get, msg.put);
      }
    };
  
  
    function render(list){
      var change, i = 0;
      while(change = list[i++]){
        each(change);
      }
      __FlushElementTree(page);
    }
  
    function each(change, name, what, has, put, text, tmp){
      if(!(name = change.name)){ return }
      text = ('string' == typeof change.fill);
      if(!(what = map.get(name))){
        if(text){
          what = __CreateText(PAGE_ID);
        } else {
          what = __CreateView(PAGE_ID);
        }
        map.set(name, what);
        what.name = name;
        what.id = 'v'+name.replace(aZ09,'');
        what.turn = [0,0,0];
        what.grab = [0,0,0];
        what.zoom = [1,1,1];
        what.size = change.size || [[1, '~'], [1, '~'], [1, '~']];
        what.unit = { turn: [], zoom: [], grab: [] };
  
        if(text){
          __SetInlineStyles(what, { color: "black", fontSize: "16px" });
        }
      }
      
      if(u !== (put = change.time)){
        __SetInlineStyles(what, { transitionDuration: put+'s' });
      }
      
      if(u !== (put = change.flow)){
        __SetInlineStyles(what, { textOrientation: 'upright' });
        tmp = (put[0][0] || put[0]);
        __SetInlineStyles(what, { whiteSpace: ('' == put[1])? 'nowrap' : 'normal' });
        if('v' == put[1]){ __SetInlineStyles(what, { writingMode: 'horizontal-tb' }) }
      }
      
      if(u !== (put = change.size)){
        what.size = put;
        if(text){
          __SetInlineStyles(what, { fontSize: (put[0] || put)*100+'%' });
        } else {
          if(tmp = put[0]){
            __SetInlineStyles(what, {
              minWidth: tmp[0]+placeMap[tmp[1]],
              maxWidth: tmp[2]+placeMap[tmp[3]]
            });
          }
          if(tmp = put[1]){
            __SetInlineStyles(what, {
              minHeight: tmp[0]+placeMap[tmp[1]],
              maxHeight: tmp[2]+placeMap[tmp[3]]
            });
          }
        }
      }
      
      if(u !== (put = change.drip)){
        what.drip = change.drip;
        tmp = ('rtl' === what.dir && what.stand)? ((1 === put)? 'right' : 'left') : '';
        __SetInlineStyles(what, { textAlign: (1 === put)? (tmp || 'left') : ((-1 === put)? (tmp || 'right') : 'center') });
      }
      
      if(text){
        var raw = __CreateRawText(change.fill);
        __InsertElementBefore(what, raw, null);
      }
      
      if(u !== (tmp = change.sort)){
        has = tmp[0][0] || tmp[0];
        put = map.get(tmp[1] || 'SecureRender') || '';
        if(put){
          var pos = placeMap[has];
          if(pos === 'beforebegin'){
            __InsertElementBefore(put.parentElement, what, put);
          } else if(pos === 'afterbegin'){
            __InsertElementBefore(put, what, put.firstChild);
          } else if(pos === 'beforeend'){
            __InsertElementBefore(put, what, null);
          } else if(pos === 'afterend'){
            __InsertElementBefore(put.parentElement, what, put.nextSibling);
          }
        }
      }
      
      if(u !== (tmp = change.fill)){
        what.fill = tmp;
        if(Array.isArray(tmp)){
          var i = -1, l = tmp.length; while(++i < l){ tmp[i] = (tmp[i]*100)+'%' };
          __SetInlineStyles(what, { [text?'color':'background']: "rgba("+tmp+")" });
        }
      }
      
      if(u !== (put = change.away)){
        __SetInlineStyles(what, { verticalAlign: (-put[0])+placeMap[put[1]] });
      }
      
      if(u !== (put = change.grab)){
        if(u !== put[2]){ change.zoom = [put[2], put[2], what.zoom[2]]; put[2] = 0; }
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
        tmp = "translate3d("+what.grab.join(placeMap[what.unit.grab[0]] + ",")+") rotateZ("+what.turn[0]+"turn) " + "rotateX("+what.turn[1]+"turn) " + "rotateY("+what.turn[2]+"turn) scale3d("+what.zoom+")";
        __SetInlineStyles(what, { transform: tmp });
      }
    }
  
    var breathe = function(){
      var time = perf.now();
      var change = Array.from(share.keys());
      push.apply(change, Array.from(share.values()));
      share = new Map;
      
      if(up.s.length){
        sr.how.view(up.s);
        up.s = [];
      }
    };
    setInterval(breathe, 0);
  
    the.words = "english";
    the.unit = {cs: 5, ps: 1};
  
    globalThis.the = the;
    globalThis.renderPage = breathe;
    globalThis.updatePage = breathe;
    globalThis.processData = function(){
      return { page: page, map: map, the: the, share: share };
    };
  }());