import { Document } from 'mongoose';

export interface W40KUnit extends Document {
  id: string;
  creationDate: Date;
  lastUpdateDate?: Date;
  name: string;
  description?: string;
  lang: string;
  detail?: string;
  battlefieldRole?: string;
  version: string;
  powerRating: number;
  commandPoints?: number;
  profiles?: Array<any>;
  weapons?: Array<any>;
  wargearOptions?: Array<{ value: string }>;
  abilities?: Array<{ value: string }>;
  factionKeywords?: Array<{ value: string }>;
  keywords?: Array<{ value: string }>;
}

export interface W40KUnitInput {
  name: string;
  description?: string;
  lang: string;
  detail?: string;
  battlefieldRole?: string;
  version: string;
  powerRating: number;
  commandPoints?: number;
  profiles?: Array<any>;
  weapons?: Array<any>;
  wargearOptions?: Array<{ value: string }>;
  abilities?: Array<{ value: string }>;
  factionKeywords?: Array<{ value: string }>;
  keywords?: Array<{ value: string }>;
}
