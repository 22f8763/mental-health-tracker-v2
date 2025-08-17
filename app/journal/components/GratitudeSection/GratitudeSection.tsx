 import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';

type GratitudeItem = string;

interface GratitudeItemCardProps {
  index: number;
  text: string;
  onRemove: () => void;
}

const GratitudeItemCard: React.FC<GratitudeItemCardProps> = ({ index, text, onRemove }) => (
  <div
    className="bg-white/70 rounded-lg p-3 flex items-center gap-3 group transition-all duration-300 hover:shadow-md"
  >
    <span className="text-pink-600 font-semibold">{index + 1}.</span>
    <p className="flex-1 text-gray-800">{text}</p>
    <button
      onClick={onRemove}
      aria-label={`Remove gratitude item ${index + 1}`}
      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-500 transition-opacity"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
);

export default function GratitudeSection() {
  const [gratitudeList, setGratitudeList] = useState<GratitudeItem[]>([
    "My morning coffee",
    "Family group chat",
    "A good night's sleep",
    "The sunny weather"
  ]);

  const removeItem = (index: number) => {
    setGratitudeList(prevList => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-pink-100 p-2 rounded-lg">
          <Heart className="w-5 h-5 text-pink-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Daily Gratitude</h3>
          <p className="text-gray-600 text-sm">What are you grateful for today?</p>
        </div>
        <span className="ml-auto text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
          {gratitudeList.length}/10
        </span>
      </div>

      {/* Gratitude List */}
      {gratitudeList.length > 0 ? (
        <div className="space-y-3">
          {gratitudeList.map((item, index) => (
            <GratitudeItemCard
              key={index}
              index={index}
              text={item}
              onRemove={() => removeItem(index)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 animate-fadeIn">
          <div className="text-4xl mb-3">💝</div>
          <p className="text-gray-500">You're all caught up. Add more gratitude tomorrow!</p>
        </div>
      )}
    </div>
  );
}
