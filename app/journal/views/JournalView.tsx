 import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Brain, Sparkles, Loader2, AlertTriangle } from 'lucide-react';
import GratitudeSection from '../components/GratitudeSection/GratitudeSection';
import { useState, useEffect, useRef } from 'react';

interface JournalViewProps {
  journalEntry: string;
  setJournalEntry: (entry: string) => void;
  gratitudeList: string[];
  setGratitudeList: (list: string[]) => void;
  userEmail?: string;
}

export default function JournalView({
  journalEntry,
  setJournalEntry,
  gratitudeList,
  setGratitudeList,
  userEmail
}: JournalViewProps) {
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState<string[]>([]);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [journalEntry]);

  // Show notifications temporarily
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const analyzeJournal = async () => {
    if (journalEntry.trim().length < 10) {
      setNotification({
        type: 'error',
        message: 'Please write at least 10 characters for analysis'
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: journalEntry, userEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        setAiResponse(data.message);
        setAnalysisHistory(prev => [data.message, ...prev.slice(0, 4)]);
        setNotification({
          type: 'success',
          message: 'Analysis complete!'
        });
      } else {
        throw new Error(data.message || 'Analysis failed');
      }
    } catch (error) {
      console.error(error);
      setNotification({
        type: 'error',
        message: 'Failed to analyze. Please try again.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      analyzeJournal();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-8">
      {/* Notification System */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg ${
              notification.type === 'success' 
                ? 'bg-green-500/90 text-white' 
                : 'bg-red-500/90 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <Sparkles size={18} />
              ) : (
                <AlertTriangle size={18} />
              )}
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          Mindful Journal
        </motion.h2>
        <p className="text-white/70 max-w-md mx-auto">
          Reflect on your thoughts and gain AI-powered insights into your emotions
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Journal Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-blue-400" />
            Express Your Thoughts
          </h3>
          
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full min-h-[250px] p-6 bg-black/20 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none backdrop-blur-sm"
              placeholder="How are you feeling today? What thoughts are on your mind? Write freely about your experiences, emotions, challenges, and victories..."
            />
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-white/60 text-sm">
                {journalEntry.length} chars • {journalEntry.trim().split(/\s+/).filter(Boolean).length} words
              </p>
              <button 
                onClick={analyzeJournal}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 disabled:opacity-60 flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Analyze Entry
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-white/50 flex flex-wrap justify-between gap-2">
            <span>Press Ctrl+Enter to analyze</span>
            <span>Powered by Google Gemini</span>
          </div>
        </motion.div>

        {/* AI Analysis Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-indigo-900/30 to-pink-900/30 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg h-full flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-400" />
              AI Insights
            </h3>
            {analysisHistory.length > 0 && (
              <button 
                onClick={() => setAiResponse('')}
                className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="flex-grow bg-black/20 border border-white/10 rounded-xl p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-white/60"
                >
                  <Loader2 className="w-12 h-12 animate-spin text-purple-400 mb-4" />
                  <p>Analyzing your journal entry...</p>
                  <p className="text-sm mt-2">Finding patterns and emotional insights</p>
                </motion.div>
              ) : aiResponse ? (
                <motion.div
                  key="response"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white whitespace-pre-wrap leading-relaxed"
                >
                  {aiResponse}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-4 text-white/60"
                >
                  <Sparkles className="w-12 h-12 text-purple-400 mb-4" />
                  <h4 className="text-xl font-medium text-white/80 mb-2">Your AI Insights Will Appear Here</h4>
                  <p className="max-w-xs">
                    Write a journal entry and click "Analyze" to get personalized reflections on your thoughts and emotions.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Analysis History */}
          {analysisHistory.length > 0 && (
            <div className="mt-4">
              <h4 className="text-white/80 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                Previous Insights
              </h4>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {analysisHistory.map((response, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAiResponse(response)}
                    className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap truncate max-w-[160px]"
                  >
                    Insight #{analysisHistory.length - idx}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GratitudeSection 
          gratitudeList={gratitudeList} 
          setGratitudeList={setGratitudeList} 
        />
      </motion.div>
    </div>
  );
}