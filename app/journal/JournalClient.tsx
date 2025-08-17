 import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import DesktopNav from './components/Navigation/DesktopNav';
import MobileNav from './components/Navigation/MobileNav';
import ViewContainer from './components/ViewContainer/ViewContainer';
import DashboardView from './views/DashboardView';
import JournalView from './views/JournalView';
import ToolsView from './views/ToolsView';
import AnalyticsView from './views/AnalyticsView';
import ResourcesView from './views/ResourcesView';
import { MoodData, TherapeuticTool } from './types/mentalHealthTypes';
import { Wind } from 'lucide-react';

export default function MentalHealthTracker() {
  // Core States
  const [currentView, setCurrentView] = useState('dashboard');
  const [moodScore, setMoodScore] = useState(5);
  const [journalEntry, setJournalEntry] = useState('');
  const [anxietyLevel, setAnxietyLevel] = useState(3);
  const [sleepHours, setSleepHours] = useState(7);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [gratitudeList, setGratitudeList] = useState(['', '', '']);
  const [goals, setGoals] = useState<any[]>([]);
  const [viewTransition, setViewTransition] = useState(false);

  // Sample data
  const therapeuticTools: TherapeuticTool[] = [
    {
      id: 'breathing',
      title: 'Guided Breathing',
      description: '4-7-8 breathing technique for anxiety relief',
      icon: Wind,
      color: 'from-blue-500 to-cyan-500',
      category: 'relaxation'
    },
    // ... other tools
  ];

  const weeklyMoodData: MoodData[] = [
    { day: 'Mon', mood: 6, anxiety: 4, energy: 5, sleep: 7 },
    // ... other days
  ];

  // Handle navigation with transitions
  const handleNavigation = (view: string) => {
    setViewTransition(true);
    setTimeout(() => {
      setCurrentView(view);
      setViewTransition(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 z-0"></div>

      <DesktopNav currentView={currentView} onNavigate={handleNavigation} />
      
      <main className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {!viewTransition && (
              <>
                {currentView === 'dashboard' && (
                  <ViewContainer key="dashboard">
                    <DashboardView
                      moodScore={moodScore}
                      setMoodScore={setMoodScore}
                      anxietyLevel={anxietyLevel}
                      setAnxietyLevel={setAnxietyLevel}
                      energyLevel={energyLevel}
                      setEnergyLevel={setEnergyLevel}
                      sleepHours={sleepHours}
                      setSleepHours={setSleepHours}
                      goals={goals}
                      setGoals={setGoals}
                      therapeuticTools={therapeuticTools}
                      handleNavigation={handleNavigation}
                    />
                  </ViewContainer>
                )}
                {currentView === 'journal' && (
                  <ViewContainer key="journal">
                    <JournalView
                      journalEntry={journalEntry}
                      setJournalEntry={setJournalEntry}
                      gratitudeList={gratitudeList}
                      setGratitudeList={setGratitudeList}
                    />
                  </ViewContainer>
                )}
                {currentView === 'tools' && (
                  <ViewContainer key="tools">
                    <ToolsView />
                  </ViewContainer>
                )}
                {currentView === 'analytics' && (
                  <ViewContainer key="analytics">
                    <AnalyticsView weeklyMoodData={weeklyMoodData} />
                  </ViewContainer>
                )}
                {currentView === 'resources' && (
                  <ViewContainer key="resources">
                    <ResourcesView />
                  </ViewContainer>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </main>

      <MobileNav currentView={currentView} onNavigate={handleNavigation} />

      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #06b6d4);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #06b6d4);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        input {
          background: transparent;
          border: none;
          width: 100%;
          color: white;
          outline: none;
        }
      `}</style>
    </div>
  );
}