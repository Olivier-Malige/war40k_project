import { not, or, shield } from 'graphql-shield';
import { isAuthenticated } from '../permissions';

import {
  createW40kUnit,
  findAllW40kUnits,
  searchW40kUnits,
  findW40kUnit,
  updateW40kUnit,
  removeW40kUnits,
} from '../../database/queries/units.queries';
import { W40KUnit, W40KUnitInput } from '../../interfaces';
import { dateScalar } from '../scalars';

import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Date

  enum Lang {
    fr_FR
    en_GB
  }

  enum BattlefieldRoles {
    HQs
    Troops
    Elites
    Flyers
    FastAttacks
    HeavySupports
    DedicatedTransports
    LordOfWars
  }

  type W40kUnit {
    id: ID!
    pictureUrl: String
    creationDate: Date!
    lastUpdateDate: Date
    name: String!
    description: String
    lang: Lang!
    detail: String
    battlefieldRole: BattlefieldRoles
    version: String
    powerRating: Int!
    commandPoints: Int
    profiles: [W40kUnitProfile]
    profilesDetail: String
    weapons: [Weapon]
    wargearOptions: [Name]
    abilities: [Abilities]
    factionKeywords: [Name]
    keywords: [Name]
  }

  type W40kUnitProfile {
    numberMin: Int
    numberMax: Int
    name: String
    move: Int
    weaponSkill: Int
    ballisticSkill: Int
    strength: Int
    toughness: Int
    wounds: Int
    attacks: Int
    leadership: Int
    save: Int
  }

  type Weapon {
    name: String
    range: Int
    type: String
    strength: Int
    armourPenetration: Int
    damage: Int
    abilities: String
  }

  type Weapons {
    specialRule: String
    weapons: [Weapon]
  }

  type Abilities {
    name: String!
    rule: String!
  }

  type Name {
    name: String
  }

  input AbilitiesInput {
    name: String!
    rule: String!
  }

  input NameInput {
    name: String
  }

  input W40kUnitInput {
    name: String!
    pictureUrl: String
    lang: Lang!
    version: String!
    description: String
    detail: String
    profiles: [W40kUnitProfileInput]
    profilesDetail: String
    powerRating: Int!
    commandPoints: Int
    battlefieldRole: BattlefieldRoles
    wargearOptions: [NameInput]
    abilities: [AbilitiesInput]
    factionKeywords: [NameInput]
    keywords: [NameInput]
    weapons: [WeaponInput]
  }

  input WeaponInput {
    name: String
    range: Int
    type: String
    strength: Int
    armourPenetration: Int
    damage: Int
    abilities: String
  }

  input WeaponsInput {
    rule: String
    weapon: [WeaponInput]
  }

  input W40kUnitProfileInput {
    name: String
    numberMin: Int
    numberMax: Int
    move: Int
    weaponSkill: Int
    ballisticSkill: Int
    strength: Int
    toughness: Int
    wounds: Int
    attacks: Int
    leadership: Int
    save: Int
  }

  extend type Query {
    w40kUnits: [W40kUnit]
    w40kUnit(id: String): W40kUnit
    searchW40kUnitsByName(name: String!): W40kUnit
  }

  extend type Mutation {
    createW40kUnit(input: W40kUnitInput!): W40kUnit
    updateW40kUnit(input: W40kUnitInput!, id: String!): W40kUnit
    removeW40kUnits(id: [String!]!): Boolean
  }
`;

export const resolvers = {
  Date: dateScalar,

  Query: {
    w40kUnits: (): Promise<Array<W40KUnit>> => {
      return findAllW40kUnits();
    },
    w40kUnit: (_parent, { id }): Promise<W40KUnit> => {
      return findW40kUnit(id);
    },
    searchW40kUnitsByName: (_parent, { name }): Promise<Array<W40KUnit>> => {
      return searchW40kUnits(name);
    },
  },
  Mutation: {
    createW40kUnit: (_parent, { input }) => {
      return createW40kUnit(input as W40KUnitInput);
    },
    updateW40kUnit: (_parent, { id, input }) => {
      return updateW40kUnit(id, input as W40KUnitInput);
    },
    removeW40kUnits: (_parent, { id }) => {
      return removeW40kUnits(id);
    },
  },
};

export const permission = shield({
  Query: {
    w40kUnits: or(isAuthenticated, not(isAuthenticated)),
    w40kUnit: or(isAuthenticated, not(isAuthenticated)),
    searchW40kUnitsByName: or(isAuthenticated, not(isAuthenticated)),
  },
  Mutation: {
    // createW40kUnit: isAuthenticated,
    // updateW40kUnit: isAuthenticated,
    // removeW40kUnits: isAuthenticated,
  },
});
