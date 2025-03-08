import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const botReviews = [
  {
    name: "Dr. Sarah Johnson",
    role: "Plant Pathologist",
    rating: 5,
    review:
      "As a botanist, I'm impressed by AgroDoc's accuracy in identifying plant diseases. The AI model shows remarkable precision, especially with common crop diseases. It's become an invaluable tool in my research work.",
    date: "2 days ago",
    verified: true,
  },
  {
    name: "Michael Chen",
    role: "Urban Farmer",
    rating: 5,
    review:
      "This app helped me save my tomato plants from late blight. The treatment recommendations were spot-on! The interface is intuitive, and the real-time disease detection is incredibly helpful.",
    date: "1 week ago",
    verified: true,
  },
  {
    name: "Emma Thompson",
    role: "Home Gardener",
    rating: 4,
    review:
      "Very user-friendly interface and quick results. The AI seems to be learning and improving with each update. I particularly appreciate the detailed treatment suggestions and preventive measures.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    name: "David Garcia",
    role: "Agricultural Consultant",
    rating: 5,
    review:
      "A game-changer for both professional and amateur gardeners. The instant disease identification has saved many plants. The database of plant diseases is comprehensive and well-maintained.",
    date: "3 weeks ago",
    verified: true,
  },
  {
    name: "Lisa Anderson",
    role: "Botanical Researcher",
    rating: 4,
    review:
      "Great tool for both beginners and experienced gardeners. The community feedback feature is particularly helpful, and the continuous updates keep improving the accuracy of diagnoses.",
    date: "1 month ago",
    verified: true,
  },
];

const Review = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }
    if (!review.trim()) {
      toast.error('Please write a review');
      return;
    }

    toast.success('Review submitted successfully!');
    setRating(0);
    setReview('');
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please Login</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You need to be logged in to submit a review.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          Go to Login
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
      >
        Reviews
      </motion.h1>

      <motion.form
        onSubmit={handleSubmitReview}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Write a Review</h2>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoveredStar || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-400 dark:text-gray-600'
                }`}
              />
            </motion.button>
          ))}
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-dark-700 dark:border-dark-600 dark:text-white"
          rows={4}
          placeholder="Share your experience..."
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          Submit Review
        </motion.button>
      </motion.form>

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {botReviews.map((review, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 transition-colors duration-200"
          >
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{review.review}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{review.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{review.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                {review.verified && (
                  <span className="text-xs text-green-600 dark:text-green-400">Verified User</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Review;
