import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
    Phone,
    Mail,
    Search,
    User,
    Globe,
    ShoppingCart,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    BriefcaseBusiness,
    Sparkles,
    TrendingUp
} from "lucide-react";
import Logo from "./Logo";

import api, { BASE_URL } from "../api/axios";
import type { Category, Product } from "../types";

import { getAdress } from "../services/gps";

// Contexts
import { useCart } from "../context/CartContext";
import { useGeolocationPermission } from "../hooks/useGeolocationPermission";
import { useDebounce } from "../hooks/useDebounce";

function Header() {
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const categoriesRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [address, setAddress] = useState("");

    const { totalItems } = useCart();
    const { location, getLocation } = useGeolocationPermission();

    // Fetch Suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedSearchQuery.length < 3) {
                setSuggestions([]);
                return;
            }

            setIsSearching(true);
            try {
                // Sending multiple common search parameters to ensure backend compatibility
                const response = await api.get('/products', {
                    params: {
                        search: debouncedSearchQuery,
                        q: debouncedSearchQuery, // Some APIs use 'q'
                        name: debouncedSearchQuery // Some APIs specific filter by name
                    }
                });

                let results: Product[] = [];
                if (response.data.products) {
                    results = response.data.products;
                } else if (Array.isArray(response.data)) {
                    results = response.data;
                }

                // Client-side filtering to ensure relevance if backend returns all products (fallback)
                const filteredResults = results.filter(product =>
                    product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                    (product.description && product.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
                );

                setSuggestions(filteredResults.slice(0, 5)); // Limit to 5 suggestions
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            } finally {
                setIsSearching(false);
            }
        };

        fetchSuggestions();
    }, [debouncedSearchQuery]);

    // Tentar pegar a localização ao carregar
    useEffect(() => {
        getLocation();
    }, []); // Executa apenas uma vez ao montar

    const loadAdress = async () => {
        if (!location?.coords) return;
        const { latitude, longitude } = location.coords;

        try {
            const address = await getAdress(latitude, longitude);
            setAddress(address.display_name);
        } catch (error) {
            console.error("Erro ao carregar endereço:", error);
        }
    };

    useEffect(() => {
        if (location?.coords) {
            loadAdress();
        }
    }, [location]);


    useEffect(() => {
        api.get("/categories").then((response) => {
            setCategories(response.data.categories);
        });
    }, []);

    // Detectar scroll para adicionar sombra ao header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
                setIsCategoriesOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuggestions(false);
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? "shadow-lg" : "shadow-sm"
                }`}
        >
            {/* Top Bar */}
            <div className="bg-[#028DFE] text-white py-2">
                <div className="container mx-auto px-4 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-6">
                        <span className="hidden md:inline-flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            +244 929087734
                        </span>
                        <span className="hidden lg:inline-flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            atendimento@dtudo.shop
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs md:text-sm font-medium">Entregas para toda a cidade de Cabinda.</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Logo />

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative group" ref={searchRef}>
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="Pesquisar produtos..."
                                    className="w-full px-4 py-3 pl-12 pr-4 rounded-full border-2 border-gray-200 focus:border-[#028dfe] focus:outline-none transition-colors duration-300"
                                />
                                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </form>

                        {/* Search Suggestions */}
                        {showSuggestions && (searchQuery || suggestions.length > 0) && (
                            <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-2xl border border-gray-100 mt-2 overflow-hidden z-50">
                                {isSearching ? (
                                    <div className="p-4 text-center text-gray-400 text-sm">
                                        Carregando...
                                    </div>
                                ) : suggestions.length > 0 ? (
                                    <ul>
                                        {suggestions.map((product) => (
                                            <li key={product.id} className="border-b border-gray-50 last:border-none">
                                                <button
                                                    onClick={() => {
                                                        navigate(`/produto/${product.public_id}`);
                                                        setShowSuggestions(false);
                                                        setSearchQuery("");
                                                    }}
                                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                                >
                                                    <img
                                                        src={`${BASE_URL}/${product.image_url}`}
                                                        alt={product.name}
                                                        className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm line-clamp-1">{product.name}</p>
                                                        <p className="text-xs text-[#028dfe] font-bold">{new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(product.price)}</p>
                                                    </div>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : searchQuery.length > 2 ? (
                                    <div className="p-4 text-center text-gray-400 text-sm">
                                        Nenhum produto encontrado.
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div className="hidden md:flex group items-center gap-2 cursor-pointer max-w-[200px]">
                        <Globe className="w-6 h-6 text-gray-700 group-hover:text-[#028dfe] transition-colors shrink-0" />
                        <span className="font-bold text-left text-xs group-hover:text-[#028dfe] transition-colors leading-tight truncate">
                            {address || "Localização não encontrada"}
                        </span>
                    </div>

                    {/* Icons - Desktop */}
                    <div className="hidden md:flex items-center gap-6">
                        <button className="relative group cursor-pointer" onClick={() => navigate('/profile')}>
                            <User className="w-6 h-6 text-gray-700 group-hover:text-[#028dfe] transition-colors" />
                            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Conta
                            </span>
                        </button>
                        <button className="relative group cursor-pointer" onClick={() => navigate('/cart')}>
                            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-[#028dfe] transition-colors" />
                            <span className="absolute -top-2 -right-2 bg-[#028dfe] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {totalItems}
                            </span>
                            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Carrinho
                            </span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="hidden md:block border-t border-gray-200 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-8">
                        {/* Categories Dropdown */}
                        <div className="relative" ref={categoriesRef}>
                            <button
                                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${isCategoriesOpen
                                    ? "bg-[#028dfe] text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-500/10"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                <Menu className="w-5 h-5" />
                                <span>Categorias</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoriesOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isCategoriesOpen && (
                                <div className="absolute top-full left-0 w-72 bg-white shadow-2xl rounded-3xl border border-gray-100 animate-slideDown z-50 mt-4 overflow-hidden">
                                    <div className="py-3">
                                        {categories.map((category, index) => (
                                            <div key={index} className="group relative">
                                                <Link
                                                    to={`/categoria/${category.id}`}
                                                    className="flex items-center justify-between px-6 py-3.5 text-gray-600 hover:bg-blue-50 hover:text-[#028dfe] transition-all duration-200 group-hover:pl-7 border-l-4 border-transparent hover:border-[#028dfe]"
                                                >
                                                    <span className="font-bold text-sm">
                                                        {category.name}
                                                    </span>
                                                    <ChevronRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                </Link>

                                                {/* Subcategories - shown on hover */}
                                                {category.children.length > 0 && (
                                                    <div className="hidden group-hover:block absolute left-[95%] top-0 w-64 bg-white shadow-xl rounded-3xl border border-gray-100 z-50 ml-2 overflow-hidden animate-slideRight">
                                                        <div className="py-4 bg-white">
                                                            <div className="px-6 pb-3 border-b border-gray-100 mb-2">
                                                                <h4 className="font-black text-[#028dfe] text-sm uppercase tracking-wider">{category.name}</h4>
                                                            </div>
                                                            {category.children.map((sub, subIndex) => (
                                                                <Link
                                                                    key={subIndex}
                                                                    to={`/categoria/${sub.id}`}
                                                                    className="px-6 py-2.5 text-sm text-gray-500 hover:text-[#028dfe] hover:bg-blue-50 transition-colors font-medium flex items-center gap-2 group/sub"
                                                                >
                                                                    <div className="w-1 h-1 rounded-full bg-gray-300 group-hover/sub:bg-[#028dfe] transition-colors"></div>
                                                                    {sub.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Links */}
                        <div className="flex items-center gap-8 py-4">
                            <Link to="/novidades" className="text-gray-700 hover:text-[#028dfe] font-medium transition-colors duration-200 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Novidades
                            </Link>
                            <Link to="/mais-vendidos" className="text-gray-700 hover:text-[#028dfe] font-medium transition-colors duration-200 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Mais Vendidos
                            </Link>
                            <Link to="/servicos" className="text-gray-700 hover:text-[#028dfe] font-medium transition-colors duration-200 flex items-center gap-2">
                                <BriefcaseBusiness className="w-5 h-5" />
                                Serviços
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 animate-slideDown">
                    {/* Mobile Search */}
                    <div className="px-4 py-4 border-b border-gray-200">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Pesquisar produtos..."
                                    className="w-full px-4 py-3 pl-12 rounded-full border-2 border-gray-200 focus:border-[#028dfe] focus:outline-none"
                                />
                                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </form>
                    </div>

                    {/* Mobile Categories */}
                    <div className="py-2">
                        {categories.map((category, index) => (
                            <div key={index} className="border-b border-gray-100">
                                <details className="group">
                                    <summary className="px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                                        <span className="font-medium text-gray-800">{category.name}</span>
                                        <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    {category.children.length > 0 && (
                                        <div className="bg-gray-50 px-4 py-2">
                                            {category.children.map((sub, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={`/categoria/${sub.id}`}
                                                    className="block py-2 text-gray-600 hover:text-[#028dfe]"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </details>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Quick Links */}
                    <div className="border-t border-gray-200 py-2">
                        <Link to="/novidades" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                            <Sparkles className="w-5 h-5 text-[#028dfe]" />
                            <span className="font-medium">Novidades</span>
                        </Link>
                        <Link to="/mais-vendidos" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                            <TrendingUp className="w-5 h-5 text-[#028dfe]" />
                            <span className="font-medium">Mais Vendidos</span>
                        </Link>
                        <Link to="/servicos" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                            <BriefcaseBusiness className="w-5 h-5 text-[#028dfe]" />
                            <span className="font-medium">Serviços</span>
                        </Link>
                    </div>

                    {/* Mobile Icons */}
                    <div className="border-t border-gray-200 px-4 py-4 flex justify-around">
                        <button className="flex flex-col items-center gap-1"
                            onClick={() => {
                                navigate('/profile');
                                setIsMenuOpen(false);
                            }}>
                            <User className="w-6 h-6 text-gray-700" />
                            <span className="text-xs text-gray-600">Conta</span>
                        </button>
                        <button
                            className="flex flex-col items-center gap-1 relative"
                            onClick={() => {
                                navigate('/cart');
                                setIsMenuOpen(false);
                            }}
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            <span className="absolute -top-1 right-2 bg-[#028dfe] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {totalItems}
                            </span>
                            <span className="text-xs text-gray-600">Carrinho</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Custom CSS for animations */}
            <style>{`
                @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
                }
                .animate-slideDown {
                animation: slideDown 0.3s ease-out;
                }
                @keyframes slideRight {
                from {
                    opacity: 0;
                    transform: translateX(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
                }
                .animate-slideRight {
                animation: slideRight 0.3s ease-out;
                }
      `}</style>
        </header>
    );
}

export default Header;