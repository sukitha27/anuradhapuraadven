import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using OpenWeatherMap API - you'll need to replace 'YOUR_API_KEY' with actual API key
        const API_KEY = '08733c51b20691c9d42c17621f7d582b'; // Replace with your OpenWeatherMap API key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Anuradhapura,LK&appid=${API_KEY}&units=metric`
        );
        
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        } else {
          // Fallback mock data for demonstration
          setWeather({
            main: { temp: 28, humidity: 75 },
            weather: [{ main: 'Clear', description: 'clear sky' }],
            wind: { speed: 3.2 }
          });
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        // Fallback mock data
        setWeather({
          main: { temp: 28, humidity: 75 },
          weather: [{ main: 'Clear', description: 'clear sky' }],
          wind: { speed: 3.2 }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Update weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear':
        return <Sun size={16} className="text-yellow-500" />;
      case 'clouds':
        return <Cloud size={16} className="text-gray-500" />;
      case 'rain':
        return <CloudRain size={16} className="text-blue-500" />;
      case 'snow':
        return <CloudSnow size={16} className="text-blue-300" />;
      default:
        return <Sun size={16} className="text-yellow-500" />;
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Tours', href: '#tours' },
    { name: 'Restaurant', href: '#restaurant' },
    { name: 'Homestay', href: '#homestay' },
    { name: 'Cookery Classes', href: '#cookery' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
           {/* Logo Section */}
          <div className="flex items-center space-x-3">
            {/* Logo Image */}
            <img 
              src="/images/logo.png" // Replace with your logo path
              alt="Logo"
              className="w-16 h-16 object-contain rounded-full" // Adjust size as needed
            />
            {/* Brand Name */}
            <div>
              <h1
                className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                Anuradhapura
              </h1>
              <p
                className={`text-sm transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-white/80'
                }`}
              >
                Homestay
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative font-medium transition-colors duration-300 hover:text-emerald-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                } group`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Weather Widget & Contact Info */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Weather Widget */}
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border transition-colors duration-300 ${
              isScrolled 
                ? 'bg-white/80 border-gray-200 text-gray-700' 
                : 'bg-white/20 border-white/30 text-white backdrop-blur-sm'
            }`}>
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
              ) : (
                <>
                  {getWeatherIcon(weather?.weather[0]?.main)}
                  <span className="text-sm font-medium">
                    {Math.round(weather?.main?.temp)}°C
                  </span>
                  <span className="text-xs opacity-75">
                    {weather?.weather[0]?.description}
                  </span>
                </>
              )}
            </div>

            {/* Contact Info */}
            <div className={`flex items-center space-x-1 text-sm ${
              isScrolled ? 'text-gray-600' : 'text-white/80'
            }`}>
              <Phone size={16} />
              <span>+94 70 130 6430</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-white/95 backdrop-blur-md`}>
        <div className="px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 font-medium hover:text-emerald-500 transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
          
          {/* Mobile Weather Widget */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Current Weather</span>
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-500 border-t-transparent"></div>
              ) : (
                <div className="flex items-center space-x-2">
                  {getWeatherIcon(weather?.weather[0]?.main)}
                  <span className="text-sm font-medium text-gray-700">
                    {Math.round(weather?.main?.temp)}°C
                  </span>
                </div>
              )}
            </div>
            
            {!loading && weather && (
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Wind size={12} />
                  <span>Wind: {weather.wind?.speed} m/s</span>
                </div>
                <div>
                  <span>Humidity: {weather.main?.humidity}%</span>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone size={16} />
              <span>+94 70 130 6430</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 