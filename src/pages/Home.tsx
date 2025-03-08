import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Brain } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const commonDiseases = [
  {
    id: 'late-blight',
    name: "Late Blight",
    description: "A devastating disease affecting tomatoes and potatoes, causing dark brown spots on leaves and fruits.",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e"
  },
  {
    id: 'powdery-mildew',
    name: "Powdery Mildew",
    description: "A fungal disease appearing as white powdery spots on leaves, stems, and flowers.",
    image: "https://images.unsplash.com/photo-1635852794742-c6e5d36f6f7f"
  },
  {
    id: 'black-spot',
    name: "Black Spot",
    description: "Common in roses, causing black spots on leaves and eventual leaf drop.",
    image: "https://images.unsplash.com/photo-1597482159428-f4348c34e795"
  },
  {
    id: 'bacterial-leaf-spot',
    name: "Bacterial Leaf Spot",
    description: "Causes water-soaked spots on leaves that turn brown with yellow halos.",
    image: "https://images.unsplash.com/photo-1571682262898-48a3c34da9e9"
  },
  {
    id: 'fusarium-wilt',
    name: "Fusarium Wilt",
    description: "A soil-borne fungal disease causing yellowing and wilting of leaves.",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe"
  },
  {
    id: 'rust',
    name: "Rust",
    description: "Appears as rusty, orange-brown spots on leaves and stems.",
    image: "https://images.unsplash.com/photo-1596377911789-933c172adb5b"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (!user) {
      toast.error('Please login to upload images');
      navigate('/login');
      return;
    }
    toast.success('Image uploaded successfully!');
  }, [user, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="text-center mb-16"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Your AI-Powered Plant Doctor
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          Instantly identify plant diseases and get treatment recommendations
        </motion.p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.02 }}
        className="mb-16"
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{
            borderColor: isDragActive ? '#10B981' : '#374151',
            backgroundColor: isDragActive ? '#065f46' : 'transparent'
          }}
          className="border-2 border-dashed rounded-lg p-12 text-center dark:border-gray-700"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-400" />
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {isDragActive
              ? 'Drop the image here'
              : 'Drag and drop an image here, or click to select'}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Supports JPG, JPEG, PNG, and GIF
          </p>
        </motion.div>
      </motion.div>

      {/* Quiz Game Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate('/quiz')}
        className="mb-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-8 text-white cursor-pointer shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Test Your Knowledge!</h2>
            <p className="text-green-100">Play our plant disease quiz game and earn points</p>
          </div>
          <Brain className="h-12 w-12 text-white" />
        </div>
      </motion.div>

      {/* Disease Facts Section */}
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
        >
          Common Plant Diseases
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {commonDiseases.map((disease, index) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate(`/disease/${disease.id}`)}
              className="bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 cursor-pointer"
            >
              <img
                src={disease.image}
                alt={disease.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {disease.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{disease.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;