import { useState } from 'react';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <img
              src="https://i.ibb.co/fzZ4nnnx/OIP-1-removebg-preview.png"
              alt="Golden Pearl Restaurant"
              className="h-14 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Golden Pearl</h1>
              <p className="text-xs text-orange-600">Family Restaurant</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="tel:+94774961060"
              className="hidden sm:flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-semibold">077 496 1060</span>
            </a>

            <button
              onClick={() => window.location.hash = 'cart'}
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-orange-600 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href="tel:+94774961060"
              className="flex items-center space-x-2 text-orange-600 py-2"
            >
              <Phone className="w-5 h-5" />
              <span className="font-semibold">077 496 1060</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
