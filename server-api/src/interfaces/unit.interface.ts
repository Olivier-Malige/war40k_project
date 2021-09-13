import { Document } from 'mongoose';

export interface Unit extends Document {
  name: string;
  description?: string;
  lang: String;
  detail?: string;
  battlefieldRole: string;
  version: string;
  powerRating: number;
  commandPoints?: number;
  profiles: Array<string | number>,
  weapons: Array<string | null | Array<string | number> >
  wargearOptions: Array<string>;
  abilities: Array<string>;
  factionKeywords: Array<string>;
  keywords: Array<string>;
}

