import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [counters, setCounters] = useState({ travelers: 0, tours: 0 });

  const slides = [
    {
      image: '/images/hero1.webp',
      title: 'Bicycle Adventure Tour',
      subtitle: 'Explore Ancient Ruins on Two Wheels'
    },
    {
      image: '/images/hero2.jpg',
      title: 'Wilpattu Safari Tour',
      subtitle: 'Wildlife Adventure Awaits'
    },
    {
      image: '/images/hero3.jpg',
      title: 'TukTuk Cultural Ride',
      subtitle: 'Authentic Local Experience'
    }
  ];

  // Typewriter effect
  useEffect(() => {
    const text = 'TukTuk Hire Available';
    let index = 0;
    const timer = setInterval(() => {
      setTypewriterText(text.slice(0, index));
      index++;
      if (index > text.length) {
        setTimeout(() => {
          index = 0;
          setTypewriterText('');
        }, 2000);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto slide change
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Counter animation
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000; // Animation duration in ms
      const stepTime = 20; // Time per step in ms
      const travelersTarget = 1000;
      const toursTarget = 50;

      let travelersCount = 0;
      let toursCount = 0;

      const incrementTravelers = travelersTarget / (duration / stepTime);
      const incrementTours = toursTarget / (duration / stepTime);

      const interval = setInterval(() => {
        travelersCount += incrementTravelers;
        toursCount += incrementTours;

        if (travelersCount >= travelersTarget && toursCount >= toursTarget) {
          setCounters({ travelers: travelersTarget, tours: toursTarget });
          clearInterval(interval);
        } else {
          setCounters({
            travelers: Math.min(Math.ceil(travelersCount), travelersTarget),
            tours: Math.min(Math.ceil(toursCount), toursTarget),
          });
        }
      }, stepTime);
    };

    animateCounters();
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Images with Parallax */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Discover
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Anuradhapura
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {slides[currentSlide].subtitle}
          </p>

          <div className="mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-lg text-emerald-300 font-semibold">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: '1.5s' }}>
            
              <Link 
                to="/tours"
                className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
              >
                <span>Explore Tours</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            
            
            <Link to="/videos">
              <button className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 border border-white/20">
                <Play className="w-5 h-5" />
                <span>Watch Video</span>
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '2s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{counters.travelers}+</div>
              <div className="text-white/80">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{counters.tours}</div>
              <div className="text-white/80">Tours Completed</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-3xl font-bold text-white">
                <span>4.9</span>
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="text-white/80">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;