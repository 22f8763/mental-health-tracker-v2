 // components/WhyMentalHealth.tsx

'use client'

import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaBrain, FaSmile } from "react-icons/fa";

export default function WhyMentalHealth() {
  return (
    <section className="relative bg-gradient-to-b from-purple-100 to-white py-20 px-6 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800 tracking-tight">
            🧠 Why Mental Health Matters
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Mental health isn’t just the absence of illness—it's the foundation of a thriving, balanced, and fulfilling life.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-2xl"
          >
            <img
              src="/mental-awareness.avif"
              alt="Illustration promoting mental awareness"
              className="w-full h-80 md:h-[22rem] object-cover"
            />
          </motion.div>

          {/* Description and Features */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-800 leading-relaxed">
              Building mental resilience allows you to navigate challenges with strength. Embracing your emotional world can unlock clarity, calmness, and confidence.
            </p>

            <ul className="space-y-4 text-gray-700 text-base">
              <li className="flex items-center gap-3">
                <FaHeartbeat className="text-red-500 text-xl" />
                Enhances physical health and vitality
              </li>
              <li className="flex items-center gap-3">
                <FaBrain className="text-blue-500 text-xl" />
                Increases focus, mental clarity & balance
              </li>
              <li className="flex items-center gap-3">
                <FaSmile className="text-yellow-500 text-xl" />
                Builds stronger, more empathetic relationships
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white border-l-4 border-purple-500 p-6 shadow-xl rounded-xl text-gray-800 max-w-3xl mx-auto"
        >
          <p className="italic text-md">
            "The greatest weapon against stress is our ability to choose one thought over another."
            <span className="block text-right text-sm mt-2 font-semibold text-purple-600">
              — William James
            </span>
          </p>
        </motion.div>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-200 rounded-full opacity-30 blur-2xl animate-pulse delay-200 -z-10" />
    </section>
  );
}
