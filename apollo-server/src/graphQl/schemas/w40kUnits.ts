import { or } from 'graphql-shield';
import { isAdmin, isAuthenticated, isContributor } from '../rules';

import {
  createW40kUnit,
  findAllW40kUnits,
  searchW40kUnits,
  findW40kUnit,
  updateW40kUnit,
  removeW40kUnits,
} from '../../database/queries/units.queries';

import { gql } from 'apollo-server';
import { W40kUnit, W40kUnitInput } from '../../types';
import { IResolvers } from 'graphql-middleware/dist/types';
import { Context } from '../../app';

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
    ownerId: ID!
    name: String!
    version: String
    creationDate: Date!
    lastUpdateDate: Date
    lang: Lang!
    data: W40kUnitData
    pictures: UnitPictures
  }

  type W40kUnitData {
    description: String
    detail: String
    battlefieldRole: BattlefieldRoles
    powerRating: Int
    commandPoints: Int
    profiles: [W40kUnitProfile]
    profilesDetail: String
    weapons: [Weapon]
    specialWeapon: SpecialWeapon
    wargearOptions: [Name]
    abilities: [Abilities]
    factionKeywords: [Name]
    keywords: [Name]
  }

  type UnitPictures {
    main: UnitPicture
  }

  type UnitPicture {
    url: String
    ref: String
  }

  type W40kUnitProfile {
    numberMin: Int
    numberMax: Int
    name: String
    move: String
    weaponSkill: String
    ballisticSkill: String
    strength: String
    toughness: String
    wounds: String
    attacks: String
    leadership: String
    save: String
  }

  type Weapon {
    name: String
    range: Int
    type: String
    strength: String
    armourPenetration: String
    damage: String
    abilities: String
  }

  type SpecialWeapon {
    name: String
    rule: String
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
    lang: Lang!
    version: String!
    data: W40kUnitDataInput
    pictures: PicturesInput
  }

  input PicturesInput {
    main: PictureInput
  }

  input PictureInput {
    url: String
    ref: String
  }

  input W40kUnitDataInput {
    description: String
    detail: String
    profiles: [W40kUnitProfileInput]
    profilesDetail: String
    powerRating: Int
    commandPoints: Int
    battlefieldRole: BattlefieldRoles
    wargearOptions: [NameInput]
    abilities: [AbilitiesInput]
    factionKeywords: [NameInput]
    keywords: [NameInput]
    weapons: [WeaponInput]
    specialWeapon: specialWeaponInput
  }

  input WeaponInput {
    name: String
    range: Int
    type: String
    strength: String
    armourPenetration: String
    damage: String
    abilities: String
  }

  input specialWeaponInput {
    name: String
    rule: String
    weapons: [WeaponInput]
  }

  input W40kUnitProfileInput {
    name: String
    numberMin: Int
    numberMax: Int
    move: String
    weaponSkill: String
    ballisticSkill: String
    strength: String
    toughness: String
    wounds: String
    attacks: String
    leadership: String
    save: String
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

export const resolvers: IResolvers = {
  Query: {
    w40kUnits: (): Promise<Array<W40kUnit>> => {
      return findAllW40kUnits();
    },
    w40kUnit: (_parent, { id }: { id: string }): Promise<W40kUnit> => {
      return findW40kUnit(id);
    },
    searchW40kUnitsByName: (_parent, { name }: { name: string }): Promise<Array<W40kUnit>> => {
      return searchW40kUnits(name);
    },
  },
  Mutation: {
    createW40kUnit: (_parent, { input }: { input: W40kUnitInput }, context: Context) => {
      return createW40kUnit(input, context.user.uid);
    },
    updateW40kUnit: (_parent, { id, input }: { id: string; input: W40kUnitInput }) => {
      return updateW40kUnit(id, input);
    },
    removeW40kUnits: (_parent, { id }: { id: string[] }) => {
      return removeW40kUnits(id);
    },
  },
};

export const permissions = {
  Query: {
    w40kUnits: isAuthenticated,
    w40kUnit: isAuthenticated,
    searchW40kUnitsByName: isAuthenticated,
  },
  Mutation: {
    createW40kUnit: or(isAdmin, isContributor),
    updateW40kUnit: or(isAdmin, isContributor),
    removeW40kUnits: or(isAdmin, isContributor),
  },
};
