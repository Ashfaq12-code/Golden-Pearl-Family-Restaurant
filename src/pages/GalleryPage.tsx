import { Breadcrumb } from '../components/Breadcrumb';

export function GalleryPage() {
  const images = [
    {
      url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Signature Dishes'
    },
    {
      url: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Rice & Curry'
    },
    {
      url: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Fresh Ingredients'
    },
    {
      url: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Restaurant Interior'
    },
    {
      url: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Dining Area'
    },
    {
      url: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Delicious Biriyani'
    },
    {
      url: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Fresh Salads'
    },
    {
      url: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Noodles & Pasta'
    },
    {
      url: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Desserts'
    },
    {
      url: 'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Fried Rice'
    },
    {
      url: 'https://images.pexels.com/photos/1410236/pexels-photo-1410236.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Seafood Specials'
    },
    {
      url: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Kottu Roti'
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Gallery' }]} />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Gallery</h1>
          <p className="text-xl text-gray-600">A visual journey through our culinary delights</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-w-4 aspect-h-3 relative h-72">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Us Today!</h2>
          <p className="text-xl mb-6">
            Experience these amazing dishes in person at our restaurant in Gampola
          </p>
          <button
            onClick={() => window.location.hash = 'contact'}
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
}
