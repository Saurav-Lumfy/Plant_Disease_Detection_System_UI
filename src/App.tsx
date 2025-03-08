import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Review from './pages/Review';
import About from './pages/About';
import Login from './pages/Login';
import Account from './pages/Account';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HowItWorks from './pages/HowItWorks';
import TermsOfService from './pages/TermsOfService';
import DiseaseDetails from './pages/DiseaseDetails';
import Quiz from './pages/Quiz';
import Chatbot from './components/Chatbot';
import NotificationsPanel from './components/NotificationsPanel';
import { useNotifications } from './hooks/useNotifications';
import { useChatbot } from './hooks/useChatbot';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { isOpen: isNotificationsOpen, toggleNotifications } = useNotifications();
  const { isOpen: isChatbotOpen, toggleChatbot } = useChatbot();
  const { isDark } = useDarkMode();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDark ? 'dark bg-dark-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/review" element={<Review />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/disease/:diseaseName" element={<DiseaseDetails />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'dark:bg-dark-800 dark:text-white',
            duration: 3000,
            style: {
              background: isDark ? '#1e293b' : '#fff',
              color: isDark ? '#fff' : '#000',
            },
          }}
        />
        <NotificationsPanel 
          isOpen={isNotificationsOpen} 
          onClose={toggleNotifications}
        />
        <Chatbot 
          isOpen={isChatbotOpen} 
          onClose={toggleChatbot}
        />
      </div>
    </Router>
  );
}

export default App;