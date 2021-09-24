import { Schema } from 'mongoose';

export const unitSchema = new Schema({
  id: { type: String, required: true },
  creationDate: { type: Date, required: true },
  lastUpdateDate: { type: Date },
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
  weapons: { type: Array },
  wargearOptions: { type: [] },
  abilities: { type: [] },
  factionKeywords: { type: [] },
  keywords: { type: [] },
});
