 'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type Testimonial = {
  quote: string;
  user: string;
  emoji: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "I feel understood for the first time. The AI reflections are spot on!",
    user: "Fatima, 22",
    emoji: "💖",
  },
  {
    quote: "This helps me stay accountable to my emotions.",
    user: "Ali, 27",
    emoji: "🧘‍♂️",
  },
  {
    quote: "The mood trends show me what triggers my stress — life-changing!",
    user: "Zara, 30",
    emoji: "📊",
  },
  {
    quote: "I never thought journaling could feel this rewarding!",
    user: "Sana, 25",
    emoji: "📝",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  // Autoplay carousel every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-purple-50 to-indigo-100 py-24 px-6 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-16 left-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 bottom-8 right-1/4 animate-ping"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto text-center space-y-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800 leading-snug tracking-tight">
          💬 What Our Users Are Saying
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-white/40 backdrop-blur-md p-10 rounded-3xl shadow-xl text-left relative max-w-3xl mx-auto"
          >
            {/* Floating Emoji */}
            <motion.div
              className="absolute -top-8 -left-8 text-6xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {testimonials[index].emoji}
            </motion.div>

            <p className="text-gray-800 italic text-xl leading-relaxed mb-6">
              “{testimonials[index].quote}”
            </p>
            <div className="text-purple-700 font-semibold text-right text-lg">
              — {testimonials[index].user}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Call to action below carousel */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-md text-gray-600"
        >
          🌟 Join 10,000+ others already journaling and building emotional clarity!
        </motion.p>
      </motion.div>
    </section>
  );
}
