// models/CBTExercise.ts
import mongoose, { Schema, models, model } from 'mongoose';

const CBTExerciseSchema = new Schema({
  negativeThought: String,
  supportingEvidence: String,
  contradictingEvidence: String,
  balancedThought: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite in dev
export const CBTExercise = models.CBTExercise || model('CBTExercise', CBTExerciseSchema);
