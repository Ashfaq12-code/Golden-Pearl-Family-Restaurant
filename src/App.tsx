import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { ProductViewPage } from './pages/ProductViewPage';
import { CartPage } from './pages/CartPage';
import { FullMenuPage } from './pages/FullMenuPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [productSlug, setProductSlug] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);

      if (hash.startsWith('product/')) {
        setCurrentPage('product');
        setProductSlug(hash.replace('product/', ''));
      } else if (hash === 'cart') {
        setCurrentPage('cart');
      } else if (hash === 'full-menu') {
        setCurrentPage('full-menu');
      } else if (hash === 'about') {
        setCurrentPage('about');
      } else if (hash === 'gallery') {
        setCurrentPage('gallery');
      } else if (hash === 'contact') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }

      window.scrollTo(0, 0);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'product':
        return <ProductViewPage slug={productSlug} />;
      case 'cart':
        return <CartPage />;
      case 'full-menu':
        return <FullMenuPage />;
      case 'about':
        return <AboutPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>{renderPage()}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
