import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';


import { BASE_URL } from "../api/axios";

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-[#008cff]/10 transition-all duration-500 flex flex-col h-full">
            <Link to={`/produto/${product.public_id}`} className="relative block overflow-hidden aspect-square sm:aspect-video bg-gray-50 dark:bg-gray-800/50">
                <img
                    src={product.image_url.startsWith('http') ? product.image_url : `${BASE_URL}/${product.image_url}`}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                />
            </Link>

            <div className="p-5 flex flex-col flex-1">
                <Link to={`/produto/${product.public_id}`} className="flex-1">
                    <h3 className="text-lg text-left font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#008cff] transition-colors leading-tight mb-1">
                        {product.name}
                    </h3>
                    <p className="text-xs text-left text-gray-400 font-bold uppercase tracking-widest mb-4">{product.category}</p>
                </Link>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50 dark:border-gray-800">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-[#008cff]">{formatPrice(product.price)}</span>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        className="p-3 bg-[#008cff] text-white rounded-2xl hover:bg-[#007ad6] shadow-xl shadow-[#008cff]/20 active:scale-95 transition-all"
                        title="Adicionar ao Carrinho"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;