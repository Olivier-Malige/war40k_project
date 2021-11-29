import React, { FC, useEffect } from 'react';

import { W40kUpsertFormView } from './W40kUpsertFormView';
import { useMutation, useLazyQuery } from '@apollo/client';
import { LoadingSpinner } from 'src/shared/components/LoadingSpinner';
import { openSuccessMessage, openErrorMessage } from 'src/graphQL/cache';
import { UpsertFormProps } from 'src/shared/components/CrudTable/types';
import {
  CREATE_W40K_UNIT,
  GET_TABLE_W40K_UNITS,
  GET_W40K_UNIT,
  UPDATE_W40K_UNIT,
} from 'src/graphQL/queries/server/w40kUnit';

export const W40KUpsertFormContainer: FC<UpsertFormProps> = ({ id, onSubmit, isCopy }) => {
  const [createUnit, { loading: createLoading }] = useMutation(CREATE_W40K_UNIT);
  const [updateUnit, { loading: updateLoading }] = useMutation(UPDATE_W40K_UNIT);
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
    const errors = [];

    if (id && data && !isCopy) {
      const result = await updateUnit({
        variables: { unitInput: values, id },
        refetchQueries: [GET_TABLE_W40K_UNITS],
      });
      if (result.errors) {
        errors.push(result.errors);
      }
    } else {
      const result = await createUnit({
        variables: { unitInput: values },
        refetchQueries: [GET_TABLE_W40K_UNITS],
      });
      if (result.errors) {
        errors.push(result.errors);
      }
    }
    if (errors.length === 0) {
      onSubmit && onSubmit();
      openSuccessMessage(true);
    } else {
      openErrorMessage(true);
    }
  };
  if (loading || createLoading || updateLoading) return <LoadingSpinner />;
  return <W40kUpsertFormView onSubmit={handleSubmit} w40kUnit={data?.w40kUnit} />;
};
