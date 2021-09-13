import React from 'react';
import { UnitsEditorView } from 'src/pages/UnitsEditor/UnitsEditorView';
import { gql, useQuery } from '@apollo/client';

export const UnitsEditorContainer: React.FC = () => {
  const GET_W40K_UNITS = gql`
    query GetW40kUnits {
      w40kUnits {
        id
        name
        lang
        description
        detail
        abilities {
          name
          rule
        }
        battlefieldRole
        factionKeywords
        powerRating
        profiles {
          attacks
          ballisticSkill
          leadership
          move
          numbers
          save
          strength
          toughness
          weaponSkill
          wounds
        }
        commandPoints
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_W40K_UNITS);

  if (loading) return <div>loading</div>;
  if (error) return <div>Errors : {error}</div>;
  console.log(data);
  return (
    <div>
      <UnitsEditorView />
    </div>
  );
};
