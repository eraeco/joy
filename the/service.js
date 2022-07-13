// console.log("worker.js LOGGING: serviceworker v6");

var CACHE = 'CACHEv1';

self.addEventListener("fetch", (event) => {
  // console.log("THIS IS FETCH LOGGING:", event);
  event.respondWith(
    check2Cache(event)
  );
});

// var remote_manifests = 

var remote_manifests_paths = [
  "https://cdn.jsdelivr.net/gh/bmatusiak/securerender@main/the",
  "https://raw.githubusercontent.com/bmatusiak/securerender/main/the"
]

var remote_manifests = []
for (var k in remote_manifests_paths) {
  remote_manifests.push(remote_manifests_paths[k] + "/package.json")
}

var shim_manifest = "./package.json"

var files = {};

var shim_manifest_data;

function checkFileIntegrity(checkFile, fileData) {
  return new Promise(async (resolve) => {

    //hash file contents
    var hash = btoa(String.fromCharCode.apply(null, new Uint8Array(
      await crypto.subtle.digest('SHA-256', (new TextEncoder()).encode(fileData))
    )));

    var checksPassed = true; //expect result to be true

    shim_manifest_data = JSON.parse(await (await fetch(shim_manifest + "?#!" + +new Date)).text()).integrity
    var $hash = shim_manifest_data[checkFile]
    if ($hash) {
      if ($hash != hash) {
        checksPassed = false;
        console.error("SecureRender found a different integrity value for", checkFile, hash)
      }
    }

    for (var i in remote_manifests) {
      var remote_manifest_data = JSON.parse(await (await fetch(remote_manifests[i] + "?#!" + +new Date)).text()).integrity
      $hash = remote_manifest_data[checkFile]
      if ($hash) {
        if ($hash != hash) {
          console.warn("SecureRender found that", remote_manifests[i], "has a different integrity value for", checkFile, hash)
        }
      }
    }

    if (checksPassed == false) {
      // console.error("check failed", checkFile, hash)//trigger message to update or change something to give notice
      resolve(false);
    } else {
      // console.log("check passed", checkFile, hash)
      resolve(true);
    }
  })
}



self.addEventListener('activate', async (eve) => {
  // console.log("?activate");
});

self.addEventListener("install", async (eve) => {
  // console.log("?install")
});

self.addEventListener("message", async (eve) => {
  // console.log("?message")
});

async function putInCache(request, response) {
  var cache = await caches.open("v1");
  await cache.put(request, response);
};
async function removeFromCache(request){
  var cache = await caches.open("v1");
  await cache.delete(request);
};

async function checkCache(event, request) {
  if (!request) request = event.request;
  try {

    var responseFromCache = await caches.match(request); // <-- our cache
    var responseFromNetwork = await fetch(request); //<-- our network fetch

    if (!responseFromCache) {
      putInCache(request, responseFromNetwork.clone());
      return responseFromNetwork; // <-- send network version
    } else {
      var clone = responseFromNetwork.clone();
      var contence = await clone.text();
      await checkFileIntegrity(clone.url.split("/").pop(), contence);
      return responseFromCache; // <-- send cache version
    }
  } catch (error) {

    return new Response('Network error happened', {
      status: 408,
      headers: {
        'Content-Type': 'text/plain'
      },
    });
  }
};

function check2Cache(event) {
  return new Promise(async (resolve) => {
    try {
      var request = event.request,
        cache = caches.match(request), // <-- our cache
        reply = fetch(request); // <-- our network fetch
      
      if (cache = await cache) {
        resolve(cache);
      }
      resolve(reply = await reply);
      
      // do integrity check
      var clone = reply.clone();
      var contence = await clone.text();
      console.log("what are we loading?", clone.url);
      var safe = await checkFileIntegrity(clone.url.split("/").pop(), contence);
      if(!safe){
        throw "unsafe";
        return;
      }

      var upgrade = true; // prompt user if want to upgrade
      console.log("ASK USER TO UPGRADE, WE ARE ASSUMING YES IN THIS ALPHA");
      if(!upgrade){ return }

      putInCache(request, reply.clone());
    } catch (error) {
      resolve(new Response('Network error happened', {
        status: 408,
        headers: {
          'Content-Type': 'text/plain'
        },
      }))
    }
  })
};