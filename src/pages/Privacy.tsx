import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

function Privacy() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-20">
            <SEO
                title="Política de Privacidade"
                description="Saiba como a Dtudo Store recolhe, usa e protege seus dados pessoais."
            />
            <div className="max-w-3xl mx-auto text-left">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#028dfe] transition-colors mb-8 font-bold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                </button>

                <div className='flex items-center gap-2 mb-8'>
                    <div className="bg-blue-50 dark:bg-blue-900/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-8">
                        <ShieldCheck className="w-10 h-10 text-[#028dfe]" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">Política de Privacidade</h1>
                </div>


                <div className="prose prose-lg dark:prose-invert space-y-8 text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">1. Recolha de Dados</h2>
                        <p>Recolhemos informações pessoais apenas quando necessário para processar as suas encomendas e melhorar a sua experiência no nosso site. Isto inclui nome, e-mail, telefone e morada.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">2. Uso da Informação</h2>
                        <p>Os seus dados são utilizados exclusivamente para o processamento de pedidos, comunicações sobre o estado da encomenda e envio de promoções (apenas se autorizado).</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">3. Proteção de Dados</h2>
                        <p>Implementamos medidas de segurança técnicas e organizacionais para proteger os seus dados pessoais contra acessos não autorizados, perda ou destruição.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Privacy;
