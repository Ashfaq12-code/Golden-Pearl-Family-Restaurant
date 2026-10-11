import { Users, Award, Heart, Clock } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

export function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-96 lg:h-auto">
              <img
                src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Restaurant Interior"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 lg:p-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to Golden Pearl Family Restaurant
              </h1>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Located in the heart of Gampola on Buwanekaba Road, Golden Pearl Family Restaurant has been serving authentic Sri Lankan cuisine since our establishment. We pride ourselves on offering a warm, welcoming atmosphere where families and friends can gather to enjoy delicious food.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                Our menu features a wide variety of traditional Sri Lankan dishes, from aromatic rice and curry to flavorful kottu and biriyani. Every dish is prepared with fresh, locally-sourced ingredients and traditional recipes passed down through generations.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With a 4.6-star rating and over 78 satisfied customers, we've become a favorite dining destination in Gampola. Whether you're dining in, taking away, or ordering through UberEats, we're committed to delivering the same exceptional quality and taste.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Family Friendly</h3>
            <p className="text-gray-600">A perfect place for family gatherings and celebrations</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Food</h3>
            <p className="text-gray-600">Only the finest ingredients and authentic recipes</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Made with Love</h3>
            <p className="text-gray-600">Every dish is prepared with passion and care</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Service</h3>
            <p className="text-gray-600">Quick service without compromising quality</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto">
            To provide our customers with an unforgettable dining experience through exceptional food,
            warm hospitality, and a commitment to preserving the authentic flavors of Sri Lankan cuisine.
            We strive to be more than just a restaurant - we aim to be a gathering place where memories are made
            and traditions are celebrated.
          </p>
        </div>
      </div>
    </div>
  );
}
