import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Bell, MessageCircle, Moon, Sun, Brain } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useNotifications } from '../hooks/useNotifications';
import { useChatbot } from '../hooks/useChatbot';
import { useDarkMode } from '../hooks/useDarkMode';

const Navbar = () => {
  const { user } = useAuth();
  const { toggleNotifications, hasUnread } = useNotifications();
  const { toggleChatbot } = useChatbot();
  const { isDark, setIsDark } = useDarkMode();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`${
        isDark 
          ? 'bg-dark-800 border-dark-700' 
          : 'bg-gradient-to-r from-emerald-500 to-green-600'
      } shadow-lg sticky top-0 z-50 border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">AgroDoc</span>
            </Link>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/" className="text-white hover:text-green-100">Home</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/predict" className="text-white hover:text-green-100">Predict</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/quiz" className="text-white hover:text-green-100">Quiz Game</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/review" className="text-white hover:text-green-100">Review</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/about" className="text-white hover:text-green-100">About</Link>
              </motion.div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDark(!isDark)}
                className="text-white hover:text-green-100"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-white hover:text-green-100"
                onClick={toggleNotifications}
              >
                <Bell className="h-6 w-6" />
                {hasUnread && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-green-100"
                onClick={toggleChatbot}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.button>

              {user ? (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/account" className="text-white hover:text-green-100">Account</Link>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link 
                    to="/login" 
                    className={`${
                      isDark 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-white text-green-600 hover:bg-green-50'
                    } px-4 py-2 rounded-md transition-colors`}
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-white/10 px-4 py-2">
        <div className="flex flex-col space-y-2">
          <Link to="/" className="text-white hover:text-green-100 py-2">Home</Link>
          <Link to="/predict" className="text-white hover:text-green-100 py-2">Predict</Link>
          <Link to="/quiz" className="text-white hover:text-green-100 py-2">Quiz Game</Link>
          <Link to="/review" className="text-white hover:text-green-100 py-2">Review</Link>
          <Link to="/about" className="text-white hover:text-green-100 py-2">About</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;