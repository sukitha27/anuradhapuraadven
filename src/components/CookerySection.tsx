import React, { useState } from 'react';
import { Clock, Users, ChefHat, Star, Calendar, MapPin } from 'lucide-react';
import { FaGoogle, FaWhatsapp, FaTripadvisor } from 'react-icons/fa'; // Importing icons

const CookerySection = () => {
  const [selectedClass, setSelectedClass] = useState(0);

  const classes = [
    {
      title: 'Traditional Rice & Curry Workshop',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      duration: '3.30 hours',
      participants: '2-10 people',
      price: '$16',
      nextAvailable: 'Today 9:00 AM',
      description: 'Learn to prepare authentic Sri Lankan rice and curry with 5 different accompaniments (launch session)',
      includes: ['Rice', 'Chicken', 'Fried Lake Fish', 'Making Kokis', 'Herbal Juice'],
      schedule: [
        { time: '9:00 AM', activity: 'Welcome' },
        { time: '9:30 AM', activity: 'Spice Introduction' },
        { time: '12:00 PM', activity: 'Curry Preparation' },
        { time: '12:30 PM', activity: 'Enjoy Your Meal' }
      ]
    },
    {
      title: 'Pol Sambol and Coconut Rottie',
      image: '/images/Pol Sambol and Coconut Rottie.webp',
      duration: '2.5 hours',
      participants: '2-10 people',
      price: '',
      isSpecial: true, // Add this flag
      nextAvailable: 'Tomorrow 5:00 PM',
      description: 'Master the art of popular Sri Lankan street foods including and rotis',
      includes: ['Hands-on cooking', 'Technique training', 'Tasting session', 'Take-home snacks'],
      schedule: [
        { time: '5:00 PM', activity: 'Introduction to Sri Lankan Coconut Cuisine' },
        { time: '5:30 PM', activity: 'Coconut Roti Making (mixing dough, rolling, cooking on griddle)' },
        { time: '6:30 PM', activity: 'Fresh Coconut Preparation (grating, extracting milk)' },
        { time: '7:00 PM', activity: 'Pol Sambol Making (grinding coconut, adding chilies, onions, lime)' },
        { time: '8:00 PM', activity: 'Plating & Presentation Techniques' },
        { time: '8:30 PM', activity: 'Feast Time with Pol Sambol & Coconut Roti' }
      ]
    }
  ];

  return (
    <section id="cookery" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Cookery <span className="text-emerald-600">Classes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn the secrets of authentic Sri Lankan cuisine from local masters
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Class Selection */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Classes</h3>
            {classes.map((classItem, index) => (
              <button
                key={index}
                onClick={() => setSelectedClass(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedClass === index
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl'
                    : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <ChefHat className={`w-5 h-5 ${selectedClass === index ? 'text-white' : 'text-emerald-600'}`} />
                  <h4 className={`font-semibold ${selectedClass === index ? 'text-white' : 'text-gray-800'}`}>
                    {classItem.title}
                  </h4>
                </div>
                
                <div className={`text-sm space-y-1 ${selectedClass === index ? 'text-white/90' : 'text-gray-600'}`}>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{classItem.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{classItem.participants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next available:</span>
                    <span className="font-medium">{classItem.nextAvailable}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Class Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Class Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={classes[selectedClass].image}
                  alt={classes[selectedClass].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">{classes[selectedClass].title}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{classes[selectedClass].duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{classes[selectedClass].participants}</span>
                    </div>
                  </div>
                </div>
                {/* Price/Special Badge */}
                  {classes[selectedClass].isSpecial ? (
                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                      SPECIAL
                    </div>
                  ) : (
                    classes[selectedClass].price && (
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                        {classes[selectedClass].price}
                      </div>
                    )
                  )}
                
              </div>

              {/* Class Content */}
              <div className="p-8">
                {/* Description */}
                <p className="text-gray-600 text-lg mb-6">
                  {classes[selectedClass].description}
                </p>

                {/* What's Included */}
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">What's Included</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {classes[selectedClass].includes.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                
                {/* Simplified Timeline */}
                    <div className="mb-8">
                        <h4 className="text-xl font-bold text-gray-800 mb-6">Class Schedule</h4>
                        <div className="space-y-2">
                          {classes[selectedClass].schedule.map((item, index) => (
                            <div 
                              key={index} 
                              className="flex items-start space-x-4 p-3 rounded-lg transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm"
                            >
                              <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold transition-all duration-200 group-hover:bg-emerald-200">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-emerald-600">{item.time}</div>
                                <div className="text-gray-700">{item.activity}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    Book This Class
                  </button>
                  
                  <div className="flex space-x-3">
                    <a
                      href="https://g.co/kgs/zf56jPY"
                      className="bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      title="Share on Google"
                    >
                      <FaGoogle className="w-5 h-5" />
                    </a>
                    <a
                      href="https://wa.me/94701306430"
                      className="bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      title="WhatsApp Us"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.tripadvisor.com/Restaurant_Review-g304132-d32985750-Reviews-Green_Chilli_Restaurant_Anuradhapura-Anuradhapura_North_Central_Province.html?m=69573"
                      className="bg-orange-500 text-white p-4 rounded-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      title="TripAdvisor"
                    >
                      <FaTripadvisor className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Cook Like a Local?</h3>
          <p className="text-lg mb-6 text-white/90">
            Join our cooking classes and take home the authentic flavors of Sri Lanka
          </p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            View All Classes
          </button>
        </div>
      </div>
    </section>
  );
};

export default CookerySection;