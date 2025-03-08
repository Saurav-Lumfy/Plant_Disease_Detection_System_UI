import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
}

interface QuizAttempt {
  id: string;
  user_id: string;
  score: number;
  total_questions: number;
  completed_at: string;
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchQuestions();
    fetchQuizAttempts();
  }, [user, navigate]);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .limit(10);

      if (error) throw error;
      
      // Randomize the questions array
      const shuffledQuestions = data.sort(() => Math.random() - 0.5);
      setQuestions(shuffledQuestions);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to load questions');
      console.error('Error fetching questions:', error);
    }
  };

  const fetchQuizAttempts = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user?.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setQuizAttempts(data);
    } catch (error) {
      console.error('Error fetching quiz attempts:', error);
    }
  };

  const handleAnswer = async (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === questions[currentQuestion].correct_answer;
    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct answer!');
    } else {
      toast.error('Wrong answer!');
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setQuizComplete(true);
        saveQuizAttempt();
      }
    }, 1500);
  };

  const saveQuizAttempt = async () => {
    try {
      const { error } = await supabase
        .from('quiz_attempts')
        .insert([
          {
            user_id: user?.id,
            score: score,
            total_questions: questions.length,
            completed_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      fetchQuizAttempts();
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
      toast.error('Failed to save quiz results');
    }
  };

  const restartQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizComplete(false);
    setIsLoading(true);
    fetchQuestions();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
        {!quizComplete ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                Score: {score}
              </span>
            </div>

            <div className="mb-8">
              <p className="text-xl text-gray-800 dark:text-gray-200">
                {questions[currentQuestion]?.question}
              </p>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-left rounded-lg transition-colors duration-200 ${
                      isAnswered
                        ? index === questions[currentQuestion].correct_answer
                          ? 'bg-green-100 dark:bg-green-900 border-green-500'
                          : index === selectedAnswer
                          ? 'bg-red-100 dark:bg-red-900 border-red-500'
                          : 'bg-gray-100 dark:bg-dark-700'
                        : 'bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600'
                    } border-2 ${
                      isAnswered && index === selectedAnswer
                        ? index === questions[currentQuestion].correct_answer
                          ? 'border-green-500'
                          : 'border-red-500'
                        : 'border-transparent'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quiz Complete!
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your final score: {score} out of {questions.length}
            </p>

            {quizAttempts.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Your Progress
                </h3>
                <div className="space-y-4">
                  {quizAttempts.slice(0, 5).map((attempt, index) => (
                    <div
                      key={attempt.id}
                      className="bg-gray-100 dark:bg-dark-700 p-4 rounded-lg"
                    >
                      <p className="text-gray-800 dark:text-gray-200">
                        Attempt {quizAttempts.length - index}: {attempt.score}/{attempt.total_questions}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(attempt.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={restartQuiz}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Quiz;