
;(function(){
  console.log('css3 renderer');
// this is the CSS3 matrix transform rendering engine fallback. WebGL would be preferred.
  sr.how.view = function (list) {
  //console.log("render:", list);
  //view.innerHTML = "";
  // fill
  // turn
  // size
  // grab
  // sort
  // warp
  //console.log('**** CSS render(list) ***. List = ', list);

  var change, i = 0, u;
  while(change = list[i++]){ each(change) }
  function each(change, name, what, has, put, text, tmp) {
    if(!(name = change.name)){ return }
    text = ('string' == typeof change.fill);
    if(!(what = map.get(name))){
      map.set(name, what = (text?
        document.createElement(change.html || 'p')
      : document.createElement('div')));
      if(!text){
        what.style.minWidth = '1'+place['cs'];
        what.style.minHeight = '1'+place['cs'];
      }
      what.name = name;
      what.id = 'v'+((name+'').replace(aZ09,''));
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
      var i = -1, l = tmp.length; while(++i < l){ tmp[i] = (tmp[i]*100)+'%' };
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

var map = new Map, place = {'-1':'beforebegin', '-0.1': 'afterbegin', '0.1':'beforeend', '1': 'afterend', '%':'%', '~':'em', '.':'px', comfort: 50}, aZ09 = /\W/ig;
function endline(tmp){ tmp.insertAdjacentElement(place[1], document.createElement('br')); }
map.set('SecureRender', document.getElementById('SecureRender'));
map.set(1, window);

}());