import { useState, useEffect } from 'react';
import api from '../api/axios';

// Função para converter chave VAPID de base64 para Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Função para obter chave VAPID pública do backend
async function getVapidPublicKey(): Promise<string> {
    const response = await api.get('/notifications/vapid-public-key');
    return response.data.publicKey;
}

// Função para registrar inscrição no backend
async function subscribeUserOnBackend(subscription: PushSubscription): Promise<void> {
    // Convertemos para JSON para garantir que todas as propriedades (incluindo keys) sejam enviadas corretamente
    const subscriptionData = subscription.toJSON();

    const response = await api.post('/notifications/subscribe', subscriptionData);

    if (response.data.error) {
        throw new Error(response.data.message || 'Erro ao registrar inscrição no backend');
    }
}

// Função principal para solicitar permissão e inscrever
export async function subscribeToPushNotifications(): Promise<boolean> {
    try {
        // 1. Verificar se notificações são suportadas
        if (!('Notification' in window)) {
            console.warn('Notificações não são suportadas neste navegador');
            return false;
        }

        if (!('serviceWorker' in navigator)) {
            console.warn('Service Worker não é suportado neste navegador');
            return false;
        }

        // 2. Solicitar permissão
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.log('Permissão de notificação negada');
            return false;
        }

        // 3. Aguardar Service Worker estar pronto
        const registration = await navigator.serviceWorker.ready;

        // 4. Verificar se já existe uma inscrição
        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
            // 5. Obter chave VAPID pública
            const publicKey = await getVapidPublicKey();
            const applicationServerKey = urlBase64ToUint8Array(publicKey);

            // 6. Criar nova inscrição
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey as BufferSource
            });
        }

        // 7. Enviar inscrição para o backend
        await subscribeUserOnBackend(subscription);

        console.log('Inscrição de push registrada com sucesso');
        return true;
    } catch (error) {
        console.error('Erro ao se inscrever para notificações push:', error);
        return false;
    }
}

// Função para verificar se o usuário já está inscrito
export async function checkPushSubscription(): Promise<boolean> {
    try {
        if (!('serviceWorker' in navigator) || !('Notification' in window)) {
            return false;
        }

        // Verificar permissão
        if (Notification.permission !== 'granted') {
            return false;
        }

        // Verificar se existe inscrição
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        return subscription !== null;
    } catch (error) {
        console.error('Erro ao verificar inscrição de push:', error);
        return false;
    }
}

// Hook React para gerenciar push notifications
export function usePushNotifications() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

    // Verificar status da permissão e inscrição ao carregar
    useEffect(() => {
        const checkStatus = async () => {
            if ('Notification' in window) {
                setPermissionStatus(Notification.permission);
                const subscribed = await checkPushSubscription();
                setIsSubscribed(subscribed);
            }
        };

        checkStatus();
    }, []);

    const subscribe = async () => {
        setIsLoading(true);
        try {
            const success = await subscribeToPushNotifications();
            setIsSubscribed(success);
            if (success && 'Notification' in window) {
                setPermissionStatus(Notification.permission);
            }
            return success;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isSubscribed,
        isLoading,
        permissionStatus,
        subscribe
    };
}

// Alias para manter compatibilidade com o README
export const registerPushNotifications = subscribeToPushNotifications;
