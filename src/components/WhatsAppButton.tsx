import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = '94774961060';
  const message = 'Hello! I would like to inquire about your menu.';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50 animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
}
