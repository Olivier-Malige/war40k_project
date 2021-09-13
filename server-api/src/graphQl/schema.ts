import { gql } from 'apollo-server';

export const typeDefs = gql`
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
    name: String!
    description: String
    lang: Lang
    detail: String
    battlefieldRole: BattlefieldRoles
    version: String
    powerRating: Int
    commandPoints: Int
    profiles: [W40kUnitProfile]
    profilesDetail: String
    weapons: [Weapons]
    wargearOptions: [String]
    abilities: [Abilities]
    factionKeywords: [String]
    keywords: [String]
  }

  type W40kUnitProfile {
    numbers: [Int!]
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

  input AbilitiesInput {
    name: String!
    rule: String!
  }

  input W40kUnitInput {
    name: String!
    lang: Lang!
    version: String!
    description: String
    detail: String
    profiles: W40kUnitProfileInput!
    profilesDetail: String
    powerRating: Int!
    commandPoints: Int
    battlefieldRole: BattlefieldRoles!
    wargearOptions: [String]
    abilities: [AbilitiesInput]
    factionKeywords: [String!]!
    keywords: [String!]!
    weapons: [WeaponsInput]
  }

  input WeaponInput {
    name: String!
    range: Int!
    type: String!
    strength: Int!
    armourPenetration: Int!
    damage: Int!
    abilities: String
  }

  input WeaponsInput {
    rule: String
    weapon: [WeaponInput]
  }

  input W40kUnitProfileInput {
    name: String!
    numbers: [Int!]!
    move: Int!
    weaponSkill: Int!
    ballisticSkill: Int!
    strength: Int!
    toughness: Int!
    wounds: Int!
    attacks: Int!
    leadership: Int!
    save: Int!
  }

  type Query {
    w40kUnits: [W40kUnit]
    w40kUnit(name: String, id: String): W40kUnit
    searchW40kUnitsByName(name: String!): W40kUnit
  }

  type Mutation {
    createW40kUnit(input: W40kUnitInput!): W40kUnit
    updateW40kUnit(input: W40kUnitInput!, id: String!): W40kUnit
    removeW40kUnit(id: String!): Boolean
  }
`;
