import { Document } from 'mongoose';

export interface Unit extends Document {
  name: string;
  description?: string;
  detail: string;
  lang: String;
  power: number;
  battleField?: string;
  wargearOptions: Array<string>;
  abilities: Array<string>;
  factionKeywords: Array<string>;
  keywords: Array<string>;
}

export interface UnitInput {
  name: string;
  description?: string;
  detail: string;
  lang: String;
  power: number;
  battleField?: string;
  wargearOptions: Array<string>;
  abilities: Array<string>;
  factionKeywords: Array<string>;
  keywords: Array<string>;
}
