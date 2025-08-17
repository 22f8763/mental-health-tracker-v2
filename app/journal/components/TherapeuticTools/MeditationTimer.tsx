import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Flower2, Play, Pause, RotateCcw } from 'lucide-react';

export default function MeditationTimer() {
  const [meditationTime, setMeditationTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const meditationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerActive) {
      meditationIntervalRef.current = setInterval(() => {
        setMeditationTime(prev => prev + 1);
      }, 1000);
    } else if (meditationIntervalRef.current) {
      clearInterval(meditationIntervalRef.current);
    }

    return () => {
      if (meditationIntervalRef.current) {
        clearInterval(meditationIntervalRef.current);
      }
    };
  }, [isTimerActive]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-300/30"
    >
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
        <Flower2 className="w-6 h-6 text-purple-400" />
        Mindfulness Meditation
      </h3>
      
      <div className="text-center">
        <div className="mb-8">
          <div className="text-6xl font-mono text-white mb-4">
            {formatTime(meditationTime)}
          </div>
          <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
              style={{ width: `${Math.min(meditationTime / 600 * 100, 100)}%` }}
            />
          </div>
        </div>
        
        <div className="space-x-4">
          <button
            onClick={() => setIsTimerActive(!isTimerActive)}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              isTimerActive 
                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {isTimerActive ? <Pause className="w-5 h-5 inline mr-2" /> : <Play className="w-5 h-5 inline mr-2" />}
            {isTimerActive ? 'Pause' : 'Start'} Meditation
          </button>
          
          <button
            onClick={() => {
              setMeditationTime(0);
              setIsTimerActive(false);
            }}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-white transition-all"
          >
            <RotateCcw className="w-5 h-5 inline mr-2" />
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
}