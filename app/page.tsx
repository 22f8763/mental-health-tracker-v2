"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import {
  FaHeartbeat,
  FaBrain,
  FaChartLine,
  FaRobot,
  FaArrowRight
} from "react-icons/fa";

// Types
interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
} as const;

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, color }: FeatureCardProps) => (
  <motion.div 
    variants={item}
    className={`p-6 rounded-2xl bg-gradient-to-br ${color} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
  >
    <div className="text-4xl mb-4">
      <Icon className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/90 mb-4">{description}</p>
    <button className="flex items-center text-white/90 hover:text-white transition-colors text-sm font-medium">
      Learn more <FaArrowRight className="ml-2" />
    </button>
  </motion.div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    };
    getSession();
  }, [supabase.auth]);

  const features = [
    {
      icon: FaHeartbeat,
      title: "Mood Tracking",
      description: "Track your daily moods and emotions to identify patterns and triggers.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: FaBrain,
      title: "Mental Exercises",
      description: "Practice CBT techniques to improve your mental well-being.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaChartLine,
      title: "Progress Insights",
      description: "View detailed analytics of your mental health journey.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: FaRobot,
      title: "AI Companion",
      description: "Chat with our supportive AI for guidance and support.",
      color: "from-rose-500 to-pink-600"
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-2xl font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Mental Health Matters
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Track your mood, practice self-care, and improve your mental well-being with our comprehensive tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push(session ? '/dashboard' : '/login')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {session ? 'Go to Dashboard' : 'Get Started'}
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-lg font-medium border border-gray-200 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to take control of your mental health?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of people who have improved their mental well-being with our platform.
          </p>
          <button 
            onClick={() => router.push(session ? '/dashboard' : '/signup')}
            className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            {session ? 'Go to Dashboard' : 'Sign Up Free'}
          </button>
        </div>
      </section>
    </div>
  );
}
