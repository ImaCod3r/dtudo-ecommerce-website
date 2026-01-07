import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

function Terms() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-20">
            <SEO
                title="Termos de Serviço"
                description="Leia os Termos de Serviço da Dtudo Store. Condições de uso, política de preços e pagamentos."
            />
            <div className="max-w-3xl mx-auto text-left">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#028dfe] transition-colors mb-8 font-bold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                </button>

                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 w-20 h-20 rounded-3xl flex items-center justify-center">
                        <FileText className="w-10 h-10 text-[#028dfe]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white text-left">Termos de Serviço</h1>
                </div>

                <div className="prose prose-lg dark:prose-invert space-y-8 text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">1. Introdução</h2>
                        <p>Bem-vindo à Dtudo Store. Ao utilizar o nosso website e serviços, o utilizador concorda com os seguintes termos e condições. Recomendamos a leitura atenta antes de realizar qualquer compra.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">2. Uso do Site</h2>
                        <p>O utilizador compromete-se a utilizar o site apenas para fins lícitos e de uma forma que não infrinja os direitos de terceiros ou restrinja o uso e fruição do site por parte de outros.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">3. Preços e Pagamentos</h2>
                        <p>Todos os preços estão indicados em Kwanzas (AOA). Reservamos o direito de alterar os preços a qualquer momento sem aviso prévio. Os pagamentos devem ser efetuados através dos métodos disponibilizados no checkout.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Terms;
