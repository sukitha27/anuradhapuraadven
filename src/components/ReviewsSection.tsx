import React, { useState, useEffect } from 'react';
import { Star, Quote, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock navigation function for demonstration
  const navigate = (path: string) => {
    console.log(`Navigating to: ${path}`);
  };

  // Fetch reviews from Firebase with localStorage fallback
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        const reviewsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate().toISOString() || new Date().toISOString()
        })) as Review[];
        
        // Sort by date (newest first)
        reviewsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setReviews(reviewsData);
        localStorage.setItem('anuradhapura-reviews', JSON.stringify(reviewsData));
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Showing cached version.');
        // Fallback to localStorage
        const localReviews = localStorage.getItem('anuradhapura-reviews');
        if (localReviews) setReviews(JSON.parse(localReviews));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (reviews.length > 1 && isAutoSliding) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.max(1, reviews.length - (window.innerWidth < 768 ? 0 : 2)));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [reviews.length, isAutoSliding]);

  // Add a new review
  const addReview = async (reviewData: Omit<Review, 'id' | 'date'>) => {
    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        ...reviewData,
        date: Timestamp.now()
      });
      
      // Refresh reviews
      const querySnapshot = await getDocs(collection(db, 'reviews'));
      const updatedReviews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate().toISOString() || new Date().toISOString()
      })) as Review[];
      
      setReviews(updatedReviews);
      localStorage.setItem('anuradhapura-reviews', JSON.stringify(updatedReviews));
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding review:', error);
      return { success: false, error: 'Failed to submit review' };
    }
  };

  // Render star ratings
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

  // Mobile touch handlers
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
  };

  // Navigation functions
  const nextSlide = () => {
    setIsAutoSliding(false);
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, reviews.length - (window.innerWidth < 768 ? 0 : 2)));
  };

  const prevSlide = () => {
    setIsAutoSliding(false);
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, reviews.length - (window.innerWidth < 768 ? 0 : 2))) % 
      Math.max(1, reviews.length - (window.innerWidth < 768 ? 0 : 2)));
  };

  const goToSlide = (index: number) => {
    setIsAutoSliding(false);
    setCurrentSlide(index);
  };

  // Get reviews to display (1 on mobile, 3 on desktop)
  const getDisplayedReviews = () => {
    if (window.innerWidth < 768) {
      return reviews.length > 0 ? [reviews[currentSlide % reviews.length]] : [];
    }
    if (reviews.length <= 3) return reviews;
    
    const displayed = [];
    for (let i = 0; i < 3; i++) {
      const reviewIndex = (currentSlide + i) % reviews.length;
      displayed.push(reviews[reviewIndex]);
    }
    return displayed;
  };

  const displayedReviews = getDisplayedReviews();
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="animate-pulse">Loading reviews...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Guests Say</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover why travelers choose Anuradhapura Adventures for their authentic Sri Lankan experience
          </p>
          
          {reviews.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mt-8">
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

        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="text-yellow-700">{error}</div>
            </div>
          </div>
        )}

        {reviews.length === 0 ? (
          /* No Reviews State */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-md mx-auto">
              <Quote className="w-12 h-12 md:w-16 md:h-16 text-emerald-500 mx-auto mb-6" />
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Be Our First Reviewer!</h3>
              <p className="text-gray-600 mb-6 md:mb-8">
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
              {reviews.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="hidden sm:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110"
                    onMouseEnter={() => setIsAutoSliding(false)}
                    onMouseLeave={() => setIsAutoSliding(true)}
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="hidden sm:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-gray-50 rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110"
                    onMouseEnter={() => setIsAutoSliding(false)}
                    onMouseLeave={() => setIsAutoSliding(true)}
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                  </button>
                </>
              )}

              {/* Reviews Grid */}
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {displayedReviews.map((review, index) => (
                  <div
                    key={`${review.id}-${index}`}
                    className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
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
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-6 h-6 md:w-8 md:h-8 text-emerald-200" />
                      <p className="text-gray-700 leading-relaxed pl-6 md:pl-8 italic">
                        "{review.comment}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide Indicators */}
              {reviews.length > 1 && (
                <div className="flex justify-center space-x-2 mb-8">
                  {Array.from({ length: Math.max(1, window.innerWidth < 768 ? reviews.length : reviews.length - 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
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
              <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => navigate('/reviews')}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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