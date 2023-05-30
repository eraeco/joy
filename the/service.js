//console.log("ServiceWorker#E"); caches.keys().then(function(names){ for(let name of names){ caches.delete(name) }; console.log("SW CACHE CLEARED") }); // THIS LINE FOR DEBUGGING! DO NOT COMMIT!

self.addEventListener("fetch", (event) => {
  //console.log("SW fetch:", event);
  event.respondWith(cached(event));
});

self.addEventListener('activate', async (eve) => {
  //console.log("activate?");
});

self.addEventListener("install", async (eve) => {
  //console.log("install?")
});

self.addEventListener("message", async (eve) => {
  //console.log("SW on:", eve);
  var msg = eve.data, tmp = sr.how[msg.how];
  if(!tmp){ return }
  tmp(msg, eve);
});

var sr = {}, mem = {};
sr.how = {
  store: function(msg, eve){ var u;
    console.log("SW store", msg, mem);
    if(u !== msg.put){
      store.put(msg.get, JSON.stringify(msg.put), function(err,ack){ console.log("eIdb.put", err, ack) });
      //mem[msg.get] = msg.put;
    } else
    if(msg.get){
       store.get(msg.get, function(err,data){ console.log("eIdb.get", err, data); eve.ports[0].postMessage({to: msg.via, ack: msg.ack, ask: [JSON.parse(data)], how: 'store'}); });
    }
  }
}

async function recache(req, res) {
  var cache = await caches.open("v1");
  await cache.put(req, res);
};
async function uncache(req){
  var cache = await caches.open("v1");
  await cache.delete(req);
};

function cached(event){ return new Promise(async (resolve) => { try{
  var req = event.request, cache, reply;
  if(cache = await caches.match(req)){ // our cache
    resolve(cache);
    if((+new Date - age) < (1000 * 60 * 60 * 24)){ return } // don't check for upgrade except once a day.
  }
  reply = await fetch(req); // network fetch
  if(!cache){ // if there is no cache, like on first load, boot & cache.
    resolve(reply);
    recache(req, reply.clone()); // Note: Later we may want first load to do an upgrade/integrity check also.
    return;
  }
  
  // do integrity check
  var clone = reply.clone(), text = await clone.text();
  var safe = await compare(clone.url.split("/").pop(), text);
  if(!safe){
    console.log("Updates do not match original source code!");
    throw "unsafe"; return;
  }

  var upgrade = true; // prompt user if want to upgrade
  console.log("ASK USER TO UPGRADE, WE ARE ASSUMING YES IN THIS ALPHA");
  if(!upgrade){ return }

  recache(req, reply.clone());
  setTimeout(function(){ age = +new Date }, 9000);

  try{
    self.clients.matchAll().then(function(clients){clients.forEach(function(client){client.postMessage({upgrade:1})})});
    (sr.out = sr.out || new BroadcastChannel('service')).postMessage({upgrade:1});
  }catch(e){console.log("SW upgrade error:",e)}
} catch(err){
  resolve(new Response('Network error happened', {
    status: 408,
    headers: {
      'Content-Type': 'text/plain'
    },
  }))
}})};


var upgrade;
var age = +new Date;
var check = ['https://raw.githubusercontent.com/eraeco/joy/master/the/'];

async function hash(text){
  return btoa(String.fromCharCode.apply(null, new Uint8Array(
    await crypto.subtle.digest('SHA-256', (new TextEncoder()).encode(text))
  )));
}
function compare(name, now) { return new Promise(async (resolve) => {
  //hash file contents
  var sum = await hash(now), c = 0;
  check.forEach(async function(path){
    var origin = await fetch(path + name + "?#!" + (+new Date));
    origin = await origin.text();
    if(await hash(origin) === sum){ c++ }
  });
  console.log("COMPARE?", name, sum, c, check.length);
  if(check.length === c){
    resolve(true);
    return;
  }
  resolve(false);
})}

var store = Store();
function Store(opt){
  opt = opt || {};
  opt.file = String(opt.file || 'sr');
  var store = Store[opt.file], db = null, u;
  store = function(){};

  store.start = function(){
    var o = indexedDB.open(opt.file, 1);
    o.onupgradeneeded = function(eve){ (eve.target.result).createObjectStore(opt.file) }
    o.onsuccess = function(){ db = o.result }
    o.onerror = function(eve){ console.log(eve||1); }
  }; store.start();

  store.put = function(key, data, cb){
    if(!db){ setTimeout(function(){ store.put(key, data, cb) },1); return }
    var tx = db.transaction([opt.file], 'readwrite');
    var obj = tx.objectStore(opt.file);
    var req = obj.put(data, ''+key);
    req.onsuccess = obj.onsuccess = tx.onsuccess = function(){ cb(null, 1) }
    req.onabort = obj.onabort = tx.onabort = function(eve){ cb(eve||'put.tx.abort') }
    req.onerror = obj.onerror = tx.onerror = function(eve){ cb(eve||'put.tx.error') }
  }

  store.get = function(key, cb){
    if(!db){ setTimeout(function(){ store.get(key, cb) },9); return }
    var tx = db.transaction([opt.file], 'readonly');
    var obj = tx.objectStore(opt.file);
    var req = obj.get(''+key);
    req.onsuccess = function(){ cb(null, req.result) }
    req.onabort = function(eve){ cb(eve||4) }
    req.onerror = function(eve){ cb(eve||5) }
  }
  setInterval(function(){ db && db.close(); db = null; store.start() }, 1000 * 15); // reset webkit bug?
  return store;
}