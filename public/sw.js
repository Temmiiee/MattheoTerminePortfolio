// Minimal Service Worker - Only for offline fallback
// Version 4 - No caching of dynamic content
const CACHE_NAME = 'mattheo-termine-v4';

// Install - skip waiting immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate - clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete all old caches
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch - MINIMAL intervention, only for offline support
self.addEventListener('fetch', (event) => {
  // Don't intercept anything - let all requests go through normally
  // This prevents any caching issues with Next.js
  return;
});
