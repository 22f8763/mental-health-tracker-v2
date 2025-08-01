"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { FaMagic } from "react-icons/fa";

function FinalCTA() {
  return (
    <section className="bg-gradient-to-b from-purple-200 to-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-purple-800"
        >
          Ready to take control of your mental health?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-gray-700 max-w-xl mx-auto"
        >
          Start journaling with AI-powered mood tracking and insights today.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white text-lg rounded-2xl shadow-lg hover:bg-purple-700 transition-all duration-300"
          onClick={() => window.location.href = "/login"}
        >
          <FaMagic />
          ✨ Start Journaling Now
        </motion.button>
      </div>
    </section>
  );
}

export default memo(FinalCTA);
