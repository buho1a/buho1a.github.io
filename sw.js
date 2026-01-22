const CACHE_NAME = 'alarma-v1';
const assets = ['index.html', 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'];

// Instalar el Service Worker
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

// Escuchar peticiones
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
