import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Users, Star } from 'lucide-react';
import ReviewsSection from "@/components/ReviewsSection";
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import FeaturedTours from '../components/FeaturedTours';
import RestaurantSection from '../components/RestaurantSection';
import HomestaySection from '../components/HomestaySection';
import CookerySection from '../components/CookerySection';
import InteractiveMap from '../components/InteractiveMap';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';


const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturedTours />
      <RestaurantSection />
      <HomestaySection />
      <CookerySection />
      <InteractiveMap />
      {/* Reviews Section */}
      <ReviewsSection />
      <Footer />
      
      {/* ChatBot positioned at the bottom */}
      <ChatBot />
      
    </div>
  );
};

export default Index;