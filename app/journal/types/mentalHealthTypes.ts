import { ComponentType } from 'react';

export interface MoodData {
  day: string;
  mood: number;
  anxiety: number;
  energy: number;
  sleep: number;
}

export interface Goal {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
  category: string;
}

export interface TherapeuticTool {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  category: string;
}

export interface Resource {
  title: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
  bgClass: string;
  borderClass: string;
  iconColor: string;
}

export type Metric = 'mood' | 'anxiety' | 'energy' | 'sleep';