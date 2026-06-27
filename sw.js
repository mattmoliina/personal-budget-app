// ============================================================
// SERVICE WORKER — sw.js
//
// A service worker is a script that runs in the background,
// separate from your web page. It intercepts network requests
// and can serve files from a local cache instead.
//
// This is what makes the app work offline and load instantly.
// ============================================================

// CACHE NAME — change this string any time you update your files.
// The old cache gets deleted automatically (see the activate event below).
// Good practice: bump the version number when you make changes.
// e.g. "budget-app-v1" → "budget-app-v2"
const CACHE_NAME = "budget-app-v2";

// FILES TO CACHE — every file your app needs to run.
// Add any new files here if you add them to your project.
const FILES_TO_CACHE = [
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  // Chart.js is loaded from a CDN — we cache it too so charts
  // work offline after the first load
  "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"
];


// ============================================================
// INSTALL EVENT
// Fires once when the service worker is first registered.
// We use it to pre-cache all our files.
// ============================================================
self.addEventListener("install", function(event) {

  // waitUntil tells the browser: "don't finish installing
  // until this promise resolves" — so we don't leave
  // a half-installed service worker
  event.waitUntil(

    // caches.open creates (or opens) a named cache
    caches.open(CACHE_NAME).then(function(cache) {

      console.log("Service worker: caching files");

      // cache.addAll fetches every file and stores it locally.
      // If any file fails to fetch, the whole install fails —
      // so make sure every path here actually exists.
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  // skipWaiting forces this service worker to become active
  // immediately instead of waiting for old tabs to close
  self.skipWaiting();
});


// ============================================================
// ACTIVATE EVENT
// Fires when this service worker takes control.
// We use it to clean up old caches from previous versions.
// ============================================================
self.addEventListener("activate", function(event) {

  event.waitUntil(

    // caches.keys() gives us a list of all cache names
    caches.keys().then(function(cacheNames) {

      // Promise.all runs multiple promises at the same time
      return Promise.all(

        // Filter to only caches that are NOT the current one
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          // Delete each old cache
          .map(function(name) {
            console.log("Service worker: deleting old cache", name);
            return caches.delete(name);
          })
      );
    })
  );

  // Take control of all open tabs immediately
  self.clients.claim();
});


// ============================================================
// FETCH EVENT
// Fires every time the app makes a network request
// (loading a file, fetching an API, etc.)
//
// Strategy: "Cache first, network fallback"
// 1. Check if we have the file in cache → serve it instantly
// 2. If not in cache → fetch from network as normal
//
// This means the app loads instantly on repeat visits,
// and still works if you're offline.
// ============================================================
self.addEventListener("fetch", function(event) {

  event.respondWith(

    // Try to find the request in the cache
    caches.match(event.request).then(function(cachedResponse) {

      // If we found it in cache, return it immediately
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch it from the network
      // This also handles API calls (like Claude's API later)
      // since those won't be in the cache
      return fetch(event.request);
    })
  );
});
