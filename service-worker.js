
/**
 * PromptCraft — Service Worker v3
 * Soporte offline para archivos estáticos (App Shell).
 * No cachea respuestas de Firebase Firestore.
 */

const CACHE_NAME = 'promptcraft-v3';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/admin.html',
    '/styles.css',
    '/app.js',
    '/admin.js',
    '/firebase-config.js',
    '/manifest.json',
    '/logo.PNG'
];

// Instalación: cachear app shell y activar sin esperar
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
    );
});

// Activación: limpiar versiones viejas de caché
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: servir desde caché para estáticos y red para el resto
self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // No cachear peticiones a servicios externos (Firestore, Google APIs, etc.)
    if (url.origin !== location.origin) return;

    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;
            return fetch(request).then(response => {
                if (response.ok && url.pathname.endsWith('.html')) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
                }
                return response;
            }).catch(() => {
                // Si no hay red y no hay copia en caché, devolvemos la página principal
                return caches.match('/index.html');
            });
        })
    );
});
