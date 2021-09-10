import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Unit {
    #    id: ID!
    name: String!
    description: String
    power: Int!
    #    characteristics: UnitCharacteristics!
    battleField: String!
    #    weapons: [Weapon]
    wargearOptions: [String]
    abilities: [String]
    factionKeywords: [String!]!
    keywords: [String!]!
  }

  type UnitCharacteristics {
    move: String!
    weaponSkill: String!
    ballisticSkill: String!
    strength: String!
    toughness: String!
    wounds: String!
    attacks: String!
    leadership: String!
    save: String!
  }

  type Weapon {
    id: ID!
    name: String!
    range: Int!
    type: String!
    strength: Int!
    armourPenetration: Int!
    damage: Int!
  }

  input UnitInput {
    name: String!
    description: String
    power: Int!
    battleField: String!
    wargearOptions: [String]
    abilities: [String]
    factionKeywords: [String!]!
    keywords: [String!]!
  }

  type Query {
    units: [Unit]
    unit(name: String!): Unit
    searchUnitsByName(name: String!): Unit
  }

  type Mutation {
    createUnit(input: UnitInput): Unit
  }
`;
