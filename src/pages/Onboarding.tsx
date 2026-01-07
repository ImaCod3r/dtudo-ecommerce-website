import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { updateUser } from '../services/auth';
import { useAlert } from '../context/AlertContext';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';
import Logo from '../components/Logo';

export default function Onboarding() {
    const { user, refreshUser } = useAuth();
    const { showSuccess, showError } = useAlert();
    const [phone, setPhone] = useState(user?.phone || '');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.phone) {
            setPhone(user.phone);
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) return;

        setLoading(true);
        try {
            await updateUser({ phone });
            await refreshUser();
            showSuccess('Perfil atualizado com sucesso!');
            navigate('/');
        } catch (error) {
            showError('Erro ao atualizar perfil');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <Logo />
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-500/5">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black text-gray-900 mb-2">
                            Bem-vindo, {user?.name?.split(' ')[0]}!
                        </h1>
                        <p className="text-gray-500">
                            Para garantir a melhor experiência de entrega, precisamos do seu número de telefone.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                                Seu Telefone (WhatsApp)
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    required
                                    type="tel"
                                    placeholder="900 000 000"
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#008cff] outline-none text-gray-900 font-medium"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !phone}
                            className="w-full bg-[#008cff] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#007ad6] transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-500/20"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Continuar <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full mt-4 text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
                    >
                        Pular por enquanto
                    </button>
                </div>
            </div>
        </div>
    );
}
