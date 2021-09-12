import { Schema } from 'mongoose';

export const unitSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  lang: { type: String, required: true },
  detail: { type: String },
  battlefieldRole: { type: String, required: true },
  version: { type: String },
  powerRating: { type: Number, required: true },
  commandPoints: { type: Number, required: true },
  profiles: { type: Array, required: true },
  profilesDetail: { type: String },
  weapons: { type: [String || null, [String || Number]] },
  wargearOptions: { type: [String] },
  abilities: { type: [[String, String]] },
  factionKeywords: { type: [String] },
  keywords: { type: [String] },
});
