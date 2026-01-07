import { RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Returns() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#028dfe] transition-colors mb-8 font-bold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                </button>

                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-8">
                        <RefreshCw className="w-10 h-10 text-[#028dfe]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-left">Devoluções e Reembolsos</h1>
                </div>


                <div className="prose prose-lg dark:prose-invert space-y-8 text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-left max-w-none">
                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Condições para Devolução</h2>
                        <p>O cliente tem o direito de devolver qualquer produto num prazo de 7 dias úteis após a receção, desde que:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>O produto esteja na embalagem original e inviolada.</li>
                            <li>Não apresente sinais de uso ou danos acidentais.</li>
                            <li>Esteja acompanhado da fatura original.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Processo de Reembolso</h2>
                        <p>Após a receção e verificação do produto nas nossas instalações, o reembolso será processado via transferência bancária num prazo máximo de 5 dias úteis.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Returns;
