 'use client';

import { motion } from 'framer-motion';
import {
  Settings,
  LayoutDashboard,
  BookOpen,
  Wrench,
  BarChart,
  Folder,
} from 'lucide-react';

interface DesktopNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Journal', icon: BookOpen },
  { label: 'Tools', icon: Wrench },
  { label: 'Analytics', icon: BarChart },
  { label: 'Resources', icon: Folder },
];

export default function Sidebar({ currentView, onNavigate }: DesktopNavProps) {
  return (
    <motion.nav
      animate={{ width: 140,  opacity: 1 }}
      className="fixed top-0 left-0 h-screen bg-transparent transition-all duration-300 flex flex-col justify-between z-50"
    >
      {/* Centered buttons */}
      <div className="flex-1 flex flex-col justify-center items-center gap-3">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onNavigate(label.toLowerCase())}
            className={`flex items-center w-40 px-3 py-2 rounded-lg transition-all 
              ${
                currentView === label.toLowerCase()
                  ? 'text-white font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
          >
            <Icon className="w-5 h-5" />
            {/* <span className="ml-3 text-sm">{label}</span> */}
          </button>
        ))}
      </div>

      {/* Settings Button */}
      <div className="p-4 flex justify-center">
        <button className="text-white/70 hover:text-white">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </motion.nav>
  );
}
