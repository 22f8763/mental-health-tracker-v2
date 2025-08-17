// components/MoodTracker.tsx
"use client";

import React, { useCallback } from 'react';
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

const MOOD_EMOJIS = ['😢', '😔', '😐', '🙂', '😊', '😄', '😆', '😁', '🤩', '🥳'];
const MOOD_LABELS = [
  'Terrible', 'Very Low', 'Low', 'Below Average',
  'Neutral', 'Good', 'Very Good', 'Great', 'Excellent', 'Amazing'
];

const MoodTracker: React.FC<MoodTrackerProps> = ({
  moodScore,
  setMoodScore,
  anxietyLevel,
  setAnxietyLevel,
  energyLevel,
  setEnergyLevel,
  sleepHours,
  setSleepHours,
}) => {
  const currentMoodIndex = Math.max(0, Math.min(moodScore - 1, MOOD_EMOJIS.length - 1));
  const currentMoodEmoji = MOOD_EMOJIS[currentMoodIndex];
  const currentMoodLabel = MOOD_LABELS[currentMoodIndex];

  const handleMoodChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 10) setMoodScore(value);
  }, [setMoodScore]);

  const handleAnxietyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 10) setAnxietyLevel(value);
  }, [setAnxietyLevel]);

  const handleEnergyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 10) setEnergyLevel(value);
  }, [setEnergyLevel]);

  const handleSleepChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 12) setSleepHours(value);
  }, [setSleepHours]);

  const Slider = ({
    id,
    value,
    min,
    max,
    onChange,
    label,
    displayValue,
  }: {
    id: string;
    value: number;
    min: number;
    max: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    displayValue: string | number;
  }) => (
    <div>
      <label htmlFor={id} className="block text-white/80 mb-2 font-medium">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
        aria-label={label}
      />
      <p className="text-white/60 text-sm mt-1 text-center">{displayValue}</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
    >
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
        <Heart className="w-6 h-6 text-red-400 flex-shrink-0" />
        Daily Mood Check-in
      </h3>

      <div className="space-y-6">
        <div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <div className="w-full">
              <label htmlFor="mood-slider" className="block text-white/80 text-lg mb-2">
                How's your overall mood? (1–10)
              </label>
              <input
                id="mood-slider"
                type="range"
                min="1"
                max="10"
                value={moodScore}
                onChange={handleMoodChange}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
                aria-label={`Mood score: ${currentMoodLabel}`}
              />
            </div>
            <div
              className="text-6xl min-w-[60px] text-center"
              role="img"
              aria-label={`Current mood: ${currentMoodLabel}`}
              title={currentMoodLabel}
            >
              {currentMoodEmoji}
            </div>
          </div>
          <p className="text-white/60 text-center font-medium text-lg">{currentMoodLabel}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Slider
            id="anxiety-slider"
            value={anxietyLevel}
            min={1}
            max={10}
            onChange={handleAnxietyChange}
            label="Anxiety Level"
            displayValue={`${anxietyLevel}/10`}
          />
          <Slider
            id="energy-slider"
            value={energyLevel}
            min={1}
            max={10}
            onChange={handleEnergyChange}
            label="Energy Level"
            displayValue={`${energyLevel}/10`}
          />
          <Slider
            id="sleep-slider"
            value={sleepHours}
            min={0}
            max={12}
            onChange={handleSleepChange}
            label="Sleep Hours"
            displayValue={`${sleepHours} ${sleepHours === 1 ? 'hour' : 'hours'}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MoodTracker;
