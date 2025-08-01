import  { Schema, model, models } from 'mongoose';

const JournalSchema = new Schema({
  prompt: { type: String, required: true },
  aiReply: { type: String, required: true },
  userEmail: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const JournalModel = models.Journal || model('Journal', JournalSchema);

export default JournalModel;
