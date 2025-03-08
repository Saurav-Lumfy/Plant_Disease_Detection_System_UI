import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const institution = {
    name: "G.L Bajaj Institute of Technology and Management",
    location: "Greater Noida",
  };

  const teamMembers = [
    {
      name: 'Saurav Varshney',
      role: 'Lead Developer',
      github: 'https://github.com/Saurav-Lumfy',
      linkedin: 'https://www.linkedin.com/in/saurav-varshney/',
    },
    {
      name: 'Yaashi Sharma',
      role: 'ML Developer',
      github: '#',
      linkedin: '#',
    },
    {
      name: 'Shiksha Rajput',
      role: 'Front End Developer',
      github: '#',
      linkedin: '#',
    },
    {
      name: 'Vashu',
      role: 'BackEnd Developer',
      github: '#',
      linkedin: '#',
    },
  ];

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
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center"
      >
        About AgroDoc
      </motion.h1>

      <motion.section
        variants={itemVariants}
        className="mb-12 bg-white dark:bg-dark-800 rounded-lg shadow-md p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Institution</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {institution.name}, {institution.location}
        </p>
      </motion.section>

      <div className="prose max-w-none dark:prose-invert">
        <motion.section variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6 transition-colors duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{member.role}</p>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Plant Diseases</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Plant diseases are abnormal growths and disruptions of a plant's normal functions, caused by pathogens, environmental conditions, or genetic factors. They can severely impact crop yields and plant health if not identified and treated early.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Importance of Plant Care</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Proper plant care is essential for maintaining healthy crops and gardens. Regular monitoring, appropriate watering, and early disease detection can prevent significant losses and ensure optimal plant growth.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How CNN Works</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Convolutional Neural Networks (CNNs) are deep learning algorithms that can identify visual patterns in images. Our system uses CNN to analyze plant images, detect disease symptoms, and provide accurate diagnoses based on trained models.
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;