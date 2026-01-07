self.addEventListener('push', (event) => {
    if (event.data) {
        const payload = event.data.json();
        const options = {
            body: payload.body,
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
            data: { url: payload.url || '/' },
            vibrate: [100, 50, 100],
            tag: 'notification-' + new Date().getTime(),
        };

        event.waitUntil(
            self.registration.showNotification(payload.title, options)
        );
    }
});

// Tratar clique na notificação
self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    const urlToOpen = event.notification.data.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(function (clientList) {
                // Se já houver uma janela aberta, focar nela
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        return client.focus().then(() => client.navigate(urlToOpen));
                    }
                }
                // Caso contrário, abrir nova janela
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// Ativar service worker imediatamente
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});
