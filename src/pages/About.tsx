import { Info, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

function About() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-20">
            <SEO
                title="Sobre Nós"
                description="Conheça a Dtudo Store, sua loja online de confiança em Angola. Missão, valores e compromisso com a qualidade."
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Store",
                    "name": "Dtudo Shop",
                    "url": window.location.origin,
                    "description": "A sua loja online favorita com entrega rápida em toda Angola.",
                    "telephone": "+244 929 087 734",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Luanda",
                        "addressCountry": "AO"
                    }
                }}
            />
            <div className="max-w-4xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#028dfe] transition-colors mb-8 font-bold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                </button>

                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 w-20 h-20 rounded-3xl flex items-center justify-center">
                        <Info className="w-10 h-10 text-[#028dfe]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white text-left">Sobre Nós</h1>
                </div>

                <div className="prose prose-lg dark:prose-invert space-y-6 text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-left max-w-none">
                    <p>
                        A <strong>Dtudo Store</strong> nasceu com a missão de trazer o melhor do comércio eletrónico para Angola.
                        Somos mais do que uma simples loja online; somos o seu parceiro de confiança para todas as suas necessidades tecnológicas e muito mais.
                    </p>

                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-12 mb-4">Nossa Missão</h2>
                    <p>
                        Simplificar a vida dos nossos clientes, oferecendo acesso a produtos de alta qualidade com um processo de compra transparente,
                        pagamentos seguros e entregas ultra-rápidas em Luanda e Cabinda.
                    </p>

                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-12 mb-4">Porquê Escolher-nos?</h2>
                    <ul className="list-disc pl-6 space-y-4">
                        <li><strong>Qualidade Garantida:</strong> Trabalhamos apenas com as melhores marcas mundiais.</li>
                        <li><strong>Suporte Local:</strong> Uma equipa angolana pronta para ajudar em qualquer momento.</li>
                        <li><strong>Entrega de Confiança:</strong> Logística própria para garantir que o seu produto chegue intacto.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default About;
