import { Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../auth/useAuth';
import { Link, useLocation } from 'react-router-dom';

export default function PhoneAlert() {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated || !user || user.phone || location.pathname === '/onboarding') {
        return null;
    }

    return (
        <div className="bg-linear-to-r from-blue-600 to-blue-400 text-white py-2 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-hidden">
                    <div className="bg-white/20 p-1.5 rounded-lg shrink-0">
                        <Phone className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm font-bold truncate">
                        Complete seu perfil com seu telefone para poder fazer pedidos!
                    </p>
                </div>
                <Link
                    to="/onboarding"
                    className="flex items-center gap-1.5 bg-white text-blue-600 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider hover:bg-blue-50 transition-colors shrink-0"
                >
                    Adicionar <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
}
