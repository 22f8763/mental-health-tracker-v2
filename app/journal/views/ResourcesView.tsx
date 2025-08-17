import { motion } from 'framer-motion';
import { Shield, Phone, MessageCircle, Globe, MapPin, BookOpen, Users, Brain, Heart, Zap, Moon, Flower2, Award } from 'lucide-react';
import { Resource } from '../types/mentalHealthTypes';

export default function ResourcesView() {
  const resources: Resource[] = [
    { 
      title: "Understanding Anxiety", 
      desc: "Learn about anxiety disorders and coping strategies", 
      icon: Brain, 
      bgClass: "bg-blue-500/20", 
      borderClass: "border-blue-300/30",
      iconColor: "text-blue-400"
    },
    { 
      title: "Depression Guide", 
      desc: "Comprehensive guide to recognizing and managing depression", 
      icon: Heart, 
      bgClass: "bg-red-500/20", 
      borderClass: "border-red-300/30",
      iconColor: "text-red-400"
    },
    { 
      title: "Stress Management", 
      desc: "Techniques for managing daily stress and pressure", 
      icon: Zap, 
      bgClass: "bg-yellow-500/20", 
      borderClass: "border-yellow-300/30",
      iconColor: "text-yellow-400"
    },
    { 
      title: "Sleep Hygiene", 
      desc: "Improve your sleep quality for better mental health", 
      icon: Moon, 
      bgClass: "bg-purple-500/20", 
      borderClass: "border-purple-300/30",
      iconColor: "text-purple-400"
    },
    { 
      title: "Mindfulness Practice", 
      desc: "Introduction to mindfulness and meditation", 
      icon: Flower2, 
      bgClass: "bg-green-500/20", 
      borderClass: "border-green-300/30",
      iconColor: "text-green-400"
    },
    { 
      title: "Building Resilience", 
      desc: "Develop mental strength and bounce back from challenges", 
      icon: Award,
      bgClass: "bg-orange-500/20", 
      borderClass: "border-orange-300/30",
      iconColor: "text-orange-400"
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Mental Health Resources</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-8 border border-red-300/30"
      >
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          <Shield className="w-6 h-6 text-red-400" />
          Crisis Support - Available 24/7
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-white">National Suicide Prevention Lifeline</span>
              </div>
              <p className="text-2xl font-bold text-white">988</p>
              <p className="text-white/60 text-sm">Free, confidential, 24/7 crisis support</p>
            </div>
            
            <div className="p-4 bg-white/10 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-white">Crisis Text Line</span>
              </div>
              <p className="text-xl font-bold text-white">Text HOME to 741741</p>
              <p className="text-white/60 text-sm">24/7 crisis counseling via text</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-white">Online Chat Support</span>
              </div>
              <p className="text-white/60">Connect with trained counselors via secure chat</p>
              <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all">
                Start Chat
              </button>
            </div>
            
            <div className="p-4 bg-white/10 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-white">Find Local Help</span>
              </div>
              <p className="text-white/60">Locate mental health services in your area</p>
              <button className="mt-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all">
                Search Near Me
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
      >
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-400" />
          Educational Resources
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`p-6 ${resource.bgClass} border ${resource.borderClass} rounded-2xl hover:bg-opacity-30 transition-all cursor-pointer`}
            >
              <resource.icon className={`w-8 h-8 ${resource.iconColor} mb-4`} />
              <h4 className="font-semibold text-white mb-2">{resource.title}</h4>
              <p className="text-white/60 text-sm mb-4">{resource.desc}</p>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Read More →
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-8 border border-indigo-300/30"
      >
        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          <Users className="w-6 h-6 text-indigo-400" />
          Community Support Groups
        </h3>
        
        <p className="text-white/70 mb-6">Connect with others who understand your journey. Our moderated support groups provide a safe space to share and receive support.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/10 rounded-2xl">
            <h4 className="font-semibold text-white mb-3">Anxiety Support Circle</h4>
            <p className="text-white/60 text-sm mb-4">Weekly meetings for those managing anxiety disorders</p>
            <div className="flex items-center gap-4">
              <span className="text-green-400 text-sm">● 127 active members</span>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition-all">
                Join Group
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-white/10 rounded-2xl">
            <h4 className="font-semibold text-white mb-3">Depression Recovery Network</h4>
            <p className="text-white/60 text-sm mb-4">Peer support for depression recovery and management</p>
            <div className="flex items-center gap-4">
              <span className="text-green-400 text-sm">● 89 active members</span>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm transition-all">
                Join Group
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}