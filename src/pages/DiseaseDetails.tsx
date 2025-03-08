import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface DiseaseDetail {
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  image: string;
}

const diseaseDetails: Record<string, DiseaseDetail> = {
  'late-blight': {
    name: 'Late Blight',
    description: 'Late blight is one of the most severe and widespread diseases of potatoes and tomatoes. It was responsible for the Irish potato famine of the 1840s and remains a significant threat to food security worldwide.',
    symptoms: [
      'Dark brown spots on leaves with pale green borders',
      'White fuzzy growth on leaf undersides in humid conditions',
      'Rapid wilting and death of affected tissue',
      'Brown lesions on stems and petioles',
      'Rotting fruits with greasy appearance',
      'Entire plant collapse in severe cases',
      'Characteristic musty odor from infected tissue'
    ],
    causes: [
      'Phytophthora infestans fungus',
      'Cool temperatures (60-70°F)',
      'High humidity or wet conditions',
      'Poor air circulation',
      'Overhead irrigation',
      'Infected seed potatoes or transplants',
      'Disease spores carried by wind'
    ],
    treatment: [
      'Remove and destroy infected plant parts immediately',
      'Apply fungicides containing copper or chlorothalonil',
      'Improve air circulation around plants',
      'Water at the base of plants to keep foliage dry',
      'Harvest remaining healthy produce',
      'Clear and destroy all plant debris',
      'Monitor plants regularly for early detection'
    ],
    prevention: [
      'Plant resistant varieties',
      'Maintain good spacing between plants',
      'Avoid overhead watering',
      'Practice crop rotation (3-4 year cycle)',
      'Keep garden free of debris',
      'Use certified disease-free seed potatoes',
      'Monitor weather conditions',
      'Apply preventive fungicides during high-risk periods'
    ],
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e'
  },
  'powdery-mildew': {
    name: 'Powdery Mildew',
    description: 'Powdery mildew is a widespread fungal disease affecting a wide range of plants, from ornamentals to vegetables. While rarely fatal, it can significantly reduce plant vigor, yield, and aesthetic value.',
    symptoms: [
      'White to gray powdery spots on leaves and stems',
      'Yellowing of infected leaves',
      'Distorted or stunted growth',
      'Premature leaf drop',
      'Reduced fruit quality',
      'Twisted or distorted buds',
      'Reduced photosynthesis in affected areas'
    ],
    causes: [
      'Various species of fungi in the Erysiphales order',
      'High humidity with low soil moisture',
      'Moderate temperatures (60-80°F)',
      'Poor air circulation',
      'Overcrowded plantings',
      'Shade or low light conditions',
      'Excessive nitrogen fertilization'
    ],
    treatment: [
      'Apply fungicides containing sulfur or potassium bicarbonate',
      'Remove heavily infected plant parts',
      'Increase air circulation',
      'Reduce humidity around plants',
      'Apply neem oil or other organic fungicides',
      'Prune to improve air flow',
      'Adjust watering practices'
    ],
    prevention: [
      'Choose resistant plant varieties',
      'Space plants properly',
      'Provide good air circulation',
      'Avoid overhead watering',
      'Water early in the day',
      'Maintain balanced fertilization',
      'Remove plant debris in fall',
      'Monitor plants regularly'
    ],
    image: 'https://images.unsplash.com/photo-1635852794742-c6e5d36f6f7f'
  },
  'black-spot': {
    name: 'Black Spot',
    description: 'Black spot is a serious fungal disease primarily affecting roses, though it can impact other plants as well. It is one of the most common and damaging diseases of garden roses worldwide.',
    symptoms: [
      'Circular black spots with fringed margins on leaves',
      'Yellow halos around spots',
      'Premature yellowing and leaf drop',
      'Reduced flower production',
      'Weakened plant vigor',
      'Spots may appear on stems',
      'Progressive defoliation from bottom up'
    ],
    causes: [
      'Diplocarpon rosae fungus',
      'Warm temperatures (75-85°F)',
      'High humidity',
      'Extended leaf wetness',
      'Poor air circulation',
      'Overcrowded plantings',
      'Susceptible rose varieties'
    ],
    treatment: [
      'Remove infected leaves promptly',
      'Apply fungicides preventively',
      'Improve air circulation',
      'Clean up fallen leaves',
      'Prune affected stems',
      'Adjust watering practices',
      'Apply compost tea to boost plant immunity'
    ],
    prevention: [
      'Plant resistant rose varieties',
      'Space plants for good air flow',
      'Avoid overhead watering',
      'Water early in the morning',
      'Mulch to prevent splash-back',
      'Prune for good air circulation',
      'Clean tools between plants',
      'Regular monitoring'
    ],
    image: 'https://images.unsplash.com/photo-1597482159428-f4348c34e795'
  },
  'bacterial-leaf-spot': {
    name: 'Bacterial Leaf Spot',
    description: 'Bacterial leaf spot is a common disease affecting a wide range of plants, including vegetables, fruits, and ornamentals. It can cause significant damage to crops and reduce plant productivity.',
    symptoms: [
      'Small, dark, water-soaked spots on leaves',
      'Spots with yellow halos',
      'Spots that may merge and form larger lesions',
      'Leaf holes as infected tissue falls out',
      'Brown to black spots on fruits',
      'Defoliation in severe cases',
      'Reduced fruit quality and yield'
    ],
    causes: [
      'Various species of bacteria (Xanthomonas, Pseudomonas)',
      'Warm, wet conditions',
      'Splashing water',
      'Poor air circulation',
      'Overhead irrigation',
      'Plant wounds',
      'Contaminated seeds or transplants'
    ],
    treatment: [
      'Remove infected plant parts',
      'Apply copper-based bactericides',
      'Improve air circulation',
      'Reduce humidity',
      'Avoid handling wet plants',
      'Sterilize tools between uses',
      'Protect plants from injury'
    ],
    prevention: [
      'Use disease-free seeds and transplants',
      'Rotate crops',
      'Space plants properly',
      'Avoid overhead watering',
      'Maintain good sanitation',
      'Control weeds',
      'Monitor plants regularly',
      'Use resistant varieties when available'
    ],
    image: 'https://images.unsplash.com/photo-1571682262898-48a3c34da9e9'
  },
  'fusarium-wilt': {
    name: 'Fusarium Wilt',
    description: 'Fusarium wilt is a devastating fungal disease that affects many important crops worldwide. It attacks through the roots and blocks the plant\'s water-conducting vessels, leading to wilting and death.',
    symptoms: [
      'Yellowing of lower leaves, often on one side',
      'Progressive wilting despite adequate water',
      'Brown discoloration in stem vessels',
      'Stunted growth',
      'Plant death in severe cases',
      'Downward curling of leaves',
      'Root and crown rot'
    ],
    causes: [
      'Fusarium oxysporum fungus',
      'Warm soil temperatures',
      'Poor drainage',
      'Plant stress',
      'Contaminated soil',
      'Root injury',
      'Previous crop infection'
    ],
    treatment: [
      'Remove and destroy infected plants',
      'Improve soil drainage',
      'Reduce plant stress',
      'Apply beneficial microorganisms',
      'Solarize soil in small areas',
      'Adjust soil pH if necessary',
      'Support plant health with proper nutrition'
    ],
    prevention: [
      'Plant resistant varieties',
      'Practice crop rotation',
      'Use clean growing media',
      'Avoid root injury',
      'Maintain proper soil pH',
      'Improve soil health',
      'Clean tools and equipment',
      'Monitor plant health regularly'
    ],
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe'
  },
  'rust': {
    name: 'Rust',
    description: 'Rust diseases are caused by a large group of fungi that produce distinctive rusty, orange-brown spores. They can affect almost any plant part and significantly reduce plant vigor and yield.',
    symptoms: [
      'Orange, yellow, or brown pustules on leaves',
      'Powdery spores that rub off easily',
      'Distorted plant growth',
      'Yellowing around rust spots',
      'Premature leaf drop',
      'Reduced plant vigor',
      'Stem cankers in some cases'
    ],
    causes: [
      'Various rust fungi species',
      'High humidity',
      'Moderate temperatures',
      'Extended leaf wetness',
      'Poor air circulation',
      'Alternate host plants',
      'Spores carried by wind'
    ],
    treatment: [
      'Remove infected plant parts',
      'Apply fungicides at first sign',
      'Improve air circulation',
      'Reduce humidity',
      'Clean up fallen leaves',
      'Support plant health',
      'Prune affected areas'
    ],
    prevention: [
      'Choose resistant varieties',
      'Space plants properly',
      'Avoid overhead watering',
      'Water early in day',
      'Remove alternate hosts',
      'Maintain good sanitation',
      'Monitor regularly',
      'Apply preventive fungicides when needed'
    ],
    image: 'https://images.unsplash.com/photo-1596377911789-933c172adb5b'
  }
};

const DiseaseDetails = () => {
  const { diseaseName } = useParams();
  const navigate = useNavigate();
  const disease = diseaseDetails[diseaseName || ''];

  if (!disease) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Disease not found</h1>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-green-600 hover:text-green-700"
        >
          Go back home
        </button>
      </div>
    );
  }

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
      <motion.button
        variants={itemVariants}
        onClick={() => navigate('/')}
        className="flex items-center text-green-600 hover:text-green-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </motion.button>

      <motion.div variants={itemVariants} className="bg-white dark:bg-dark-800 rounded-lg shadow-lg overflow-hidden">
        <img
          src={disease.image}
          alt={disease.name}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{disease.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{disease.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.section variants={itemVariants}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Symptoms</h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Causes</h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                {disease.causes.map((cause, index) => (
                  <li key={index}>{cause}</li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Treatment</h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                {disease.treatment.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Prevention</h2>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                {disease.prevention.map((prevention, index) => (
                  <li key={index}>{prevention}</li>
                ))}
              </ul>
            </motion.section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DiseaseDetails;