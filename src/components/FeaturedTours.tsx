import React, { useEffect, useRef } from 'react';
import { Clock, Users, Star, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedTours = () => {
  const sectionRef = useRef(null);

  const tours = [
    {
      id: 1,
      title: 'Bicycle Adventure Tour',
      image: '/images/bicycle-tour-lg.jpg',
      duration: '6 hours',
      groupSize: '1 Person',
      rating: 4.9,
      price: '$10',
      highlights: ['Ancient Ruins', 'Local Villages', 'Sacred Gardens'],
      description: 'Cycle through ancient pathways and discover hidden temples'
    },
    {
      id: 2,
      title: 'Wilpattu Safari Tour',
      image: '/images/wilpattu-safari-lg.jpg',
      duration: '8 hours',
      groupSize: '4-10 people',
      rating: 4.8,
      price: '$85(F/D)- $46(H/D)',
      highlights: ['Leopard Spotting', 'Bird Watching', 'Natural Pools'],
      description: 'Experience Sri Lanka\'s premier wildlife sanctuary'
    },
    {
      id: 3,
      title: 'Cultural TukTuk Tour',
      image: '/images/tuktuk-tour.jpg',
      duration: '4 hours',
      groupSize: '1-3 people',
      rating: 4.7,
      price: 'Price depends on distance',
      highlights: ['Local Markets', 'Temples', 'Street Food'],
      description: 'Authentic local experience in a traditional TukTuk'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.tour-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="tours" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Featured <span className="text-emerald-600">Tours</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the wonders of Anuradhapura through our carefully curated adventures
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="tour-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden opacity-0"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full font-bold">
                  {tour.price}
                </div>

                {/* Rating */}
                <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/20 backdrop-blur-md rounded-full px-2 py-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-medium text-sm">{tour.rating}</span>
                </div>

                {/* Quick Action Button */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <Link 
                    to="/tours" 
                    state={{ tourId: tour.id }}
                    className="inline-block bg-white text-emerald-600 p-2 rounded-full hover:bg-emerald-50 transition-colors duration-300"
                    aria-label={`View details about ${tour.title}`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {tour.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {tour.description}
                </p>

                {/* Tour Details */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {tour.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <Link 
                  to="/tours"
                  state={{ tourId: tour.id }}
                  className="block w-full text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Tours Button */}
        <div className="text-center mt-12">
          <Link 
            to="/tours"
            className="inline-flex items-center space-x-2 bg-white border-2 border-emerald-500 text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <span>View All Tours</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;