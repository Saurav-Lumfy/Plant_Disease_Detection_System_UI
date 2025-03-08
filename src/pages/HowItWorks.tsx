import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <motion.div variants={itemVariants} className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">How It Works</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Convolutional Neural Networks (CNN)</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our plant disease detection system uses state-of-the-art Convolutional Neural Networks (CNN) to analyze plant images. Here's how it works:
            </p>
            <ol className="list-decimal pl-6 space-y-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong className="text-gray-900 dark:text-white">Image Input:</strong> When you upload an image, it's preprocessed to normalize size and color.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Feature Extraction:</strong> The CNN extracts important features from the image using multiple convolutional layers.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Pattern Recognition:</strong> These features are analyzed to identify patterns associated with various plant diseases.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Classification:</strong> The model classifies the disease based on learned patterns from thousands of training images.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-white">Results:</strong> You receive accurate disease identification and treatment recommendations.
              </li>
            </ol>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Model Training</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our CNN model has been trained on a vast dataset of plant images, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
              <li>Healthy plants</li>
              <li>Various disease stages</li>
              <li>Different environmental conditions</li>
              <li>Multiple plant species</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Continuous Improvement</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The system continuously learns from new data, improving its accuracy over time. User feedback and expert validation help refine the model's predictions.
            </p>
          </motion.section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HowItWorks;