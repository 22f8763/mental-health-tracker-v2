"use client";

import { motion } from "framer-motion";
import { FaRobot, FaLock, FaChartLine, FaSmile, FaUserSecret } from "react-icons/fa";

const features = [
  {
    title: "AI-Powered Insights",
    desc: "Let intelligent algorithms decode your thoughts for deeper self-awareness.",
    icon: <FaRobot className="text-purple-600" size={40} />,
  },
  {
    title: "Military-Grade Security",
    desc: "Encrypted journaling with zero compromise on privacy.",
    icon: <FaLock className="text-indigo-600" size={40} />,
  },
  {
    title: "Visual Mood Trends",
    desc: "See your mental wellness in motion with vibrant charts and insights.",
    icon: <FaChartLine className="text-pink-600" size={40} />,
  },
  {
    title: "Emotion-Friendly Design",
    desc: "A soothing interface designed to reflect your emotional state.",
    icon: <FaSmile className="text-yellow-500" size={40} />,
  },
  {
    title: "Anonymous Journaling",
    desc: "Use all features without ever sharing your real identity.",
    icon: <FaUserSecret className="text-teal-600" size={40} />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-24 px-6 relative overflow-hidden">
      {/* Background sparkles */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-purple-50 to-indigo-50 opacity-40 z-0 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto text-center space-y-16"
      >
        <h2 className="text-4xl font-extrabold tracking-tight text-purple-800">
          🚀 Why You'll Love It
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-purple-100 hover:shadow-2xl text-left transform duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-500 text-md mt-10">
          ✨ Built to uplift, empower, and inspire a better you.
        </p>
      </motion.div>
    </section>
  );
}
