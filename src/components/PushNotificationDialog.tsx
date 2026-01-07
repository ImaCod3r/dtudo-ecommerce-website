import { useState, useEffect } from 'react';
import { Bell, BellOff, X, Loader2, Settings } from 'lucide-react';
import { usePushNotifications } from '../hooks/usePushNotifications';

export default function PushNotificationDialog() {
    const { isSubscribed, isLoading, permissionStatus, subscribe } = usePushNotifications();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Se notificações não são suportadas, não mostrar nada
        if (!('Notification' in window) || !('serviceWorker' in navigator)) {
            return;
        }

        // Exibe o dialog se não estiver inscrito e a permissão não for concedida
        if (permissionStatus !== 'granted' && !isSubscribed) {
            const timer = setTimeout(() => {
                const dismissed = sessionStorage.getItem('push_notification_dismissed');
                if (!dismissed) {
                    setIsVisible(true);
                }
            }, 3000); // 3 segundos de delay para não ser invasivo logo de cara
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [permissionStatus, isSubscribed]);

    const handleSubscribe = async () => {
        if (permissionStatus === 'denied') {
            // Se já foi negado, não podemos fazer nada via código além de orientar
            window.alert('As notificações estão bloqueadas no seu navegador. Por favor, ative-as nas configurações do site (índice de cadeado na barra de endereços).');
            return;
        }

        const success = await subscribe();
        if (success) {
            setIsVisible(false);
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('push_notification_dismissed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-10 fade-in duration-500 px-4 md:px-0">
            <div className="bg-white dark:bg-gray-800 rounded-4xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#008cff]/10 rounded-full blur-3xl group-hover:bg-[#008cff]/20 transition-all duration-500"></div>

                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 ${permissionStatus === 'denied' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-[#008cff]/10 dark:bg-[#008cff]/20'} rounded-2xl flex items-center justify-center shrink-0`}>
                        {permissionStatus === 'denied' ? (
                            <BellOff className="w-6 h-6 text-red-500" />
                        ) : (
                            <Bell className="w-6 h-6 text-[#008cff] animate-bounce" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight mb-1">
                            {permissionStatus === 'denied' ? 'Notificações Bloqueadas' : 'Receber Atualizações?'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            {permissionStatus === 'denied'
                                ? 'Você desativou as notificações. Ative-as para acompanhar seus pedidos em tempo real.'
                                : 'Fique por dentro do status dos seus pedidos e receba ofertas exclusivas diretamente no seu dispositivo.'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleSubscribe}
                        disabled={isLoading}
                        className={`w-full ${permissionStatus === 'denied' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'bg-[#008cff] text-white'} py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 shadow-lg ${permissionStatus === 'denied' ? 'shadow-black/5' : 'shadow-[#008cff]/20'}`}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : permissionStatus === 'denied' ? (
                            <>
                                <Settings className="w-5 h-5" />
                                <span>Como Ativar</span>
                            </>
                        ) : (
                            <>
                                <Bell className="w-5 h-5" />
                                <span>Ativar Notificações</span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="w-full py-2 text-sm font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        Agora não, obrigado
                    </button>
                </div>
            </div>
        </div>
    );
}
