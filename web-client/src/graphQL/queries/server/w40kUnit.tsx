import { gql } from '@apollo/client';

export const GET_W40K_UNIT = gql`
  query GetW40kUnit($id: String!) {
    w40kUnit(id: $id) {
      id
      creationDate
      lastUpdateDate
      name
      version
      lang
      pictures {
        main {
          url
          ref
        }
      }
      data {
        battlefieldRole
        powerRating
        commandPoints
        detail
        description
        anotherEquipment {
          aptitude
          name
        }
        wargearOptions {
          name
        }
        abilities {
          name
          rule
        }
        factionKeywords {
          name
        }
        keywords {
          name
        }
        weapons {
          abilities
          armourPenetration
          damage
          name
          range
          strength
          type
        }
        specialWeapon {
          rule
          name
          weapons {
            abilities
            armourPenetration
            damage
            name
            range
            strength
            type
          }
        }
        profilesDetail
        profiles {
          attacks
          ballisticSkill
          leadership
          move
          name
          numberMax
          numberMin
          save
          strength
          toughness
          weaponSkill
          wounds
        }
      }
    }
  }
`;

export const CREATE_W40K_UNIT = gql`
  mutation createW40kUnit($unitInput: W40kUnitInput!) {
    createW40kUnit(input: $unitInput) {
      id
    }
  }
`;

export const UPDATE_W40K_UNIT = gql`
  mutation updateW40kUnit($unitInput: W40kUnitInput!, $id: String!) {
    updateW40kUnit(id: $id, input: $unitInput) {
      id
    }
  }
`;

export const DELETE_UNITS = gql`
  mutation DeleteUnits($unitsID: [String!]!) {
    removeW40kUnits(id: $unitsID)
  }
`;
export const GET_TABLE_W40K_UNITS = gql`
  query GetW40kUnits {
    w40kUnits {
      id
      creationDate
      lastUpdateDate
      name
      version
      lang
      pictures {
        main {
          url
        }
      }
      data {
        factionKeywords {
          name
        }
        keywords {
          name
        }
      }
    }
  }
`;
