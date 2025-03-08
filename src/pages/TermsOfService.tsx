import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              By accessing and using AgroDoc, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Use License</h2>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
              <li>Permission is granted to temporarily use AgroDoc for personal, non-commercial purposes.</li>
              <li>This license shall automatically terminate if you violate any of these restrictions.</li>
              <li>Upon termination, you must destroy any downloaded materials.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The materials on AgroDoc are provided on an 'as is' basis. While we strive for accuracy, we make no warranties about the completeness, reliability, and accuracy of this information.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitations</h2>
            <p className="text-gray-600 dark:text-gray-300">
              AgroDoc shall not be held liable for any damages arising out of the use or inability to use the materials on the website.
            </p>
          </motion.section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TermsOfService;