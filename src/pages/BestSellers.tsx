import { TrendingUp, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function BestSellers() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="bg-blue-50 p-6 rounded-full mb-6 animate-pulse">
                <TrendingUp className="w-16 h-16 text-[#028DFE]" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Mais Vendidos</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
                Os produtos mais procurados aparecerão aqui. Esta página estará disponível brevemente.
            </p>
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-6 py-3 bg-[#028DFE] text-white rounded-full font-medium hover:bg-blue-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
            >
                <ArrowLeft className="w-5 h-5" />
                Voltar para o Início
            </button>
        </div>
    );
}

export default BestSellers;
