import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const displayPrice = product.price_small || product.price_large || 0;
  const hasMultipleSizes = product.price_small && product.price_large;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{product.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-orange-600">
              Rs. {displayPrice.toFixed(2)}
            </p>
            {hasMultipleSizes && (
              <p className="text-xs text-gray-500">Starting from</p>
            )}
          </div>

          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-3 rounded-full hover:shadow-lg transition-all duration-200 group-hover:scale-110">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
