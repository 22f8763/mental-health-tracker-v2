 // app/journal/components/TherapeuticTools/CBTExercise.tsx
import { motion } from 'framer-motion';
import { BookOpen, Save, Loader2, CheckCircle, RotateCcw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type CBTFormData = {
  negativeThought: string;
  emotions: string;
  physicalSensations: string;
  supportingEvidence: string;
  contradictingEvidence: string;
  adviceToFriend: string;
  balancedThought: string;
};

export default function CBTExercise() {
  const [formData, setFormData] = useState<CBTFormData>({
    negativeThought: '',
    emotions: '',
    physicalSensations: '',
    supportingEvidence: '',
    contradictingEvidence: '',
    adviceToFriend: '',
    balancedThought: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        const labelMap: Record<string, string> = {
          negativeThought: 'Please describe your negative thought',
          emotions: 'Please describe your emotions',
          physicalSensations: 'Please describe your physical sensations',
          supportingEvidence: 'Please provide supporting evidence',
          contradictingEvidence: 'Please provide contradicting evidence',
          adviceToFriend: 'Please provide advice you’d give a friend',
          balancedThought: 'Please provide a balanced thought'
        };
        newErrors[key] = labelMap[key];
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/cbt-exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, createdAt: new Date().toISOString() })
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || 'Failed to save exercise');

      setIsSaved(true);
      setShowSuccess(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        handleReset();
      }, 3000);
    } catch (error) {
      console.error('Error saving CBT exercise:', error);
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to save. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      negativeThought: '',
      emotions: '',
      physicalSensations: '',
      supportingEvidence: '',
      contradictingEvidence: '',
      adviceToFriend: '',
      balancedThought: ''
    });
    setErrors({});
    setIsSaved(false);
    setShowSuccess(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const fields = [
    {
      name: 'negativeThought',
      label: 'What negative thought are you having?',
      placeholder: "I'm worried that I'll fail at this important task...",
      rows: 3
    },
    {
      name: 'emotions',
      label: 'What emotions are you feeling right now?',
      placeholder: 'Anxious, sad, overwhelmed...',
      rows: 2
    },
    {
      name: 'physicalSensations',
      label: 'What physical sensations are you experiencing?',
      placeholder: 'Tense shoulders, racing heart, sweaty palms...',
      rows: 2
    },
    {
      name: 'supportingEvidence',
      label: 'What evidence supports this thought?',
      placeholder: "I've made mistakes on similar tasks before...",
      rows: 2
    },
    {
      name: 'contradictingEvidence',
      label: 'What evidence contradicts this thought?',
      placeholder: "I've successfully completed similar tasks many times...",
      rows: 2
    },
    {
      name: 'adviceToFriend',
      label: 'What would you say to a friend in this situation?',
      placeholder: 'I believe in you, and you’ve overcome challenges before...',
      rows: 2
    },
    {
      name: 'balancedThought',
      label: "What's a more balanced, realistic thought?",
      placeholder: 'While I might make mistakes, I have the skills to handle this...',
      rows: 2
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl p-6 border border-green-300/30 relative"
    >
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-green-900/80 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 z-10"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Exercise Saved!</h3>
          <p className="text-white/80 text-center mb-6">
            Your thought challenge has been saved successfully
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="bg-white text-green-700 font-semibold py-2 px-6 rounded-full flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Create Another
          </motion.button>
        </motion.div>
      )}

      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-green-400" />
        Thought Challenge Exercise
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.submit && (
          <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-3 text-red-300">
            {errors.submit}
          </div>
        )}

        {fields.map(({ name, label, placeholder, rows }) => (
          <div key={name}>
            <label className="block text-white/80 mb-2">{label}</label>
            <textarea
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              className={`w-full p-4 bg-white/10 border ${
                errors[name] ? 'border-red-400/50' : 'border-white/20'
              } rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50`}
              rows={rows}
              placeholder={placeholder}
            />
            {errors[name] && (
              <p className="text-red-400 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex-1 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> Reset
          </button>

          <button
            type="submit"
            disabled={isSubmitting || isSaved}
            className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all ${
              isSubmitting
                ? 'bg-teal-600 text-white'
                : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" /> Save
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
