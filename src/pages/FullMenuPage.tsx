import { useEffect, useState } from 'react';
import { supabase, Category, Product } from '../lib/supabase';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';

export function FullMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('display_order');

      if (categoriesError) throw categoriesError;

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('name');

      if (productsError) throw productsError;

      setCategories(categoriesData || []);
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error loading menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    window.location.hash = `product/${product.slug}`;
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category_id === selectedCategory);

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(p => p.category_id === categoryId);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Full Menu' }]} />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Complete Menu</h1>
          <p className="text-xl text-gray-600">Explore all our delicious offerings</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Items
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <>
            {selectedCategory === 'all' ? (
              categories.map((category) => {
                const categoryProducts = getProductsByCategory(category.id);
                if (categoryProducts.length === 0) return null;

                return (
                  <div key={category.id} className="mb-12">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h2>
                      {category.description && (
                        <p className="text-gray-600">{category.description}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onClick={() => handleProductClick(product)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No products found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
