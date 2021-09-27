export type FieldConfig = {
  name: string;
  type: 'number' | 'text';
  label: string;
  width?: number;
};

export type W40KUnit = {
  pictureUrl: string;
  lang: string;
  name: string;
  powerRating: number;
  battlefieldRole: string;
  commandPoints: number;
  version: string;
  detail: string;
  description: string;
  keywords: string[];
  factionKeywords: string[];
  wargearOptions: string[];
  abilities: { name: string; rule: string }[];
  weapons: W40KWeapon[];
  profiles: W40KProfile[];
};

export type W40KProfile = {
  numberMin: number;
  numberMax: number;
  name: string;
  move: number;
  weaponSkill: number;
  ballisticSkill: number;
  strength: number;
  toughness: number;
  wounds: number;
  attacks: number;
  leadership: number;
  save: number;
};

export type W40KWeapon = {
  name: string;
  range: number;
  type: string;
  strength: number;
  armourPenetration: number;
  damage: number;
  abilities: string;
};

export type W40KUpsertFormProps = {
  onSubmit: (values: W40KUnit) => void;
  data?: W40KUnit;
};
