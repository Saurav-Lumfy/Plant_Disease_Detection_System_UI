import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Wit } from 'node-wit';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: number;
  intent?: string;
  confidence?: number;
}

const witClient = new Wit({
  accessToken: import.meta.env.VITE_WIT_ACCESS_TOKEN
});

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hi! I'm AgroDoc's plant care assistant. How can I help you today?", 
      isBot: true,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const processMessage = async (text: string) => {
    try {
      const witResponse = await witClient.message(text);
      
      const intent = witResponse.intents[0]?.name || 'unknown';
      const confidence = witResponse.intents[0]?.confidence || 0;

      let response = "I'm not sure how to help with that. Could you rephrase your question?";

      switch (intent) {
        case 'plant_disease_identification':
          response = "To identify a plant disease, please upload a clear photo of the affected plant part on the home page.";
          break;
        case 'plant_care_tips':
          response = "Here are some general plant care tips: ensure proper watering, provide adequate light, and monitor for signs of disease.";
          break;
        case 'disease_treatment':
          response = "For specific disease treatment recommendations, please provide more details about the symptoms or upload a photo.";
          break;
        case 'greeting':
          response = "Hello! How can I help you with your plants today?";
          break;
        case 'goodbye':
          response = "Goodbye! Feel free to return if you have more plant care questions.";
          break;
      }

      return { text: response, intent, confidence };
    } catch (error) {
      console.error('Error processing message:', error);
      return { 
        text: "I'm having trouble understanding right now. Please try again later.",
        intent: 'error',
        confidence: 0
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      const { text, intent, confidence } = await processMessage(input);
      
      setMessages(prev => [...prev, {
        text,
        isBot: true,
        timestamp: Date.now(),
        intent,
        confidence
      }]);
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        text: "I'm sorry, I encountered an error. Please try again later.",
        isBot: true,
        timestamp: Date.now()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 w-96 bg-white dark:bg-dark-800 rounded-lg shadow-xl overflow-hidden border border-green-200 dark:border-green-800"
        >
          <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <h3 className="font-semibold">Plant Care Assistant</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="hover:bg-white/10 rounded-full p-1"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-50 to-white dark:from-dark-900 dark:to-dark-800">
            {messages.map((message, index) => (
              <motion.div
                key={message.timestamp}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isBot 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300'
                  }`}>
                    {message.isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className={`p-3 rounded-lg ${
                      message.isBot 
                        ? 'bg-white dark:bg-dark-700 text-gray-800 dark:text-gray-200 shadow-sm' 
                        : 'bg-green-600 text-white shadow-sm'
                    }`}>
                      {message.text}
                    </div>
                    {message.intent && message.confidence && message.isBot && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
                        Intent: {message.intent} ({(message.confidence * 100).toFixed(1)}% confidence)
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t dark:border-dark-700 bg-white dark:bg-dark-800">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about plant care..."
                disabled={isProcessing}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-dark-700 dark:border-dark-600 dark:text-white disabled:opacity-50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={isProcessing}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-2 rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </div>
            {isProcessing && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Processing your message...
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;