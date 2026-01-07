import { Truck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Shipping() {
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

                <div className='flex items-center gap-2 mb-8'>
                    <div className="bg-blue-50 dark:bg-blue-900/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-8">
                        <Truck className="w-10 h-10 text-[#028dfe]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 text-left">Informações de Envio</h1>
                </div>


                <div className="prose prose-lg dark:prose-invert space-y-8 text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-left max-w-none">
                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Zonas de Entrega</h2>
                        <p>Atualmente realizamos entregas em todos os municípios da providência de Luanda e também para a província de Cabinda.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Prazos Estimados</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Luanda:</strong> 24h a 48h úteis após confirmação do pedido.</li>
                            <li><strong>Cabinda:</strong> 3 a 5 dias úteis, dependendo da disponibilidade de carga aérea.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Custos de Envio</h2>
                        <p>O custo de envio é calculado automaticamente no checkout com base na distância da nossa loja até à morada de entrega.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Shipping;
