import { Schema } from 'mongoose';

export const unitSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  power: { type: Number, required: true },
  battleField: { type: String },
  wargearOptions: { type: [String] },
  abilities: { type: [String] },
  factionKeywords: { type: [String] },
  keywords: { type: [String] },
});
