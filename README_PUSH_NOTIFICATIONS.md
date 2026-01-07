# Guia de Implementação: Web Push Notifications (Frontend)

Este guia explica como a IA do Frontend deve implementar as notificações push para que tanto administradores quanto clientes recebam alertas em tempo real.

## 🚀 Visão Geral
O sistema utiliza o protocolo **Web Push**. O fluxo consiste em:
1. Obter a Chave Pública VAPID do backend.
2. Solicitar permissão ao usuário.
3. Registrar um Service Worker.
4. Gerar uma `subscription` do navegador.
5. Enviar essa `subscription` para o backend salvar.

---

## 📡 Endpoints do Backend

### 1. Obter VAPID Public Key
- **URL:** `GET /notifications/vapid-public-key`
- **Retorno:** `{ "publicKey": "..." }`

### 2. Salvar Inscrição
- **URL:** `POST /notifications/subscribe`
- **Headers:** `Content-Type: application/json` (Requer autenticação via Cookie)
- **Body:** O objeto `PushSubscription` completo retornado pelo navegador.

---

## 👨‍💻 Passo a Passo da Implementação

### 1. Service Worker (`service-worker.js`)
O Service Worker deve ser colocado na raiz da pasta pública. Ele é responsável por mostrar a notificação quando o evento `push` chega.

```javascript
/* public/service-worker.js */

self.addEventListener('push', (event) => {
    if (event.data) {
        const payload = event.data.json();
        const options = {
            body: payload.body,
            icon: '/icon-192x192.png', // Substitua pelo ícone real
            badge: '/badge-72x72.png',  // Substitua pelo badge real
            data: { url: payload.url }, // Link para onde redirecionar
            vibrate: [100, 50, 100],
        };

        event.waitUntil(
            self.registration.showNotification(payload.title, options)
        );
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});
```

### 2. Lógica de Inscrição (Frontend)
Você precisará de uma função utilitária para converter a chave VAPID (que vem em Base64 do backend) para o formato `Uint8Array` exigido pelo navegador.

```typescript
function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export const registerPushNotifications = async () => {
    try {
        // 1. Obter chave pública
        const res = await fetch('http://localhost:5000/notifications/vapid-public-key');
        const { publicKey } = await res.json();

        // 2. Registrar/Aguardar Service Worker
        const registration = await navigator.serviceWorker.ready;

        // 3. Solicitar Inscrição
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)
        });

        // 4. Enviar ao Backend
        await fetch('http://localhost:5000/notifications/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        console.log('Inscrição push realizada com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar push:', error);
    }
};
```

---

## 🔔 Quando chamar a inscrição?
- **Para Admins:** Chame a função `registerPushNotifications()` logo após o login no painel administrativo.
- **Para Clientes:** Pode ser chamado após o login ou através de um botão "Ativar Notificações" no perfil.

## 🧪 Como Testar
1. Registre-se como admin no painel.
2. Ative as notificações (aceite a permissão do browser).
3. Faça um pedido como um usuário comum.
4. Você deverá receber uma notificação instantânea: *"Novo Pedido Recebido! 🛍️"*.
5. Como admin, mude o status do pedido para "Confirmado".
6. O cliente (se estiver com push ativo) receberá: *"Pedido Confirmado! ✅"*.

---

### Notas de Segurança
- Certifique-se de que o Service Worker está sendo servido via **HTTPS** em produção.
- Use `credentials: 'include'` no fetch para garantir que o backend identifique *qual* usuário está enviando a inscrição.
