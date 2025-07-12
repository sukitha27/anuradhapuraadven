import React, { useState, useEffect } from 'react';
import { Star, Send, ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, Timestamp, query, orderBy, limit } from 'firebase/firestore';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  location?: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: '',
    location: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch reviews from Firebase with localStorage fallback
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          orderBy('date', 'desc'),
          limit(20)
        );
        const querySnapshot = await getDocs(q);
        
        const reviewsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate().toLocaleDateString() || new Date().toLocaleDateString()
        })) as Review[];
        
        setReviews(reviewsData);
        localStorage.setItem('anuradhapura-reviews', JSON.stringify(reviewsData));
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Fallback to localStorage
        const localReviews = localStorage.getItem('anuradhapura-reviews');
        if (localReviews) setReviews(JSON.parse(localReviews));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.comment || formData.rating === 0) {
      toast({
        title: "Please fill all required fields",
        description: "Name, rating, and comment are required.",
        variant: "destructive"
      });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        name: formData.name,
        rating: formData.rating,
        comment: formData.comment,
        location: formData.location,
        date: Timestamp.now()
      });

      const newReview: Review = {
        id: docRef.id,
        name: formData.name,
        rating: formData.rating,
        comment: formData.comment,
        location: formData.location,
        date: new Date().toLocaleDateString()
      };

      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem('anuradhapura-reviews', JSON.stringify(updatedReviews));

      toast({
        title: "Thank you for your review!",
        description: "Your review has been submitted successfully.",
      });

      setFormData({ name: '', rating: 0, comment: '', location: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error submitting review",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 ${
              star <= (interactive ? (hoveredRating || rating) : rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-all duration-200' : ''}`}
            onClick={() => interactive && onStarClick?.(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Share Your Experience</h1>
          <p className="text-lg sm:text-xl text-gray-600">We'd love to hear about your adventure with us!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Review Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-2" />
              Write a Review
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Where are you from?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-4">
                  {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                  <span className="text-sm text-gray-500">
                    {formData.rating > 0 ? `${formData.rating} star${formData.rating !== 1 ? 's' : ''}` : 'Select rating'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  placeholder="Tell us about your experience..."
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                disabled={loading}
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Recent Reviews</h2>
            
            {loading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex justify-between mb-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No reviews yet.</p>
                <p className="text-gray-400">Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0 group">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                        {review.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    {renderStars(review.rating)}
                    {review.location && (
                      <p className="text-sm text-gray-500 mt-1">
                        From: <span className="text-gray-600">{review.location}</span>
                      </p>
                    )}
                    <p className="text-gray-700 mt-2 group-hover:text-gray-800 transition-colors">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;