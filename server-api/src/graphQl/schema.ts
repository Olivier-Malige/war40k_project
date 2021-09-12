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

  type Unit {
    id: ID
    name: String!
    description: String
    lang: Lang
    detail: String
    battlefieldRole: BattlefieldRoles
    version: String
    powerRating: Int
    commandPoints: Int
    profiles: [UnitProfile]
    profilesDetail: String
    weapons: [Weapons]
    wargearOptions: [String]
    abilities: [Abilities]
    factionKeywords: [String]
    keywords: [String]
  }

  type UnitProfile {
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

  input UnitInput {
    name: String!
    lang: Lang!
    description: String
    detail: String
    profiles: UnitProfileInput!
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

  input UnitProfileInput {
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
    units: [Unit]
    unit(name: String, id: String): Unit
    searchUnitsByName(name: String!): Unit
  }

  type Mutation {
    createUnit(input: UnitInput!): Unit
    updateUnit(input: UnitInput!, id: String!): Unit
    deleteUnit(id: String!): Unit
  }
`;
