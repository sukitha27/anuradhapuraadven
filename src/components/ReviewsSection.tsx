import React, { useState, useEffect } from 'react';
import { Star, Quote, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  location?: string;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // Mock navigation function for demonstration
  const navigate = (path: string) => {
    console.log(`Navigating to: ${path}`);
    // In a real app, this would use react-router-dom or your routing solution
  };

  useEffect(() => {
    // Load reviews from multiple sources and merge them
    const loadReviews = () => {
      const sources = [
        'anuradhapura-reviews', // Main storage
        'anuradhapura-reviews-mobile', // Mobile backup
        'anuradhapura-reviews-desktop', // Desktop backup
        'anuradhapura-reviews-backup' // General backup
      ];

      let allReviews: Review[] = [];

      // Load from all sources and merge
      sources.forEach(source => {
        const savedReviews = localStorage.getItem(source);
        if (savedReviews) {
          try {
            const parsedReviews = JSON.parse(savedReviews);
            allReviews = [...allReviews, ...parsedReviews];
          } catch (error) {
            console.error(`Error parsing reviews from ${source}:`, error);
          }
        }
      });

      // Remove duplicates based on id
      const uniqueReviews = allReviews.filter((review, index, self) => 
        index === self.findIndex(r => r.id === review.id)
      );

      // Sort by date (newest first)
      uniqueReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setReviews(uniqueReviews);

      // Save consolidated reviews to all sources for cross-device sync
      const reviewsJson = JSON.stringify(uniqueReviews);
      sources.forEach(source => {
        localStorage.setItem(source, reviewsJson);
      });
    };

    loadReviews();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes('anuradhapura-reviews')) {
        loadReviews();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (reviews.length > 3 && isAutoSliding) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.max(1, reviews.length - 2));
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [reviews.length, isAutoSliding]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const nextSlide = () => {
    setIsAutoSliding(false);
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, reviews.length - 2));
  };

  const prevSlide = () => {
    setIsAutoSliding(false);
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, reviews.length - 2)) % Math.max(1, reviews.length - 2));
  };

  const goToSlide = (index: number) => {
    setIsAutoSliding(false);
    setCurrentSlide(index);
  };

  // Get reviews to display (3 at a time)
  const getDisplayedReviews = () => {
    if (reviews.length <= 3) return reviews;
    
    const displayed = [];
    for (let i = 0; i < 3; i++) {
      const reviewIndex = (currentSlide + i) % reviews.length;
      displayed.push(reviews[reviewIndex]);
    }
    return displayed;
  };

  const displayedReviews = getDisplayedReviews();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Guests Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover why travelers choose Anuradhapura Adventures for their authentic Sri Lankan experience
          </p>
          
          {reviews.length > 0 && (
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="flex items-center space-x-2">
                {renderStars(Math.round(averageRating))}
                <span className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
              </div>
            </div>
          )}
        </div>

        {reviews.length === 0 ? (
          /* No Reviews State */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Quote className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Be Our First Reviewer!</h3>
              <p className="text-gray-600 mb-8">
                Share your experience and help other travelers discover the magic of Anuradhapura
              </p>
              <button
                onClick={() => navigate('/reviews')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Star className="w-4 h-4" />
                <span>Write First Review</span>
              </button>
            </div>
          </div>
        ) : (
          /* Reviews Carousel */
          <>
            <div className="relative">
              {/* Navigation Arrows */}
              {reviews.length > 3 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                    onMouseEnter={() => setIsAutoSliding(false)}
                    onMouseLeave={() => setIsAutoSliding(true)}
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                    onMouseEnter={() => setIsAutoSliding(false)}
                    onMouseLeave={() => setIsAutoSliding(true)}
                  >
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                  </button>
                </>
              )}

              {/* Reviews Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedReviews.map((review, index) => (
                  <div
                    key={`${review.id}-${index}`}
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{review.name}</h3>
                        {review.location && (
                          <p className="text-sm text-gray-500">From {review.location}</p>
                        )}
                      </div>
                      <div className="text-right">
                        {renderStars(review.rating)}
                        <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-emerald-200" />
                      <p className="text-gray-700 leading-relaxed pl-6 italic">
                        "{review.comment}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide Indicators */}
              {reviews.length > 3 && (
                <div className="flex justify-center space-x-2 mb-8">
                  {Array.from({ length: Math.max(1, reviews.length - 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-emerald-500 scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-4">
                <button
                  onClick={() => navigate('/reviews')}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Star className="w-4 h-4" />
                  <span>Write a Review</span>
                </button>
                
                {reviews.length > 3 && (
                  <button
                    onClick={() => navigate('/reviews')}
                    className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300"
                  >
                    <span>View All Reviews</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection;