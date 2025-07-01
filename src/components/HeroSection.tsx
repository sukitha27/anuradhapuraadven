
import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');

  const slides = [
    {
      image: '/images/hero1.jpg',
      title: 'Bicycle Adventure Tour',
      subtitle: 'Explore Ancient Ruins on Two Wheels'
    },
    {
      image: '/images/hero2.jpg',
      title: 'Wilpattu Safari Tour',
      subtitle: 'Wildlife Adventure Awaits'
    },
    {
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'TukTuk Cultural Ride',
      subtitle: 'Authentic Local Experience'
    }
  ];

  // Typewriter effect for TukTuk Hire
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

  // Parallax scroll effect
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
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Discover
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Anuradhapura
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {slides[currentSlide].subtitle}
          </p>

          {/* Typewriter Text */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="text-lg text-emerald-300 font-semibold">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <button className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2">
              <span>Explore Tours</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 border border-white/20">
              <Play className="w-5 h-5" />
              <span>Watch Video</span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '2s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white counter" data-target="500">0</div>
              <div className="text-white/80">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white counter" data-target="50">0</div>
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

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
