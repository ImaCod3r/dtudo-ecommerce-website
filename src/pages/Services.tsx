import { BriefcaseBusiness, ArrowLeft, Truck, ShieldCheck, Headset, ShieldEllipsis } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_SERVICES = [
    {
        id: 1,
        title: 'Entrega Rápida',
        description: 'Entregamos em toda a província de Luanda e Cabinda com prazos de 24h a 48h úteis.',
        icon: <Truck className="w-8 h-8" />,
        color: 'blue',
    },
    {
        id: 2,
        title: 'Garantia Premium',
        description: 'Todos os nossos produtos electrónicos contam com garantia oficial e suporte técnico especializado.',
        icon: <ShieldCheck className="w-8 h-8" />,
        color: 'green',
    },
    {
        id: 3,
        title: 'Atendimento 24/7',
        description: 'A nossa equipa de suporte está sempre disponível para resolver as suas dúvidas por chat ou telefone.',
        icon: <Headset className="w-8 h-8" />,
        color: 'purple',
    },
    {
        id: 4,
        title: 'Pagamento Seguro',
        description: 'Aceitamos multicaixa express, transferência bancária e pagamento no acto da entrega.',
        icon: <ShieldEllipsis className="w-8 h-8" />,
        color: 'orange',
    }
];

function Services() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-6 text-left">
                <div className="text-left">
                    <div className="flex items-center justify-start gap-2 text-[#028DFE] font-black uppercase tracking-widest text-sm mb-2">
                        <BriefcaseBusiness className="w-4 h-4" />
                        <span>Nossos Compromissos</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">Serviços & Qualidade</h1>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {MOCK_SERVICES.map((service) => (
                    <div key={service.id} className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[3rem] border border-gray-100 dark:border-gray-800 group hover:border-[#028dfe]/30 hover:shadow-2xl hover:shadow-[#028dfe]/5 transition-all duration-500">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
                            ${service.color === 'blue' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : ''}
                            ${service.color === 'green' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : ''}
                            ${service.color === 'purple' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' : ''}
                            ${service.color === 'orange' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' : ''}
                        `}>
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">{service.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-medium">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-20 bg-gray-900 dark:bg-black rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 relative z-10">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Precisa de ajuda especializada?</h2>
                        <p className="text-gray-400 text-lg mb-10 font-medium">Os nossos consultores estão prontos para o ajudar a escolher o melhor produto para as suas necessidades.</p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-[#028DFE] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
                                Agendar Consultoria
                            </button>
                            <button className="bg-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10">
                                WhatsApp Direto
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:flex justify-center">
                        <div className="w-64 h-64 bg-[#028DFE] rounded-full flex items-center justify-center p-4 shadow-[0_0_80px_rgba(2,141,254,0.3)] animate-float">
                            <Headset className="w-32 h-32 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;
