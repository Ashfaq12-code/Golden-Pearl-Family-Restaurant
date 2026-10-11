import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://i.ibb.co/fzZ4nnnx/OIP-1-removebg-preview.png"
                alt="Golden Pearl"
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-lg font-bold">Golden Pearl</h3>
                <p className="text-sm text-gray-400">Family Restaurant</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Authentic Sri Lankan cuisine in the heart of Gampola. Experience the perfect blend of traditional flavors and modern dining.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#menu" className="text-gray-400 hover:text-orange-500 transition-colors">Menu</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-orange-500 transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-sm">Buwanekaba Rd, Gampola, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <a href="tel:+94774961060" className="text-gray-400 hover:text-orange-500 transition-colors">077 496 1060</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <a href="mailto:info@goldenpearl.lk" className="text-gray-400 hover:text-orange-500 transition-colors">info@goldenpearl.lk</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                <div className="text-gray-400 text-sm">
                  <p className="font-semibold text-white">Monday - Sunday</p>
                  <p>10:00 AM - 10:00 PM</p>
                </div>
              </li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-orange-600 p-2 rounded-full hover:bg-orange-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-orange-600 p-2 rounded-full hover:bg-orange-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Golden Pearl Family Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
