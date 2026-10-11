import { useEffect, useState } from 'react';
import { Star, Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { supabase, Product, Review } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';

interface ProductViewPageProps {
  slug: string;
}

export function ProductViewPage({ slug }: ProductViewPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<'small' | 'large'>('large');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (productError) throw productError;
      if (!productData) {
        window.location.hash = 'home';
        return;
      }

      setProduct(productData);

      if (!productData.price_small) {
        setSelectedSize('large');
      } else if (!productData.price_large) {
        setSelectedSize('small');
      }

      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productData.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setReviews(reviewsData || []);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedSize, quantity);
    alert('Added to cart!');
  };

  const getCurrentPrice = () => {
    if (!product) return 0;
    return selectedSize === 'small' ? (product.price_small || 0) : (product.price_large || 0);
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { label: 'Menu', href: '#menu' },
          { label: product.name }
        ]} />

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-96 lg:h-full">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                <Heart className="w-6 h-6 text-orange-600" />
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">({reviews.length} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-orange-600">
                    Rs. {getCurrentPrice().toFixed(2)}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {product.price_small && product.price_large && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Size
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSelectedSize('small')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSize === 'small'
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      <p className="font-semibold">Small</p>
                      <p className="text-orange-600">Rs. {product.price_small.toFixed(2)}</p>
                    </button>
                    <button
                      onClick={() => setSelectedSize('large')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedSize === 'large'
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      <p className="font-semibold">Large / Full</p>
                      <p className="text-orange-600">Rs. {product.price_large.toFixed(2)}</p>
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border-2 border-orange-600 text-orange-600 flex items-center justify-center hover:bg-orange-50 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-orange-600 text-orange-600 flex items-center justify-center hover:bg-orange-50 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    Rs. {(getCurrentPrice() * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                fullWidth
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>

          {reviews.length > 0 && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">{review.customer_name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
