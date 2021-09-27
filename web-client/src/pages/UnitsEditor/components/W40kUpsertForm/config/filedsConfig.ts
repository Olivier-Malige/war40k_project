import { FieldConfig, W40KProfile, W40KWeapon } from '../types';

export const profileFieldsConfig: FieldConfig[] = [
  {
    name: 'numberMin',
    type: 'number',
    label: 'Min',
    width: 70,
  },
  {
    name: 'numberMax',
    type: 'number',
    label: 'Max',
    width: 70,
  },
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    width: 170,
  },
  {
    name: 'move',
    type: 'number',
    label: 'M',
    width: 50,
  },
  {
    name: 'weaponSkill',
    type: 'number',
    label: 'WS',
    width: 50,
  },
  {
    name: 'ballisticSkill',
    type: 'number',
    label: 'BS',
    width: 50,
  },
  {
    name: 'strength',
    type: 'number',
    label: 'S',
    width: 50,
  },
  {
    name: 'toughness',
    type: 'number',
    label: 'T',
    width: 50,
  },
  {
    name: 'wounds',
    type: 'number',
    label: 'W',
    width: 50,
  },
  {
    name: 'attacks',
    type: 'number',
    label: 'A',
    width: 50,
  },
  {
    name: 'leadership',
    type: 'number',
    label: 'Ld',
    width: 50,
  },
  {
    name: 'save',
    type: 'number',
    label: 'Sv',
    width: 50,
  },
];
export const emptyProfile: W40KProfile = {
  numberMin: null,
  numberMax: null,
  name: null,
  move: null,
  weaponSkill: null,
  ballisticSkill: null,
  strength: null,
  toughness: null,
  wounds: null,
  attacks: null,
  leadership: null,
  save: null,
};

export const weaponFieldsConfig: FieldConfig[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    width: 180,
  },
  {
    name: 'range',
    type: 'number',
    label: 'Range',
    width: 70,
  },
  {
    name: 'type',
    type: 'text',
    label: 'Type',
    width: 170,
  },
  {
    name: 'strength',
    type: 'number',
    label: 'S',
    width: 50,
  },
  {
    name: 'armourPenetration',
    type: 'number',
    label: 'AP',
    width: 50,
  },
  {
    name: 'damage',
    type: 'number',
    label: 'D',
    width: 50,
  },
  {
    name: 'abilities',
    type: 'text',
    label: 'Abilities',
    width: 200,
  },
];

export const emptyWeapon: W40KWeapon = {
  name: null,
  range: null,
  type: null,
  strength: null,
  armourPenetration: null,
  damage: null,
  abilities: null,
};
