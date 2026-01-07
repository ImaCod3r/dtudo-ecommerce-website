import { HelpCircle, ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

const FAQS = [
    {
        q: "Quais são os métodos de pagamento aceites?",
        a: "Aceitamos pagamentos via Multicaixa Express, Transferência Bancária Confirmada e Pagamento no Acto da Entrega em zonas selecionadas de Luanda."
    },
    {
        q: "Quanto tempo demora a entrega?",
        a: "Para Luanda, entregamos em média entre 24h a 48h úteis. Para Cabinda, o prazo pode estender-se até 72h úteis dependendo da logística aérea/marítima."
    },
    {
        q: "Os produtos têm garantia?",
        a: "Sim, todos os produtos novos vendidos na Dtudo Store têm garantia de acordo com a lei angolana. Produtos eletrônicos contam geralmente com 6 meses a 1 ano de garantia."
    },
    {
        q: "Posso devolver um produto?",
        a: "Aceitamos devoluções num prazo de 7 dias após a receção, desde que o produto esteja na embalagem original, selado e sem marcas de uso."
    },
    {
        q: "Fazem entregas para outras províncias além de Luanda?",
        a: "Neste momento focamo-nos em Luanda e Cabinda, mas estamos a trabalhar para expandir a nossa logística para Benguela e Huíla brevemente."
    }
];

function FAQ() {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    };

    return (
        <div className="container mx-auto px-4 py-20">
            <SEO
                title="Perguntas Frequentes (FAQ)"
                description="Respostas às dúvidas mais comuns sobre pagamentos, entregas, garantias e devoluções na Dtudo Store."
                schema={faqSchema}
            />
            <div className="max-w-4xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#028dfe] transition-colors mb-12 font-bold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl">
                        <HelpCircle className="w-8 h-8 text-[#028dfe]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white text-left">FAQ</h1>
                </div>

                <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 font-medium leading-relaxed text-left">
                    Encontre respostas rápidas para as perguntas mais frequentes. Se não encontrar o que procura, entre em contacto connosco.
                </p>

                <div className="space-y-4 max-w-3xl">
                    {FAQS.map((faq, i) => (
                        <details key={i} className="group bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:border-[#028dfe]/30 transition-all text-left">
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                <span className="text-lg font-bold text-gray-800 dark:text-white pr-4">{faq.q}</span>
                                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 text-gray-500 dark:text-gray-400 font-medium leading-relaxed border-t border-gray-50 dark:border-gray-700 pt-4">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FAQ;
