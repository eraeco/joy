;(function(){
if(window.browser || window.chrome){ return } // don't run SW in extension!
return; // TODO: Implement bug free logic!
var PRE = 'precache-v1', RUN = 'RUN', urls = [
  './content.js',
  './enclave.html',
  './enclave.js',
  './sandbox.html',
  './sandbox.js',
  './layout.css'
];

self.addEventListener('install', async function(eve){
  eve.waitUntil((await caches.open(PRE)).addAll(urls)).then(self.skipWaiting());
});

return; // CODE BELOW WAS COPIED FROM A TUTORIAL, EDIT/REPLACE:
// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', function(eve){
  var currentCaches = [PRE, RUN];
  eve.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the RUN cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUN).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the RUN cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});

}());