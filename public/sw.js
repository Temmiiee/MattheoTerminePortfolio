// Production Service Worker for Matthéo Termine Portfolio
const CACHE_NAME = 'mattheo-termine-v2';
const STATIC_CACHE = 'static-v2';

// Only cache truly static assets - NOT Next.js chunks
const urlsToCache = [
  '/',
  '/manifest.webmanifest',
  '/images/mattheo-termine-photo.png',
  '/cv-mattheo-termine.pdf',
  '/favicon.ico'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch((err) => {
          console.warn('Failed to cache some resources:', err);
          // Continue even if some resources fail to cache
          return Promise.resolve();
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - Network first strategy with proper error handling
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip Next.js internal requests and chunks
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.includes('hot-update') ||
    url.pathname.includes('webpack')
  ) {
    // Let Next.js handle its own resources - don't cache or intercept
    return;
  }

  // Network-first strategy for everything else
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Only cache successful responses
        if (response && response.status === 200) {
          // Clone the response before caching
          const responseToCache = response.clone();
          
          // Only cache GET requests for static assets
          if (request.method === 'GET' && 
              (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|ico|pdf|woff|woff2)$/) || 
               url.pathname === '/')) {
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
        }
        return response;
      })
      .catch((error) => {
        // On network failure, try to serve from cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // If not in cache and it's a navigation request, return cached homepage
          if (request.mode === 'navigate') {
            return caches.match('/').then((homeResponse) => {
              return homeResponse || new Response('Offline - Please check your connection', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/plain'
                })
              });
            });
          }
          
          // For other requests, throw the error
          throw error;
        });
      })
  );
});
