import React, { useState, useEffect } from 'react';
import { Star, Wifi, Car, Coffee, ExternalLink, Calendar } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const HomestaySection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [
    '/images/gallery/G1.png',
    '/images/gallery/G7.png',
    '/images/gallery/G10.png',
    '/images/gallery/G12.png'
  ];

  const amenities = [
    { icon: Wifi, name: 'Free WiFi' },
    { icon: Car, name: 'Free Parking' },
    /*{ icon: Coffee, name: 'Breakfast Included' },*/
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

  const reviews = [
    {
      name: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Wonderful authentic experience! The family was so welcoming and the food was incredible."
    },
    {
      name: "David L.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Perfect location with amazing hospitality. The traditional Sri Lankan breakfast was a highlight!"
    },
    {
      name: "Emma R.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Beautiful homestay with such warm hosts. Felt like home away from home. Highly recommend!"
    },
    {
      name: "Michael K.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 4,
      text: "Great cultural experience and comfortable accommodation. The garden is absolutely beautiful."
    }
  ];

  // Auto-rotate reviews with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextReview = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
      setFade(true);
    }, 500);
  };

  const prevReview = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
      setFade(true);
    }, 500);
  };

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
                className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full">
                <span className="text-sm font-medium">View Gallery</span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                <div className="text-3xl font-bold text-emerald-600"></div>
                <div className="text-gray-500"></div>
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
                className="group w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-base sm:text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Book on Booking.com</span>
              </a>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white border-2 border-emerald-500 text-emerald-600 py-3 px-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105">
                  <Calendar className="w-5 h-5 mx-auto mb-1" />
                  Check Availability
                </button>
                <a 
                  href="https://wa.me/94701306430" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105"
                >
                  Contact Host
                </a>
              </div>
            </div>

            {/* Reviews with Fade Animation */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-800">Recent Reviews</h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevReview}
                    className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextReview}
                    className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="relative min-h-[180px]">
                <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={reviews[currentReview].avatar} alt={reviews[currentReview].name} />
                        <AvatarFallback>{reviews[currentReview].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800">{reviews[currentReview].name}</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(reviews[currentReview].rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      "{reviews[currentReview].text}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFade(false);
                      setTimeout(() => {
                        setCurrentReview(index);
                        setFade(true);
                      }, 500);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentReview 
                        ? 'bg-emerald-500 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <a
              href="https://www.booking.com/hotel/lk/chipmunk-home-stay-anuradhapuar-anuradhapura.html?"  // Replace with your actual Booking.com reviews link
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
            >
              View All Reviews
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
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