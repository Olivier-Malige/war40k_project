import React, { FC, useEffect } from 'react';

import { W40kUpsertFormView } from './W40kUpsertFormView';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { GET_W40K_UNITS } from '../UnitsTables/War40kUnitsTableContainer';

export type Props = {
  id?: string;
  handleClose?: () => void;
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
      creationDate
      lastUpdateDate
      powerRating
      commandPoints
      detail
      description
      name
      version
      lang
      factionKeywords
      keywords
    }
  }
`;

export const W40KUpsertFormContainer: FC<Props> = ({ id, handleClose, isCopy }) => {
  const [createUnit] = useMutation(CREATE_W40K_UNIT);
  const [updateUnit] = useMutation(UPDATE_W40K_UNIT);
  const [getUnit, { loading, data, error }] = useLazyQuery(GET_W40K_UNIT);

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

    handleClose && handleClose();
  };

  if (loading) return <div>loading</div>;
  if (error) return <div>Errors : {error}</div>;

  return <W40kUpsertFormView onSubmit={handleSubmit} data={data?.w40kUnit} />;
};
