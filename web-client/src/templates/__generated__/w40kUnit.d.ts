/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: w40kUnit
// ====================================================

export interface w40kUnit_warApi_w40kUnit_pictures_main {
  url: string | null;
}

export interface w40kUnit_warApi_w40kUnit_pictures {
  main: w40kUnit_warApi_w40kUnit_pictures_main | null;
}

export interface w40kUnit_warApi_w40kUnit_data_keywords {
  name: string | null;
}

export interface w40kUnit_warApi_w40kUnit_data_factionKeywords {
  name: string | null;
}

export interface w40kUnit_warApi_w40kUnit_data_profiles {
  numberMin: number | null;
  numberMax: number | null;
  name: string | null;
  move: string | null;
  weaponSkill: string | null;
  ballisticSkill: string | null;
  strength: string | null;
  toughness: string | null;
  wounds: string | null;
  attacks: string | null;
}

export interface w40kUnit_warApi_w40kUnit_data_abilities {
  name: string;
  rule: string;
}

export interface w40kUnit_warApi_w40kUnit_data_weapons {
  name: string | null;
  range: string | null;
  type: string | null;
  strength: string | null;
  armourPenetration: string | null;
  damage: string | null;
  abilities: string | null;
}

export interface w40kUnit_warApi_w40kUnit_data {
  keywords: (w40kUnit_warApi_w40kUnit_data_keywords | null)[] | null;
  factionKeywords: (w40kUnit_warApi_w40kUnit_data_factionKeywords | null)[] | null;
  description: string | null;
  profiles: (w40kUnit_warApi_w40kUnit_data_profiles | null)[] | null;
  abilities: (w40kUnit_warApi_w40kUnit_data_abilities | null)[] | null;
  weapons: (w40kUnit_warApi_w40kUnit_data_weapons | null)[] | null;
}

export interface w40kUnit_warApi_w40kUnit {
  name: string;
  pictures: w40kUnit_warApi_w40kUnit_pictures | null;
  data: w40kUnit_warApi_w40kUnit_data | null;
}

export interface w40kUnit_warApi {
  w40kUnit: w40kUnit_warApi_w40kUnit | null;
}

export interface w40kUnit {
  warApi: w40kUnit_warApi;
}

export interface w40kUnitVariables {
  unitId: string;
}
