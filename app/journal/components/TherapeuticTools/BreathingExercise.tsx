import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Wind } from 'lucide-react';

export default function BreathingExercise() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (breathingActive) {
      breathingIntervalRef.current = setInterval(() => {
        setBreathingCount(prev => {
          if (breathingPhase === 'inhale' && prev >= 3) {
            setBreathingPhase('hold');
            return 0;
          } else if (breathingPhase === 'hold' && prev >= 6) {
            setBreathingPhase('exhale');
            return 0;
          } else if (breathingPhase === 'exhale' && prev >= 7) {
            setBreathingPhase('inhale');
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
    }

    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    };
  }, [breathingActive, breathingPhase]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-3xl p-8 border border-blue-300/30"
    >
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
        <Wind className="w-6 h-6 text-blue-400" />
        4-7-8 Breathing Exercise
      </h3>
      
      <div className="text-center">
        <div className="mb-8">
          <div className={`w-32 h-32 mx-auto rounded-full border-4 border-blue-400 flex items-center justify-center transition-all duration-1000 ${
            breathingActive ? (breathingPhase === 'inhale' ? 'scale-125 bg-blue-400/20' : 
                             breathingPhase === 'hold' ? 'scale-110 bg-yellow-400/20' : 
                             'scale-90 bg-purple-400/20') : 'scale-100'
          }`}>
            <div className="text-center">
              <p className="text-white text-sm uppercase tracking-wide">
                {breathingActive ? breathingPhase : 'Ready'}
              </p>
              <p className="text-white text-2xl font-bold">
                {breathingActive ? breathingCount : '0'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-x-4">
          <button
            onClick={() => setBreathingActive(!breathingActive)}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              breathingActive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {breathingActive ? 'Stop' : 'Start'} Breathing
          </button>
        </div>
        
        <p className="text-white/70 mt-6 max-w-md mx-auto">
          Inhale for 4 counts, hold for 7 counts, exhale for 8 counts. This technique helps reduce anxiety and promote relaxation.
        </p>
      </div>
    </motion.div>
  );
}