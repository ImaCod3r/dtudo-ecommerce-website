import Logo from "./Logo";

function Footer() {
    return (
        <footer className="bg-white  border-t border-gray-100 py-12 mt-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 transition-colors duration-300">
                <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                    <Logo />
                    <p className="text-gray-500 dark:text-gray-400 mt-4 text-left font-medium max-w-sm mb-6 leading-relaxed">
                        A sua loja de confiança em Angola. Na <b>Dtudo</b> encontras mesmo de tudo, com a melhor qualidade e rapidez na entrega.
                    </p>
                </div>
                <div className="text-left">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Empresa</h4>
                    <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Sobre Nós</li>
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Carreiras</li>
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Termos de Serviço</li>
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Política de Privacidade</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Suporte</h4>
                    <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Informações de Envio</li>
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Devoluções</li>
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">FAQ</li>
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Contato</li>
                    </ul>
                </div>
                <div className="text-left">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Categorias</h4>
                    <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Eletrônicos</li>
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Moda</li>
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Casa & Jardim</li>
                        <li className="hover:text-[#008cff] cursor-pointer transition-colors font-medium">Saúde & Beleza</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-50  text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Dtudo Shop. Todos os direitos reservados.
            </div>
        </footer>
    )
}

export default Footer;