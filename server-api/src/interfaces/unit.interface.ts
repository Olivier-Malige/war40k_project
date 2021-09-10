import { Document } from 'mongoose';

export interface IUnit extends Document {
  name: string;
  description?: string;
  power: number;
  battleField?: string;
  wargearOptions: Array<string>;
  abilities: Array<string>;
  factionKeywords: Array<string>;
  keywords: Array<string>;
}
