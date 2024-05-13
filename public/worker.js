var CACHE_NAME = "cache-split-pwa";
const version = "0.0.1"

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            //if supervisor not exist , you should change addAll to /offline.html /offline.css /eb0d9c6914c753f76252.ttf
            return cache.addAll([
                "/offline.html",
                "/offline.css",
                //if you want cache the first page , add "/"
            ])
            
        })
    )
})
// Inside the service worker’s activate event, delete all previously cached files if necessary
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (CACHE_NAME !== cacheName && cacheName.startsWith("cache")) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
  console.log("Fetch intercepted fhhhor:", event.request.url, event.request.mode);
    if (event.request.mode === 'navigate' ||
        (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch(event.request.url).catch(error => {
                //if supervisor not exist , you should change match to /offline.html
                console.log("Fetch failed; returning offline page instead.", error);

                return caches.match("offline.html");
            })
        );
    } else {
        // if the resources arent in the cache , they are requested from the server
        event.respondWith(caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});

self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});