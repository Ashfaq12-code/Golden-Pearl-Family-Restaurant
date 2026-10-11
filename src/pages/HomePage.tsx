import { useEffect, useState } from 'react';
import { Star, UtensilsCrossed, Clock, MapPin, ArrowRight } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .eq('is_available', true)
        .limit(6);

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    window.location.hash = `product/${product.slug}`;
  };

  return (
    <div className="pt-20">
      <section id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Authentic Sri Lankan
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
              Family Dining
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Fresh. Delicious. Affordable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => window.location.hash = 'menu'}>
              <UtensilsCrossed className="w-5 h-5 mr-2" />
              View Menu
            </Button>
            <Button size="lg" variant="secondary" onClick={() => window.open('https://wa.me/94774961060', '_blank')}>
              Order Now
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold">4.6 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-orange-400" />
              <span className="text-lg">10AM - 10PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-orange-400" />
              <span className="text-lg">Gampola</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
              <p className="text-gray-600">We use only the freshest local ingredients to prepare our authentic dishes.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Service</h3>
              <p className="text-gray-600">Quick and efficient service without compromising on quality or taste.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Top Rated</h3>
              <p className="text-gray-600">Highly rated by our customers with 4.6 stars and 78+ reviews.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Featured Dishes</h2>
            <p className="text-xl text-gray-600">Handpicked favorites from our extensive menu</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  onClick={() => window.location.hash = 'full-menu'}
                >
                  View Full Menu
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Order Your Favorite Food Now!</h2>
          <p className="text-xl mb-8">Experience the authentic taste of Sri Lankan cuisine delivered to your doorstep</p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.open('https://wa.me/94774961060', '_blank')}
          >
            Order via WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
