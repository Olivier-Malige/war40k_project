import React, { FC, useEffect } from 'react';

import { W40kUpsertFormView } from './W40kUpsertFormView';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { GET_W40K_UNITS } from '../UnitsTables/War40kUnitsTableContainer';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import { openSuccessMessage, openErrorMessage } from '../../../../App/cache';

export type UpsertFormProps = {
  id?: string;
  onSubmit: () => void;
  isCopy?: boolean;
};

const CREATE_W40K_UNIT = gql`
  mutation ($unitInput: W40kUnitInput!) {
    createW40kUnit(input: $unitInput) {
      id
    }
  }
`;

const UPDATE_W40K_UNIT = gql`
  mutation ($unitInput: W40kUnitInput!, $id: String!) {
    updateW40kUnit(id: $id, input: $unitInput) {
      id
    }
  }
`;

const GET_W40K_UNIT = gql`
  query GetW40kUnit($id: String!) {
    w40kUnit(id: $id) {
      id
      battlefieldRole
      pictureUrl
      creationDate
      lastUpdateDate
      powerRating
      commandPoints
      detail
      description
      wargearOptions {
        name
      }
      name
      version
      lang
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
`;

export const W40KUpsertFormContainer: FC<UpsertFormProps> = ({ id, onSubmit, isCopy }) => {
  const [createUnit, { error: createError, loading: createLoading }] =
    useMutation(CREATE_W40K_UNIT);
  const [updateUnit, { error: updateError, loading: updateLoading }] =
    useMutation(UPDATE_W40K_UNIT);
  const [getUnit, { loading, data }] = useLazyQuery(GET_W40K_UNIT, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (id) {
      getUnit({
        variables: { id },
      });
    }
  }, [id, getUnit]);

  const handleSubmit = async values => {
    if (id && data && !isCopy) {
      await updateUnit({
        variables: { unitInput: values, id },
        refetchQueries: [GET_W40K_UNITS],
      });
    } else {
      await createUnit({
        variables: { unitInput: values },
        refetchQueries: [GET_W40K_UNITS],
      });
    }
    if (!createError && !updateError) {
      onSubmit && onSubmit();
      openSuccessMessage(true);
    } else {
      openErrorMessage(true);
    }
  };

  if (loading || createLoading || updateLoading) return <LoadingSpinner />;
  return <W40kUpsertFormView onSubmit={handleSubmit} data={data?.w40kUnit} />;
};
