 import { motion } from 'framer-motion';
import { BarChart3, Award } from 'lucide-react';
import { MoodData, Metric } from '../types/mentalHealthTypes';

interface AnalyticsViewProps {
  weeklyMoodData: MoodData[];
  allMoodData?: MoodData[]; // Optional: for calculating streaks and achievements
}

export default function AnalyticsView({ weeklyMoodData, allMoodData }: AnalyticsViewProps) {
  // Calculate averages from real data
  const calculateAverage = (metric: Metric): number => {
    if (weeklyMoodData.length === 0) return 0;
    const sum = weeklyMoodData.reduce((acc, day) => acc + day[metric], 0);
    return Number((sum / weeklyMoodData.length).toFixed(1));
  };

  // Calculate streak (consecutive days with data)
  const calculateStreak = (): number => {
    if (!allMoodData || allMoodData.length === 0) return weeklyMoodData.length;
    
    let streak = 0;
    const today = new Date();
    
   const sortedData = [...allMoodData].sort((a, b) => 
  new Date((b as any).date || today).getTime() - new Date((a as any).date || today).getTime()
);

    
    // Count consecutive days from today backwards
    for (let i = 0; i < sortedData.length; i++) {
      const dataDate = new Date((sortedData[i] as any).date || today);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      // Check if this day has data (allowing for some date flexibility)
      if (Math.abs(dataDate.getTime() - expectedDate.getTime()) <= 24 * 60 * 60 * 1000) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Calculate meditation sessions (based on mood improvement or high scores)
  const calculateMeditationSessions = (): number => {
    if (!allMoodData) return Math.floor(weeklyMoodData.length * 1.5); // Estimate
    
    // Count days with good mood/energy scores as "mindful days"
    return allMoodData.filter(day => 
      day.mood >= 7 || day.energy >= 7 || (day.anxiety <= 3 && day.mood >= 6)
    ).length;
  };

  // Calculate CBT exercises (based on consistent tracking and improvement)
  const calculateCBTExercises = (): number => {
    if (!allMoodData) return Math.floor(weeklyMoodData.length * 0.8); // Estimate
    
    // Count days with balanced scores as CBT practice days
    return allMoodData.filter(day => 
      day.mood >= 6 && day.anxiety <= 4 && day.energy >= 5
    ).length;
  };

  const averages = {
    mood: calculateAverage('mood'),
    anxiety: calculateAverage('anxiety'),
    energy: calculateAverage('energy'),
    sleep: calculateAverage('sleep')
  };

  const streak = calculateStreak();
  const meditationSessions = calculateMeditationSessions();
  const cbtExercises = calculateCBTExercises();

  // Determine achievement emoji and description based on performance
  const getAchievementData = () => {
    const achievements = [];
    
    // Streak achievement
    if (streak >= 30) {
      achievements.push({
        emoji: '🏆',
        title: `${streak}-Day Champion`,
        description: 'Outstanding consistency!'
      });
    } else if (streak >= 14) {
      achievements.push({
        emoji: '🥇',
        title: `${streak}-Day Streak`,
        description: 'Great consistency!'
      });
    } else if (streak >= 7) {
      achievements.push({
        emoji: '🎯',
        title: `${streak}-Day Streak`,
        description: 'Building great habits!'
      });
    } else {
      achievements.push({
        emoji: '🌱',
        title: `${streak}-Day Start`,
        description: 'Every journey begins with a step!'
      });
    }

    // Meditation achievement
    if (meditationSessions >= 100) {
      achievements.push({
        emoji: '🧘‍♀️',
        title: 'Zen Master',
        description: `${meditationSessions} mindful moments`
      });
    } else if (meditationSessions >= 50) {
      achievements.push({
        emoji: '🧘‍♀️',
        title: 'Mindful Warrior',
        description: `${meditationSessions} mindful moments`
      });
    } else {
      achievements.push({
        emoji: '🧘‍♀️',
        title: 'Mindful Explorer',
        description: `${meditationSessions} mindful moments`
      });
    }

    // CBT achievement
    if (cbtExercises >= 25) {
      achievements.push({
        emoji: '🧠',
        title: 'Mental Health Pro',
        description: `${cbtExercises} growth sessions`
      });
    } else if (cbtExercises >= 10) {
      achievements.push({
        emoji: '📚',
        title: 'Growth Seeker',
        description: `${cbtExercises} growth sessions`
      });
    } else {
      achievements.push({
        emoji: '🌟',
        title: 'Self-Care Starter',
        description: `${cbtExercises} growth sessions`
      });
    }

    return achievements;
  };

  const achievements = getAchievementData();

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Your Progress</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
      >
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          Weekly Mood Trends
        </h3>
        
        {weeklyMoodData.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-white/60 text-lg mb-4">No data available yet</div>
            <div className="text-white/40 text-sm">Start tracking your mood to see your progress!</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-7 gap-4 mb-8">
              {weeklyMoodData.map((day) => (
                <div key={day.day} className="text-center">
                  <div className="text-white/60 text-sm mb-2">{day.day}</div>
                  <div className="space-y-2">
                    {(['mood', 'anxiety', 'energy', 'sleep'] as Metric[]).map((metric) => (
                      <div key={metric} className="relative">
                        <div className="w-full h-6 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              metric === 'mood'
                                ? 'bg-gradient-to-r from-green-400 to-blue-400'
                                : metric === 'anxiety'
                                ? 'bg-gradient-to-r from-red-400 to-orange-400'
                                : metric === 'energy'
                                ? 'bg-gradient-to-r from-yellow-400 to-green-400'
                                : 'bg-gradient-to-r from-purple-400 to-pink-400'
                            }`}
                            style={{ width: `${(day[metric] / 10) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-white/60 mt-1">{day[metric]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{averages.mood}</div>
                <div className="text-white/60">Avg Mood</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">{averages.anxiety}</div>
                <div className="text-white/60">Avg Anxiety</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{averages.energy}</div>
                <div className="text-white/60">Avg Energy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{averages.sleep}</div>
                <div className="text-white/60">Avg Sleep</div>
              </div>
            </div>
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-xl rounded-3xl p-8 border border-amber-300/30"
      >
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          <Award className="w-6 h-6 text-amber-400" />
          Your Achievements
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center p-6 bg-white/10 rounded-2xl">
              <div className="text-4xl mb-3">{achievement.emoji}</div>
              <div className="font-semibold text-white mb-1">{achievement.title}</div>
              <div className="text-white/60 text-sm">{achievement.description}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}