;(function(sr){
/* WITHOUT SECURE RENDER, BROWSERS SAVE USER DATA TO THE APPLICATION'S DOMAIN.
THIS MEANS THE DOMAIN'S OWNER CAN ACCESS YOUR DATA. SECURE RENDER FIXES THIS.
SECURE RENDER CREATES A SECURITY CONTEXT UNDER THE USER INSTEAD, NOT THE APP.
APPLICATION LOGIC IS THEN RUN IN A THIRD CONTEXT, ISOLATED FROM ALL DOMAINS.

THIS CODE IS USED AS BOTH A BROWSER EXTENSION AND A POLYFILL SHIM FOR WEBSITE APPS.
IF THIS CODE IS RUNNING INSIDE THE BROWSER: USER DATA IS SAVED AND PROTECTED THERE.
ELSE WARNING: UNTIL BROWSERS SUPPORT THIS, A USER CONTEXT IS SHIMMED UNDER THE POLYFILL,
WHILE THIS IS MORE SECURE THAN APP OWNERS HAVING ACCESS TO DATA, IT STILL HAS RISKS.
TO LEARN MORE ABOUT THESE LIMITATIONS, PLEASE READ SECURERENDER.ORG

HOW SECURE RENDER WORKS: APP -> [ IFRAME SHIELD -> [SECURE RENDER] <-> USER DATA ]
AN APP ONLY EVER FEEDS IN VIEW LOGIC. DATA IS NEVER SENT BACK UP! */
sr = {ext: ((window.browser||window.chrome)||'').runtime};

(function start(i){
  // TODO: talk to cloudflare about enforcing integrity meanwhile?
  i = sr.i = document.createElement('iframe');
  i.className = 'SecureRender';
  i.style = "position: fixed; border: 0; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0;";
  i.sandbox = 'allow-scripts allow-popups allow-downloads allow-pointer-lock';
  i.csp = "script-src 'self' 'unsafe-inline'; default-src data: blob: mediastream: filesystem:; style-src 'self' 'unsafe-inline'; child-src 'self' blob:; worker-src blob: 'self';"; // 'unsafe-inline' let's us boot SR in localStorage polyfill mode, we then turn OFF 'unsafe-inline'.
  sr.send = function(msg){ i.contentWindow.postMessage(msg, '*') } // TODO: AUDIT! THIS LOOKS SCARY, BUT '/' NOT WORK FOR SANDBOX 'null' ORIGIN. IS THERE ANYTHING BETTER?
  document.body.appendChild(i);
  if(sr.ext){ return i.src = "./sandbox.html" } // extension
  if(i.doc = localStorage.sandbox){ return i.srcdoc = i.doc } // cached polyfill prevents remote attack
  // TODO: AUDIT: Does State Partitioning reduce sandbox caching? If so, we should try to IDB it in SW.
  i.src = "./sandbox.html";
  ;(async function(){
    var html = await (await fetch('./sandbox.html')).text();
    var js = await (await fetch('./sandbox.js')).text();
    localStorage.sandbox = html.replace('script src="./sandbox.js">', "script>"+js);
  }());
}());

window.onmessage = function(eve){
  eve.preventDefault();
  eve.stopImmediatePropagation();
  var msg = eve.data, tmp, u;
  //console.log("ENCLAVE ONMESSAGE", msg);
  if(!msg){ return }
  //if(eve.origin !== location.origin){ console.log('meow?',eve); return }
  if(eve.source !== sr.i.contentWindow){ return sr.send(msg) }
  /*try{ (c = new MessageChannel).port1.onmessage = function(eve){ sr.send(eve.data) }
    navigator.serviceWorker.controller.postMessage(msg,[c.port2]);
  }catch(e){ sr.i.srcdoc = "<center>Your browser does not support SecureRender yet. Please enable `requestStorageAccess()` in FireFox, temporarily turn Brave Shield off, or try in Google Chrome.</center>" }*/
  tmp = sr.how[msg.how];
  if(!tmp){ return }
  tmp(msg, eve);
};

sr.how = {
  store: function(msg, eve){ var u;
    if(u !== msg.put){
      localStorage.setItem(msg.get, JSON.stringify(msg.put));
    } else
    if(msg.get){
      sr.send({to: msg.via, ack: msg.ack, ask: [JSON.parse(localStorage.getItem(msg.get))], how: 'store'});
    }
  }
}
window.addEventListener('storage', function(msg){
  sr.send({to: 1, get: msg.key, put: JSON.parse(msg.newValue), how: 'store'});
});

if(!sr.ext){ try{
  navigator.serviceWorker.register('./service.js');
  navigator.serviceWorker.addEventListener("message", push);
  (sr.pushed = new BroadcastChannel('service')).onmessage = push;
  function push(msg){
    console.log("SW message:", msg);
    msg = msg.data;
    if(msg.upgrade){
      console.log("upgrading sandbox!");
      localStorage.sandbox = '';
      return;
    }
  }
}catch(e){ console.log(e) };}

}());