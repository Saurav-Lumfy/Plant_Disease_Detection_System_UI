import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'New Feature',
    message: 'Try our improved plant disease detection!',
    time: '2 minutes ago'
  },
  {
    id: 2,
    title: 'Tip of the Day',
    message: 'Learn how to prevent common plant diseases',
    time: '1 hour ago'
  },
  {
    id: 3,
    title: 'Community Update',
    message: 'Join our growing community of plant enthusiasts',
    time: '2 hours ago'
  }
];

const NotificationsPanel = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed top-20 right-4 w-80 bg-white rounded-lg shadow-xl"
        >
          <div className="p-4 border-b flex justify-between items-center bg-green-600 text-white rounded-t-lg">
            <h3 className="font-semibold">Notifications</h3>
            <button onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 border-b hover:bg-gray-50"
              >
                <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                <span className="text-xs text-gray-400 mt-2 block">{notification.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;