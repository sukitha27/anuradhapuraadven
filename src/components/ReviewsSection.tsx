import React, { useState, useEffect } from 'react';
import { Star, Quote, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    const savedReviews = localStorage.getItem('anuradhapura-reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

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

  const displayedReviews = reviews.slice(0, 3);

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
                <span>{reviews.length} reviews</span>
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
          /* Reviews Display */
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayedReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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
    </section>
  );
};

export default ReviewsSection;