
import React, { useState, useRef, useEffect } from 'react';
import { Star, Clock, MapPin, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { FaGoogle, FaWhatsapp, FaTripadvisor } from 'react-icons/fa'; // Importing icons

const RestaurantSection = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const sectionRef = useRef(null);

  const menuItems = [
    {
      name: 'Traditional Rice & Curry',
      image: '/images/riceandcurry.jpg',
      price: '$12',
      popularity: 95,
      description: 'Authentic Sri Lankan rice and curry with 8 different curries',
      spiceLevel: 'Medium'
    },
    {
      name: 'Fish Ambul Thiyal',
      image: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '$15',
      popularity: 88,
      description: 'Traditional sour fish curry with gotukola',
      spiceLevel: 'Hot'
    },
    {
      name: 'Kottu Roti',
      image: '/images/kottu.jpg',
      price: '$10',
      popularity: 92,
      description: 'Chopped flatbread stir-fried with vegetables and egg',
      spiceLevel: 'Mild'
    },
    {
      name: 'Hoppers with Coconut Sambol',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '$8',
      popularity: 90,
      description: 'Bowl-shaped pancakes with spicy coconut relish',
      spiceLevel: 'Medium'
    }
  ];

  const cookeryClasses = [
    {
      name: 'Traditional Curry Cooking',
      duration: '3 hours',
      price: '$35',
      nextClass: 'Tomorrow 2:00 PM',
      description: 'Learn to make authentic Sri Lankan curries from scratch'
    },
    {
      name: 'Street Food Masterclass',
      duration: '2 hours',
      price: '$25',
      nextClass: 'Today 6:00 PM',
      description: 'Master the art of Sri Lankan street food favorites'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate progress bars
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach((bar) => {
              const htmlBar = bar as HTMLElement;
              const percentage = htmlBar.dataset.percentage;
              setTimeout(() => {
                htmlBar.style.width = `${percentage}%`;
              }, 300);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="restaurant" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Green Chilli <span className="text-emerald-600">Restaurant</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Authentic Sri Lankan cuisine in the heart of Anuradhapura
          </p>

          {/* Rating & Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">8.6/5 (27 reviews)</span>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="https://g.co/kgs/zf56jPY"
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <FaGoogle className="w-4 h-4" />
                <span>Google</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <FaTripadvisor className="w-4 h-4" />
                <span>TripAdvisor</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'menu'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'classes'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-emerald-600'
              }`}
            >
              Cookery Classes
            </button>
          </div>
        </div>

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div className="grid md:grid-cols-2 gap-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
                <div className="flex">
                  <div className="w-32 h-32 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <span className="text-emerald-600 font-bold text-lg">
                        {item.price}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.spiceLevel === 'Hot' 
                          ? 'bg-red-100 text-red-700'
                          : item.spiceLevel === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {item.spiceLevel} Spice
                      </span>
                    </div>

                    {/* Popularity Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Popularity</span>
                        <span>{item.popularity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="progress-bar bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          data-percentage={item.popularity}
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cookery Classes Tab */}
        {activeTab === 'classes' && (
          <div className="grid md:grid-cols-2 gap-8">
            {cookeryClasses.map((course, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {course.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {course.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Duration: {course.duration}</span>
                    </div>
                    <span className="text-emerald-600 font-bold text-xl">
                      {course.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Next Class: {course.nextClass}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
                    Book Class
                  </button>
                  <a
                    href="#"
                    className="p-3 bg-white border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantSection;
