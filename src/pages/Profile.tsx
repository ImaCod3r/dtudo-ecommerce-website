import { useState, useEffect } from 'react';
import { Package, MapPin, Settings, LogOut, ChevronRight, ShoppingBag, Home, Trash2, Loader2, X, Phone, Calendar, CreditCard } from 'lucide-react';

// Services
import { getUserOrders } from '../services/order';
import { getAddresses, deleteAddress } from '../services/address';

// Hooks
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';

// Utils
import { formatPrice } from '../utils/formatPrice';

// Types
import type { Order, Address } from '../types';
import { BASE_URL } from '../api/axios';

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { showSuccess, showError } = useAlert();
    // States
    const [activeSection, setActiveSection] = useState<'orders' | 'addresses'>('orders');
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const fetchOrders = async () => {
        try {
            const response = await getUserOrders();
            console.log('Orders Response:', response);
            if (Array.isArray(response)) {
                setOrders(response);
            } else if (response && Array.isArray(response.orders)) {
                setOrders(response.orders);
            } else if (response && Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                console.error('Formato de resposta inesperado:', response);
                setOrders([]);
            }
        } catch (error) {
            showError('Erro ao buscar pedidos');
            console.error('Erro ao buscar pedidos:', error);
        }
    };

    const fetchAddresses = async () => {
        setIsLoadingAddresses(true);
        try {
            const data = await getAddresses();

            if (!data) {
                showError('Nenhum endereço encontrado');
                setAddresses([]);
                return;
            }
            setAddresses(Array.isArray(data?.addresses) ? data.addresses : []);
        } catch (error) {
            console.error('Erro ao buscar endereços:', error);
            setAddresses([]);
        } finally {
            setIsLoadingAddresses(false);
        }
    }

    const handleDeleteAddress = async (id: number) => {
        const previousAddresses = [...addresses];
        setAddresses(prev => prev.filter(addr => addr.id !== id));

        try {
            await deleteAddress(id);
            showSuccess('Endereço excluído com sucesso');
        } catch (error) {
            setAddresses(previousAddresses);
            showError('Erro ao excluir endereço');
            console.error('Erro ao excluir endereço:', error);
        }
    }

    useEffect(() => {
        if (activeSection === 'orders') {
            fetchOrders();
        } else if (activeSection === 'addresses') {
            fetchAddresses();
        }
    }, [activeSection]);

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Acesso Negado</h1>
                <p className="text-gray-500 mb-8">Por favor, faça login para ver seu perfil e histórico de pedidos.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-[#008cff] text-white px-8 py-3 rounded-2xl font-bold"
                >
                    Fazer login
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* User Header */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-center gap-8 mb-8 transition-colors duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#008cff]/20 shadow-lg">
                    <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{user?.name}</h1>
                    <p className="text-gray-500 mb-4">{user?.email}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <span className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-100 dark:border-green-800 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Cliente Verificado
                        </span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-3 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                    <button
                        onClick={logout}
                        className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Sidebar */}
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Minha Conta</h3>
                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveSection('orders')}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${activeSection === 'orders'
                                    ? 'bg-[#008cff]/10 text-[#008cff] font-bold'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Package className="w-5 h-5" /> Pedidos
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setActiveSection('addresses')}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${activeSection === 'addresses'
                                    ? 'bg-[#008cff]/10 text-[#008cff] font-bold'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5" /> Endereços
                                </div>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-4">
                    {activeSection === 'orders' ? (
                        <>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white px-2 flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" /> Pedidos Recentes
                            </h2>

                            {orders?.length === 0 ? (
                                <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px] transition-all">
                                    <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-[#008cff]/10">
                                        <ShoppingBag className="w-12 h-12 text-[#008cff]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        Nenhum pedido ainda
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                                        Você ainda não fez nenhum pedido. Explore nossa loja e descubra produtos incríveis!
                                    </p>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="bg-[#008cff] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                        Começar a Comprar
                                    </button>
                                </div>
                            ) : (
                                orders?.map((order) => (
                                    <div key={order.id} onClick={() => setSelectedOrder(order)} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between group hover:border-[#008cff]/30 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-[#008cff]">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-gray-900 dark:text-white">Pedido #{order.id}</span>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === 'Entregue'
                                                        ? 'bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-400'
                                                        : 'bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400'
                                                        }`}>
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-400">{order.createdAt}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(order.total_price)}</p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedOrder(order);
                                                }}
                                                className="text-xs font-bold text-[#008cff] opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                Ver Detalhes
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white px-2 flex items-center gap-2">
                                <MapPin className="w-5 h-5" /> Meus Endereços
                            </h2>

                            {isLoadingAddresses ? (
                                <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-400">
                                    <Loader2 className="w-8 h-8 animate-spin mb-2 text-[#008cff]" />
                                    <p className="text-sm">Carregando endereços...</p>
                                </div>
                            ) : addresses.length === 0 ? (
                                <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px] transition-all">
                                    <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-[#008cff]/10">
                                        <Home className="w-12 h-12 text-[#008cff]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        Nenhum endereço cadastrado
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                                        Adicione um endereço para facilitar suas compras e entregas futuras.
                                    </p>
                                    <button
                                        className="bg-[#008cff] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                    >
                                        <MapPin className="w-5 h-5" />
                                        Adicionar Endereço
                                    </button>
                                </div>
                            ) : (
                                addresses.map((address) => (
                                    <div key={address.id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm group hover:border-[#008cff]/30 transition-all">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-[#008cff] shrink-0">
                                                    <MapPin className="w-6 h-6" />
                                                </div>

                                                <div className="flex-1">
                                                    <span className="font-semibold text-sm text-left text-gray-900 dark:text-white line-clamp-1">{address.name}</span>
                                                </div>
                                            </div>

                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                                                onClick={() => handleDeleteAddress(address.id)}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {
                selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between z-10">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Detalhes do Pedido</h3>
                                    <p className="text-sm text-gray-500">#{selectedOrder.public_id || selectedOrder.id}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            <div className="p-6 space-y-8">
                                {/* Order Info Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                        <Calendar className="w-5 h-5 text-[#008cff] mb-2" />
                                        <p className="text-xs text-gray-500 mb-1">Data</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                            {new Date(selectedOrder.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                        <CreditCard className="w-5 h-5 text-[#008cff] mb-2" />
                                        <p className="text-xs text-gray-500 mb-1">Total</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {formatPrice(selectedOrder.total_price)}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                        <Package className="w-5 h-5 text-[#008cff] mb-2" />
                                        <p className="text-xs text-gray-500 mb-1">Status</p>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${selectedOrder.status === 'Entregue'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                            }`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                        <Phone className="w-5 h-5 text-[#008cff] mb-2" />
                                        <p className="text-xs text-gray-500 mb-1">Contato</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                            {selectedOrder.phone_number}
                                        </p>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Itens do Pedido</h4>
                                    <div className="space-y-4">
                                        {selectedOrder.items.map((item) => (
                                            <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-[#008cff]/20 transition-colors">
                                                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shrink-0">
                                                    <img
                                                        src={`${BASE_URL}/${item.image}`}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div>
                                                            <p className="text-xs text-[#008cff] font-bold mb-1">{item.category}</p>
                                                            <h5 className="font-bold text-gray-900 dark:text-white line-clamp-2">{item.name}</h5>
                                                        </div>
                                                        <p className="font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                                            {formatPrice(item.price)}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                                                            Qtd: {item.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{formatPrice(selectedOrder.total_price)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-500">Frete</span>
                                        <span className="text-green-500 font-bold">Grátis</span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4 flex justify-between items-center">
                                        <span className="font-bold text-lg text-gray-900 dark:text-white">Total</span>
                                        <span className="font-bold text-xl text-[#008cff]">{formatPrice(selectedOrder.total_price)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Profile;