import BreathingExercise from '../components/TherapeuticTools/BreathingExercise';
import MeditationTimer from '../components/TherapeuticTools/MeditationTimer';
import CBTExercise from '../components/TherapeuticTools/CBTExercise';

export default function ToolsView() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Therapeutic Tools</h2>
      <BreathingExercise />
      <MeditationTimer />
      <CBTExercise />
    </div>
  );
}
