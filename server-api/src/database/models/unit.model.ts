import { Schema } from 'mongoose';

export const unitSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  lang: { type: String, required: true },
  detail: { type: String },
  battlefieldRole: { type: String },
  version: { type: String, required: true },
  powerRating: { type: Number, required: true },
  commandPoints: { type: Number },
  profiles: { type: Array },
  profilesDetail: { type: String },
  weapons: { type: [String || null, [String || Number]] },
  wargearOptions: { type: [String] },
  abilities: { type: [[String, String]] },
  factionKeywords: { type: [String] },
  keywords: { type: [String] },
});
