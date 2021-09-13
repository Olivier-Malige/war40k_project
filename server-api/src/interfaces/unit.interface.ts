import { Document } from 'mongoose';

export interface W40KUnit extends Document {
  id: string;
  name: string;
  description?: string;
  lang: string;
  detail?: string;
  battlefieldRole: string;
  version: string;
  powerRating: number;
  commandPoints?: number;
  profiles: Array<string | number>;
  weapons: Array<string | null | Array<string | number>>;
  wargearOptions: Array<string>;
  abilities: Array<string>;
  factionKeywords: Array<string>;
  keywords: Array<string>;
}
