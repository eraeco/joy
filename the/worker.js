console.log("worker.js LOGGING: serviceworker v6");

var addResourcesToCache = async (resources) => {
    var cache = await caches.open("v1");
    await cache.addAll(resources);
};

var files = [
    "/package.json"
]
var paths = [
    "https://raw.githubusercontent.com/bmatusiak/securerender/main"
]

self.addEventListener("install", (eve) => {
    console.log("INSTALLED", eve);
    console.log("I am now going to get file:", paths[0] + files[0])
    fetch(paths[0] + files[0]).then((r) => r.text().then(data => console.log(JSON.parse(data))))

    // fetch(paths[0] + files[0]).then((r) => r.text().then(data => console.log(data)))

});


self.addEventListener("message", async (eve) => {


    var data = JSON.parse(await (await fetch(paths[0] + files[0])).text());
    console.log("postMessage logging in SW ONmessage v6", data, eve);
});

if(true){
// const putInCache = async (request, response) => {
//     const cache = await caches.open("v1");
//     await cache.put(request, response);
// };

const checkCache = async ( request ) => {
    try {
                
        // First try to get the resource from the cache
        const responseFromNetwork = await fetch(request);//<-- 

        const responseFromCache = await caches.match(request);// <-- our cache

        return responseFromNetwork; // <-- send network version

    } catch (error) {
        
        return new Response('Network error happened', {
            status: 408,
            headers: {
                'Content-Type': 'text/plain'
            },
        });
    }
};

self.addEventListener("fetch", (event) => {
    console.log("THIS IS FETCH LOGGING:", event);
    event.respondWith(
        checkCache({
            request: event.request
        })
    );
});
}