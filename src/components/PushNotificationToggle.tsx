import { Bell, BellOff, Loader2 } from 'lucide-react';
import { usePushNotifications } from '../hooks/usePushNotifications';

interface PushNotificationToggleProps {
    className?: string;
    showLabel?: boolean;
}

export default function PushNotificationToggle({
    className = '',
    showLabel = true
}: PushNotificationToggleProps) {
    const { isSubscribed, isLoading, permissionStatus, subscribe } = usePushNotifications();

    // Se notificações não são suportadas, não mostrar nada
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        return null;
    }

    const handleToggle = async () => {
        if (!isSubscribed && permissionStatus !== 'denied') {
            await subscribe();
        }
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {showLabel && (
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        Notificações Push
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isSubscribed
                            ? '✅ Você receberá atualizações sobre seus pedidos'
                            : permissionStatus === 'denied'
                                ? '❌ Bloqueadas nas configurações do navegador'
                                : '🔔 Receba atualizações sobre seus pedidos'
                        }
                    </p>
                </div>
            )}

            <button
                onClick={handleToggle}
                disabled={isLoading || isSubscribed || permissionStatus === 'denied'}
                className={`
          relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm
          transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
          ${isSubscribed
                        ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 cursor-default'
                        : permissionStatus === 'denied'
                            ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 cursor-not-allowed'
                            : 'bg-[#008cff] text-white hover:bg-blue-600 active:scale-95'
                    }
        `}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Ativando...</span>
                    </>
                ) : isSubscribed ? (
                    <>
                        <Bell className="w-4 h-4" />
                        <span>Ativadas</span>
                    </>
                ) : permissionStatus === 'denied' ? (
                    <>
                        <BellOff className="w-4 h-4" />
                        <span>Bloqueadas</span>
                    </>
                ) : (
                    <>
                        <Bell className="w-4 h-4" />
                        <span>Ativar Notificações</span>
                    </>
                )}
            </button>
        </div>
    );
}
