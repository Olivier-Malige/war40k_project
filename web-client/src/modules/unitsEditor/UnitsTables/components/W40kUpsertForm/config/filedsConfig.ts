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
    type: 'text',
    label: 'Move',
    width: 80,
  },
  {
    name: 'weaponSkill',
    type: 'text',
    label: 'Weapon skill',
    width: 80,
  },
  {
    name: 'ballisticSkill',
    type: 'text',
    label: 'Ballistic skill ',
    width: 80,
  },
  {
    name: 'strength',
    type: 'text',
    label: 'Strength',
    width: 80,
  },
  {
    name: 'toughness',
    type: 'text',
    label: 'Toughness',
    width: 80,
  },
  {
    name: 'wounds',
    type: 'text',
    label: 'Wounds',
    width: 80,
  },
  {
    name: 'attacks',
    type: 'text',
    label: 'Attacks',
    width: 80,
  },
  {
    name: 'leadership',
    type: 'text',
    label: 'Leadership',
    width: 80,
  },
  {
    name: 'save',
    type: 'text',
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

export const specialWeaponCommonFieldConfig: FieldConfig[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    width: 350,
  },
  {
    name: 'rule',
    type: 'text',
    label: 'Rule',
    width: '100%',
  },
];

export const weaponFieldConfig: FieldConfig[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    width: 350,
  },
  {
    name: 'range',
    type: 'text',
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
    type: 'text',
    label: 'Strength',
    width: 70,
  },
  {
    name: 'armourPenetration',
    type: 'text',
    label: 'Armour penetration',
    width: 100,
  },
  {
    name: 'damage',
    type: 'text',
    label: 'Damage',
    width: 70,
  },
  {
    name: 'abilities',
    type: 'text',
    label: 'Abilities',
    width: '100%',
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
