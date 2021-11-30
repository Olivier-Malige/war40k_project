export type FieldConfig = {
  name: string;
  type: 'number' | 'text';
  label: string;
  width?: number | string;
};

export type W40KUnit = {
  pictures: {
    main: {
      url: string;
      ref: string;
    };
  };
  lang: string;
  name: string;
  version: string;
  data: {
    powerRating: number;
    battlefieldRole: string;
    commandPoints: number;
    detail: string;
    description: string;
    keywords: string[];
    factionKeywords: string[];
    wargearOptions: string[];
    abilities: { name: string; rule: string }[];
    weapons: W40KWeapon[];
    specialWeapon: {
      name: string;
      rule: string;
      weapons: W40KWeapon[];
    };
    profiles: W40KProfile[];
  };
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
  w40kUnit?: W40KUnit;
};
