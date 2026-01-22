const CACHE_NAME = 'alarma-v2';
const assets = ['./', './index.html'];

// Instalar y cachear archivos
self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

// Activar inmediatamente
self.addEventListener('activate', () => self.clients.claim());

// Escuchar mensajes desde la App (index.html)
self.addEventListener('message', (event) => {
    if (event.data.type === 'PROGRAMAR_ALARMA') {
        const tiempoEspera = event.data.ms;

        // Programar la notificación para el futuro
        setTimeout(() => {
            self.registration.showNotification("¡HORA CUMPLIDA!", {
                body: "Toca para detener la alarma.",
                icon: "https://cdn-icons-png.flaticon.com/512/182/182321.png",
                vibrate: [500, 110, 500, 110, 500],
                tag: 'alarma-tag',
                requireInteraction: true // No desaparece sola
            });
        }, tiempoEspera);
    }
});

// Al tocar la notificación, abre la app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            if (windowClients.length > 0) return windowClients[0].focus();
            return clients.openWindow('./');
        })
    );
});
