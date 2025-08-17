import { 
  Activity, BookOpen, Brain, BarChart3, Heart 
} from 'lucide-react';

interface MobileNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function MobileNav({ currentView, onNavigate }: MobileNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/10 backdrop-blur-2xl border-t border-white/20">
      <div className="flex items-center justify-around py-2">
        {[
          { view: 'dashboard', icon: Activity, label: 'Home' },
          { view: 'journal', icon: BookOpen, label: 'Journal' },
          { view: 'tools', icon: Brain, label: 'Tools' },
          { view: 'analytics', icon: BarChart3, label: 'Progress' },
          { view: 'resources', icon: Heart, label: 'Help' }
        ].map(({ view, icon: Icon, label }) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all ${
              currentView === view
                ? 'text-emerald-400 bg-white/10'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}