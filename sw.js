self.addEventListener('message', (event) => {
    if (event.data.type === 'PROGRAMAR_ALARMA') {
        const tiempoEspera = event.data.ms;
        
        // El SW no puede ser cancelado fácilmente desde afuera con setTimeout simple,
        // pero lanzará la notificación en el tiempo calculado.
        setTimeout(() => {
            self.registration.showNotification("¡HORA CUMPLIDA!", {
                body: "Tu alarma está sonando",
                icon: "https://cdn-icons-png.flaticon.com/512/182/182321.png",
                vibrate: [500, 100, 500],
                tag: 'alarma-unica',
                requireInteraction: true
            });
        }, tiempoEspera);
    }
});
