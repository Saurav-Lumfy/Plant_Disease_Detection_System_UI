import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Collection</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We collect and process the following information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
              <li>Email address for account creation and communication</li>
              <li>Phone number for account verification</li>
              <li>Plant images uploaded for disease detection</li>
              <li>User reviews and feedback</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Usage</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your data is used to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
              <li>Provide plant disease detection services</li>
              <li>Improve our machine learning models</li>
              <li>Send important notifications about your account</li>
              <li>Enhance user experience</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Protection</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We implement security measures to protect your personal information and ensure it is not accessed, disclosed, altered, or destroyed without authorization.
            </p>
          </motion.section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;