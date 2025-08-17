 import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface MoodTrackerProps {
  moodScore: number;
  setMoodScore: (score: number) => void;
  anxietyLevel: number;
  setAnxietyLevel: (level: number) => void;
  energyLevel: number;
  setEnergyLevel: (level: number) => void;
  sleepHours: number;
  setSleepHours: (hours: number) => void;
}

interface SliderInputProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, min, max, value, onChange, unit }) => (
  <div>
    <label className="block text-white/80 mb-2">{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      aria-label={label}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-2 bg-white/20 rounded-lg appearance-none slider"
    />
    <p className="text-white/60 text-sm mt-1">
      {value}
      {unit ? ` ${unit}` : `/${max}`}
    </p>
  </div>
);

export default function MoodTracker({
  moodScore,
  setMoodScore,
  anxietyLevel,
  setAnxietyLevel,
  energyLevel,
  setEnergyLevel,
  sleepHours,
  setSleepHours
}: MoodTrackerProps) {
  const moodData = {
    emojis: ['😢', '😔', '😐', '🙂', '😊', '😄', '😆', '😁', '🤩', '🥳'],
    labels: ['Terrible', 'Very Low', 'Low', 'Below Average', 'Neutral', 'Good', 'Very Good', 'Great', 'Excellent', 'Amazing']
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
    >
      {/* Header */}
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
        <Heart className="w-6 h-6 text-red-400" />
        Daily Mood Check-in
      </h3>

      {/* Mood Score */}
      <div className="mb-6">
        <label className="block text-white/80 text-lg mb-4">How's your overall mood? (1-10)</label>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="range"
            min="1"
            max="10"
            value={moodScore}
            aria-label="Overall mood score"
            onChange={(e) => setMoodScore(parseInt(e.target.value))}
            className="flex-1 h-2 bg-white/20 rounded-lg appearance-none slider"
          />
          <motion.div
            key={moodScore} // Animate emoji on change
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-6xl"
          >
            {moodData.emojis[moodScore - 1]}
          </motion.div>
        </div>
        <p className="text-white/60 text-center">{moodData.labels[moodScore - 1]}</p>
      </div>

      {/* Additional Sliders */}
      <div className="grid md:grid-cols-3 gap-6">
        <SliderInput
          label="Anxiety Level"
          min={1}
          max={10}
          value={anxietyLevel}
          onChange={setAnxietyLevel}
        />
        <SliderInput
          label="Energy Level"
          min={1}
          max={10}
          value={energyLevel}
          onChange={setEnergyLevel}
        />
        <SliderInput
          label="Sleep Hours"
          min={0}
          max={12}
          value={sleepHours}
          onChange={setSleepHours}
          unit="hours"
        />
      </div>
    </motion.div>
  );
}
