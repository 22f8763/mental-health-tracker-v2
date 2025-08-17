"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { 
  FaChartLine, 
  FaCalendarAlt, 
  FaBook, 
  FaCog, 
  FaSignOutAlt,
  FaHeartbeat,
  FaBrain,
  FaRobot
} from "react-icons/fa";

// Types for our data
interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  note?: string;
}

// Mock data for the dashboard
const mockMoodData: MoodEntry[] = [
  { id: '1', date: '2025-08-17', mood: 'happy', note: 'Had a great day!' },
  { id: '2', date: '2025-08-16', mood: 'neutral', note: 'It was an okay day' },
  { id: '3', date: '2025-08-15', mood: 'sad', note: 'Feeling a bit down' },
];

const moodColors: Record<string, string> = {
  happy: 'bg-green-100 text-green-800',
  neutral: 'bg-yellow-100 text-yellow-800',
  sad: 'bg-blue-100 text-blue-800',
  angry: 'bg-red-100 text-red-800',
  anxious: 'bg-purple-100 text-purple-800',
};

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      
      // In a real app, you would fetch this from your database
      setMoodData(mockMoodData);
      setIsLoading(false);
    };

    getUser();
  }, [router, supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-2xl font-medium text-gray-700">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">MindWell</h1>
          <p className="text-gray-500 text-sm mt-1">Mental Health Dashboard</p>
        </div>
        
        <nav className="mt-8">
          <NavItem icon={<FaChartLine />} active>Overview</NavItem>
          <NavItem icon={<FaHeartbeat />}>Mood Tracker</NavItem>
          <NavItem icon={<FaBrain />}>Exercises</NavItem>
          <NavItem icon={<FaCalendarAlt />}>Calendar</NavItem>
          <NavItem icon={<FaBook />}>Journal</NavItem>
          <NavItem icon={<FaCog />}>Settings</NavItem>
          <button 
            onClick={handleSignOut}
            className="flex items-center w-full px-6 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            Sign Out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.email?.split('@')[0] || 'User'}!</h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              + New Entry
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Current Streak" 
            value="5 days" 
            change="+2 days" 
            icon={<FaChartLine className="text-indigo-600" />}
          />
          <StatCard 
            title="Average Mood" 
            value="Good" 
            change="+12% from last week" 
            icon={<FaHeartbeat className="text-green-600" />}
          />
          <StatCard 
            title="Exercises Completed" 
            value="8/10" 
            change="+3 this week" 
            icon={<FaBrain className="text-blue-600" />}
          />
          <StatCard 
            title="AI Sessions" 
            value="3" 
            change="+1 today" 
            icon={<FaRobot className="text-purple-600" />}
          />
        </div>

        {/* Recent Mood Entries */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Mood Entries</h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {moodData.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  {entry.note && <p className="text-gray-600 mt-1">{entry.note}</p>}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${moodColors[entry.mood] || 'bg-gray-100 text-gray-800'}`}>
                  {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
                <span>Record Today's Mood</span>
                <FaHeartbeat />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <span>Start a Journal Entry</span>
                <FaBook />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                <span>Chat with AI Companion</span>
                <FaRobot />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                  <FaCalendarAlt className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium">Therapy Session</p>
                  <p className="text-sm text-gray-500">Tomorrow at 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <FaBrain className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Daily Breathing Exercise</p>
                  <p className="text-sm text-gray-500">In 1 hour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
interface NavItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ icon, children, active = false }: NavItemProps) => (
  <button 
    className={`flex items-center w-full px-6 py-3 text-left ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
  >
    <span className="mr-3">{icon}</span>
    {children}
  </button>
);

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-green-600 mt-1">{change}</p>
      </div>
      <div className="p-3 bg-indigo-50 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);
