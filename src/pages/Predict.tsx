import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Predict = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  if (!user) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-8"
        >
          <AlertCircle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please log in to view your prediction history and make new predictions.
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
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.h1
        variants={itemVariants}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
      >
        Your Predictions
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6"
      >
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <AlertCircle className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Predictions Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start by uploading a plant image from the home page to get disease predictions and treatment recommendations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Upload an Image
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Predict;