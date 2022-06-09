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
try{ startServiceWorker() }catch(e){};

(function start(i){
  // TODO: talk to cloudflare about enforcing integrity meanwhile?
  i = sr.i = document.createElement('iframe');
  i.className = 'SecureRender';
  i.style = "position: fixed; border: 0; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0;";
  i.sandbox = 'allow-scripts allow-popups allow-downloads allow-pointer-lock';
  i.csp = "script-src 'self'; default-src data: blob: mediastream: filesystem:; style-src 'self' 'unsafe-inline'; child-src 'self' blob:; worker-src blob: 'self';";
  sr.send = function(msg){ i.contentWindow.postMessage(msg, '*') } // TODO: AUDIT! THIS LOOKS SCARY, BUT '/' NOT WORK FOR SANDBOX 'null' ORIGIN. IS THERE ANYTHING BETTER?
  i.src = "./sandbox.html";
  document.body.appendChild(i);
  (sr.watch = new MutationObserver(function(list, o){ // detect tampered changes, prevent clickjacking, etc.
    sr.watch.disconnect();
    fail(); // immediately stop Secure Render!
    sr.watch.observe(document, sr.scan);
  })).observe(document, sr.scan = {subtree: true, childList: true, attributes: true, characterData: true});
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
      localStorage.setItem(msg.get, msg.put);
    } else
    if(msg.get){
      sr.send({to: msg.via, ack: msg.ack, ask: [localStorage.getItem(msg.get)], how: 'localStore'});
    }
  }
}

window.addEventListener('storage', function(a,b,c,d,e,f){
  console.log("enclave", a,b,c,d,e,f);
});

function startServiceWorker(){
  console.log("MARK LOGGING: enclave v1");
  var reInstalled = false;

  const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
          try {
              const registration = await navigator.serviceWorker.register(
                  './worker.js'
              );
              if(registration.active){
                console.log("???", registration.active.postMessage('u')); 
              }
              console.log("enclave Q?", registration.active, registration.installing, registration.waiting); 
              // return;
              if (registration.installing) {
                  console.log('Service worker installing');
                  reInstalled = true;
                  activeWorker(registration.installing, registration);
              } else if (registration.waiting) {
                  console.log('Service worker installed');
              } else if (registration.active) {
                  console.log('Service worker active');
                  activeWorker(registration.active, registration);
                  reInstalled = true;
              }
              
          } catch (error) {
              console.error(`Registration failed with ${error}`);
          }
      }
  };
  
  function activeWorker(worker, registration) {
    //worker.postMessage
      if (worker && !reInstalled)
          registration.unregister().then(registerServiceWorker)
  }
  
  registerServiceWorker();
}

}());