"use client";
import { motion } from "framer-motion";
import { memo } from "react";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold text-purple-800"
      >
        Prioritize Your Mental Well-being ✨
      </motion.h1>
      <p className="mt-4 text-lg text-gray-700 max-w-xl">
        Journaling, AI insights, and your emotional dashboard—all in one safe space.
      </p>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
        onClick={() => window.location.href = "/login"}
      >
        Start Journaling Now
      </motion.button>
    </section>
  );
}

export default memo(HeroSection);
