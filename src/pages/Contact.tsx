import { Mail, Phone, MapPin, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

function Contact() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-20">
            <SEO
                title="Fale Conosco"
                description="Entre em contacto com a Dtudo Store. Estamos prontos para ajudar por telefone, WhatsApp ou e-mail."
                schema={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Fale Conosco - Dtudo Shop",
                    "url": window.location.href,
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "Dtudo Shop",
                        "telephone": "+244 929 087 734",
                        "email": "atendimento@dtudo.shop",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+244 929 087 734",
                            "contactType": "customer service",
                            "availableLanguage": "Portuguese"
                        }
                    }
                }}
            />
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#028dfe] transition-colors mb-12 font-bold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h1 className="text-left text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">Entre em Contacto</h1>
                        <p className="text-left text-lg text-gray-500 dark:text-gray-400 mb-12 font-medium">
                            Tem alguma dúvida ou sugestão? Nossa equipa está pronta para o ajudar!
                        </p>

                        <div className="text-left space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl shrink-0">
                                    <Phone className="w-6 h-6 text-[#028dfe]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Telefone / WhatsApp</h3>
                                    <p className="text-gray-500 dark:text-gray-400">+244 929 087 734</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl shrink-0">
                                    <Mail className="w-6 h-6 text-[#028dfe]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">E-mail</h3>
                                    <p className="text-gray-500 dark:text-gray-400">atendimento@dtudo.shop</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl shrink-0">
                                    <MapPin className="w-6 h-6 text-[#028dfe]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Escritório</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Talatona, Luanda - Angola</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-xl shadow-blue-500/5">
                        <form className="text-left space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">Nome</label>
                                    <input type="text" placeholder="Seu nome" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">E-mail</label>
                                    <input type="email" placeholder="Seu e-mail" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all font-medium" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">Assunto</label>
                                <input type="text" placeholder="Como podemos ajudar?" className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-2">Mensagem</label>
                                <textarea rows={4} placeholder="Escreva sua mensagem aqui..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none transition-all font-medium"></textarea>
                            </div>
                            <button className="w-full py-4 bg-[#028dfe] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95">
                                <Send className="w-5 h-5" /> Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
