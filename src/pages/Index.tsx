import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Users, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeaturedTours from '../components/FeaturedTours';
import RestaurantSection from '../components/RestaurantSection';
import HomestaySection from '../components/HomestaySection';
import CookerySection from '../components/CookerySection';
import InteractiveMap from '../components/InteractiveMap';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import ChatBot from '../components/ChatBot'; // Import the ChatBot component

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturedTours />
      <RestaurantSection />
      <HomestaySection />
      <CookerySection />
      <InteractiveMap />
      <Footer />
      
      {/* Add the ChatBot component here */}
      <ChatBot />
    </div>
  );
};

export default Index;