
import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, ExternalLink } from 'lucide-react';

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 1,
      name: 'Green Chilli Restaurant',
      type: 'restaurant',
      coords: { x: 45, y: 35 },
      rating: 4.8,
      description: 'Authentic Sri Lankan cuisine',
      hours: '11:00 AM - 10:00 PM',
      phone: '+94 70 123 4567'
    },
    {
      id: 2,
      name: 'Chipmunk Homestay',
      type: 'accommodation',
      coords: { x: 60, y: 45 },
      rating: 4.9,
      description: 'Traditional family homestay',
      hours: '24/7 Check-in',
      phone: '+94 70 123 4568'
    },
    {
      id: 3,
      name: 'Ruwanwelisaya Stupa',
      type: 'attraction',
      coords: { x: 30, y: 55 },
      rating: 4.7,
      description: 'Ancient Buddhist stupa',
      hours: '6:00 AM - 6:00 PM',
      phone: 'Tourist Info'
    },
    {
      id: 4,
      name: 'Bicycle Tour Start',
      type: 'tour',
      coords: { x: 50, y: 25 },
      rating: 4.9,
      description: 'Adventure cycling tours',
      hours: '7:00 AM - 5:00 PM',
      phone: '+94 70 123 4569'
    },
    {
      id: 5,
      name: 'Wilpattu Safari Pickup',
      type: 'tour',
      coords: { x: 75, y: 60 },
      rating: 4.8,
      description: 'Wildlife safari tours',
      hours: '5:00 AM - 6:00 PM',
      phone: '+94 70 123 4570'
    }
  ];

  const getLocationIcon = (type) => {
    const iconClass = "w-6 h-6 text-white";
    switch (type) {
      case 'restaurant': return '🍽️';
      case 'accommodation': return '🏠';
      case 'attraction': return '🏛️';
      case 'tour': return '🚴';
      default: return '📍';
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case 'restaurant': return 'bg-orange-500';
      case 'accommodation': return 'bg-blue-500';
      case 'attraction': return 'bg-purple-500';
      case 'tour': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Explore <span className="text-emerald-600">Anuradhapura</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our locations and plan your perfect Sri Lankan adventure
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative">
                {/* Map Background */}
                <div 
                  className="w-full h-96 bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100 relative overflow-hidden cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334d399' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                >
                  {/* Roads/Paths */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <path
                      d="M10,30 Q30,20 50,30 T90,40"
                      stroke="#10b981"
                      strokeWidth="0.5"
                      fill="none"
                      opacity="0.3"
                    />
                    <path
                      d="M20,60 Q40,50 60,60 T90,70"
                      stroke="#10b981"
                      strokeWidth="0.5"
                      fill="none"
                      opacity="0.3"
                    />
                    <path
                      d="M40,10 Q45,30 50,50 Q55,70 60,90"
                      stroke="#10b981"
                      strokeWidth="0.5"
                      fill="none"
                      opacity="0.3"
                    />
                  </svg>

                  {/* Location Markers */}
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location.id === selectedLocation ? null : location.id)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        selectedLocation === location.id ? 'scale-125 z-10' : 'hover:scale-110'
                      }`}
                      style={{
                        left: `${location.coords.x}%`,
                        top: `${location.coords.y}%`,
                      }}
                    >
                      <div className={`w-12 h-12 ${getLocationColor(location.type)} rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse`}>
                        <span className="text-lg">{getLocationIcon(location.type)}</span>
                      </div>
                      
                      {/* Ripple Effect */}
                      <div className={`absolute inset-0 ${getLocationColor(location.type)} rounded-full animate-ping opacity-20`}></div>
                    </button>
                  ))}

                  {/* Selected Location Info */}
                  {selectedLocation && (
                    <div 
                      className="absolute bg-white rounded-lg shadow-xl p-4 min-w-64 z-20 animate-fade-in"
                      style={{
                        left: `${locations.find(l => l.id === selectedLocation)?.coords.x}%`,
                        top: `${locations.find(l => l.id === selectedLocation)?.coords.y - 15}%`,
                        transform: 'translateX(-50%)',
                      }}
                    >
                      {(() => {
                        const location = locations.find(l => l.id === selectedLocation);
                        return (
                          <div>
                            <h4 className="font-bold text-gray-800 mb-2">{location.name}</h4>
                            <p className="text-gray-600 text-sm mb-3">{location.description}</p>
                            
                            <div className="space-y-2 text-xs text-gray-500">
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{location.rating}/5</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{location.hours}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>{location.phone}</span>
                              </div>
                            </div>

                            <button className="mt-3 w-full bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors duration-300">
                              Get Directions
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Location List */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Locations</h3>
            
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location.id === selectedLocation ? null : location.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedLocation === location.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl'
                    : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-10 h-10 ${
                    selectedLocation === location.id ? 'bg-white/20' : getLocationColor(location.type)
                  } rounded-full flex items-center justify-center`}>
                    <span className={selectedLocation === location.id ? 'text-white' : 'text-white'}>
                      {getLocationIcon(location.type)}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold truncate ${
                      selectedLocation === location.id ? 'text-white' : 'text-gray-800'
                    }`}>
                      {location.name}
                    </h4>
                    <p className={`text-sm truncate ${
                      selectedLocation === location.id ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      {location.description}
                    </p>
                    <div className={`flex items-center space-x-1 mt-1 ${
                      selectedLocation === location.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{location.rating}/5</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {/* Real Google Maps Integration */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
              <h4 className="font-bold text-gray-800 mb-4">Need Real Directions?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Get accurate directions using Google Maps for the best navigation experience.
              </p>
              <a
                href="https://maps.google.com/?q=Anuradhapura,Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
