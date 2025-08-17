import { motion } from 'framer-motion';
import MoodTracker from '../components/MoodTracker/MoodTracker';
import GoalsManager from '../components/GoalsManager/GoalsManager';
import { TherapeuticTool } from '../types/mentalHealthTypes';

interface DashboardViewProps {
  moodScore: number;
  setMoodScore: (score: number) => void;
  anxietyLevel: number;
  setAnxietyLevel: (level: number) => void;
  energyLevel: number;
  setEnergyLevel: (level: number) => void;
  sleepHours: number;
  setSleepHours: (hours: number) => void;
  goals: any[];
  setGoals: (goals: any[]) => void;
  therapeuticTools: TherapeuticTool[];
  handleNavigation: (view: string) => void;
}

export default function DashboardView({
  moodScore,
  setMoodScore,
  anxietyLevel,
  setAnxietyLevel,
  energyLevel,
  setEnergyLevel,
  sleepHours,
  setSleepHours,
  goals,
  setGoals,
  therapeuticTools,
  handleNavigation
}: DashboardViewProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-xl text-white/70 mb-8">How are you feeling today? Let's check in with yourself.</p>
      </motion.div>

      <MoodTracker
        moodScore={moodScore}
        setMoodScore={setMoodScore}
        anxietyLevel={anxietyLevel}
        setAnxietyLevel={setAnxietyLevel}
        energyLevel={energyLevel}
        setEnergyLevel={setEnergyLevel}
        sleepHours={sleepHours}
        setSleepHours={setSleepHours}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {therapeuticTools.slice(0, 6).map((tool, index) => (
          <motion.button
            key={tool.id}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigation('tools')}
            className={`p-6 bg-gradient-to-br ${tool.color} rounded-2xl text-white text-left transition-all duration-300 shadow-lg hover:shadow-2xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <tool.icon className="w-8 h-8 mb-4" />
            <h4 className="font-semibold text-lg mb-2">{tool.title}</h4>
            <p className="text-white/90 text-sm">{tool.description}</p>
          </motion.button>
        ))}
      </motion.div>

      <GoalsManager goals={goals} setGoals={setGoals} />
    </div>
  );
}