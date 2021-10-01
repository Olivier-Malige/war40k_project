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
    width: 200,
  },
  {
    name: 'move',
    type: 'number',
    label: 'Move',
    width: 80,
  },
  {
    name: 'weaponSkill',
    type: 'number',
    label: 'Weapon skill',
    width: 80,
  },
  {
    name: 'ballisticSkill',
    type: 'number',
    label: 'Ballistic skill ',
    width: 80,
  },
  {
    name: 'strength',
    type: 'number',
    label: 'Strength',
    width: 80,
  },
  {
    name: 'toughness',
    type: 'number',
    label: 'Toughness',
    width: 80,
  },
  {
    name: 'wounds',
    type: 'number',
    label: 'Wounds',
    width: 80,
  },
  {
    name: 'attacks',
    type: 'number',
    label: 'Attacks',
    width: 80,
  },
  {
    name: 'leadership',
    type: 'number',
    label: 'Leadership',
    width: 80,
  },
  {
    name: 'save',
    type: 'number',
    label: 'Save',
    width: 80,
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
    label: 'Strength',
    width: 70,
  },
  {
    name: 'armourPenetration',
    type: 'number',
    label: 'Armour penetration',
    width: 100,
  },
  {
    name: 'damage',
    type: 'number',
    label: 'Damage',
    width: 70,
  },
  {
    name: 'abilities',
    type: 'text',
    label: 'Abilities',
    width: 300,
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
