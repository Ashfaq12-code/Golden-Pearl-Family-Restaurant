import { useState } from 'react';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!customerName || !customerPhone) {
      alert('Please fill in your name and phone number');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      const orderNumber = `ORD${Date.now()}`;
      const totalAmount = getTotalPrice();

      await supabase.from('orders').insert({
        order_number: orderNumber,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        items: cart,
        total_amount: totalAmount,
        status: 'pending'
      });

      let message = `*New Order - ${orderNumber}*\n\n`;
      message += `*Customer Details:*\n`;
      message += `Name: ${customerName}\n`;
      message += `Phone: ${customerPhone}\n`;
      if (customerAddress) {
        message += `Address: ${customerAddress}\n`;
      }
      message += `\n*Order Items:*\n`;

      cart.forEach((item, index) => {
        message += `\n${index + 1}. ${item.product.name}\n`;
        message += `   Size: ${item.size === 'small' ? 'Small' : 'Large/Full'}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: Rs. ${(item.price * item.quantity).toFixed(2)}\n`;
      });

      message += `\n*Total Amount: Rs. ${totalAmount.toFixed(2)}*\n\n`;
      message += `Please confirm this order. Thank you!`;

      const whatsappUrl = `https://wa.me/94774961060?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      clearCart();
      alert('Order placed successfully! Please complete payment via WhatsApp.');
      window.location.hash = 'home';
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
            <Button onClick={() => window.location.hash = 'menu'}>
              Browse Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold">Cart Items</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="p-6 flex gap-4">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{item.product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Size: {item.size === 'small' ? 'Small' : 'Large/Full'}
                      </p>
                      <p className="text-orange-600 font-semibold">
                        Rs. {item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-orange-600 text-orange-600 flex items-center justify-center hover:bg-orange-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-orange-600 text-orange-600 flex items-center justify-center hover:bg-orange-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />

                <textarea
                  placeholder="Delivery Address (Optional)"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600">Rs. {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                You will be redirected to WhatsApp to complete your order
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
