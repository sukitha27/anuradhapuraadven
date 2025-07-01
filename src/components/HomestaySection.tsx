
import React, { useState } from 'react';
import { Star, Wifi, Car, Coffee, ExternalLink, Calendar } from 'lucide-react';

const HomestaySection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const amenities = [
    { icon: Wifi, name: 'Free WiFi' },
    { icon: Car, name: 'Free Parking' },
    { icon: Coffee, name: 'Breakfast Included' },
    { icon: Star, name: 'Garden View' }
  ];

  const features = [
    'Traditional Sri Lankan architecture',
    'Peaceful garden setting',
    'Authentic home-cooked meals',
    'Cultural experience programs',
    'Bicycle rental available',
    'Guided temple tours'
  ];

  return (
    <section id="homestay" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Chipmunk <span className="text-emerald-600">Homestay</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience authentic Sri Lankan hospitality in our traditional family home
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group cursor-pointer"
                 onClick={() => setLightboxOpen(true)}>
              <img
                src={images[currentImage]}
                alt="Chipmunk Homestay"
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full">
                <span className="text-sm font-medium">View Gallery</span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative overflow-hidden rounded-lg aspect-square ${
                    index === currentImage 
                      ? 'ring-2 ring-emerald-500 ring-offset-2' 
                      : 'hover:opacity-75'
                  } transition-all duration-300`}
                >
                  <img
                    src={image}
                    alt={`Homestay ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Rating & Booking */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">4.9/5 (127 reviews)</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600">$35</div>
                <div className="text-gray-500">per night</div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <amenity.icon className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700 font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">What makes us special</h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Buttons */}
            <div className="space-y-4">
              <a
                href="https://www.booking.com/Share-KzsPpdF"
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Book on Booking.com</span>
              </a>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white border-2 border-emerald-500 text-emerald-600 py-3 px-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105">
                  <Calendar className="w-5 h-5 mx-auto mb-1" />
                  Check Availability
                </button>
                <button className="bg-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105">
                  Contact Host
                </button>
              </div>
            </div>

            {/* Reviews Preview */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3">Recent Reviews</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">Sarah M.</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    "Wonderful authentic experience! The family was so welcoming and the food was incredible."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <div className="relative max-w-4xl w-full">
            <img
              src={images[currentImage]}
              alt="Homestay"
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-300"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImage ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomestaySection;
