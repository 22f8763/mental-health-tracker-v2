 import { motion } from 'framer-motion';
import { Target, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Goal } from '../../types/mentalHealthTypes';

export default function GoalsManager() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, text: 'Drink 8 glasses of water', completed: false, priority: 'high', category: 'health' },
    { id: 2, text: 'Take a 10-minute walk', completed: true, priority: 'medium', category: 'fitness' },
    { id: 3, text: 'Write in my journal', completed: false, priority: 'low', category: 'personal' },
  ]);

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
    >
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
        <Target className="w-6 h-6 text-green-400" />
        Today's Wellness Goals
      </h3>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
              goal.completed ? 'bg-green-500/20 text-white' : 'bg-white/5 text-white/80'
            }`}
          >
            <button
              onClick={() => toggleGoal(goal.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                goal.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-white/40 hover:border-white/60'
              }`}
            >
              {goal.completed && <CheckCircle className="w-4 h-4" />}
            </button>
            <span className={goal.completed ? 'line-through' : ''}>{goal.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
