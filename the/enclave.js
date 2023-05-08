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
sr = {browser: (window.browser || window.chrome)};
try{ !sr.browser && navigator.serviceWorker.register('./service.js') }catch(e){};

(function start(i){
  // TODO: talk to cloudflare about enforcing integrity meanwhile?
  i = sr.i = document.createElement('iframe');
  i.className = 'SecureRender';
  i.style = "position: fixed; border: 0; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0;";
  i.sandbox = 'allow-scripts allow-popups allow-downloads allow-pointer-lock';
  i.csp = "script-src 'self'; default-src data: blob: mediastream: filesystem:; style-src 'self' 'unsafe-inline'; child-src 'self' blob:; worker-src blob: 'self';";
  sr.send = function(msg){ i.contentWindow.postMessage(msg, '*') } // TODO: AUDIT! THIS LOOKS SCARY, BUT '/' NOT WORK FOR SANDBOX 'null' ORIGIN. IS THERE ANYTHING BETTER?
  console.log("THIS IS AN EARLY PUBLISHED DEMO WITH 2 UNFINISHED IMPORTANT SECURITY CHECKS, PLEASE DELETE SERVICE WORKER AFTER USE.");
  i.src = "./sandbox.html";
  document.body.appendChild(i);
}());

window.onmessage = function(eve){
  eve.preventDefault();
  eve.stopImmediatePropagation();
  var msg = eve.data, tmp, u;
  //console.log("ENCLAVE ONMESSAGE", msg);
  if(!msg){ return }
  //if(eve.origin !== location.origin){ console.log('meow?',eve); return }
  if(eve.source !== sr.i.contentWindow){ return sr.send(msg) }
  tmp = sr.how[msg.how];
  if(!tmp){ return }
  tmp(msg, eve);
};

sr.how = {
  // localStorage is not async, so here is a quick async version for testing.
  localStore: function(msg, eve){ var u;
    if(u !== msg.put){
      localStorage.setItem(msg.get, JSON.stringify(msg.put));
    } else
    if(msg.get){
      sr.send({to: msg.via, ack: msg.ack, ask: [JSON.parse(localStorage.getItem(msg.get))], how: 'localStore'});
    }
  }
}

window.addEventListener('storage', function(msg){
  sr.send({to: 1, get: msg.key, put: JSON.parse(msg.newValue), how: 'localStore'});
});

}());