import React, { useEffect, FC } from 'react';
import { UserUpsertFormView } from './UserUpsertFormView';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { LoadingSpinner } from 'src/shared/components/LoadingSpinner';

import { openErrorMessage, openSuccessMessage } from 'src/graphQL/cache';
import { GET_USERS } from '../../UsersTable';
import { UpsertFormProps } from 'src/shared/components/CrudTable/types';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      displayName
      role
      disabled
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput) {
    createUser(input: $input) {
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput, $id: ID!) {
    updateUser(input: $input, id: $id) {
      id
    }
  }
`;

export const UserUpsertFormContainer: FC<UpsertFormProps> = ({ id, onSubmit }) => {
  const [createUser, { loading: createLoading }] = useMutation(CREATE_USER);
  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER);
  const [getUser, { loading, data, error }] = useLazyQuery(GET_USER, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (id) {
      getUser({
        variables: { id },
      });
    }
  }, [id, getUser]);

  useEffect(() => {
    openErrorMessage(true);
  }, [error]);

  const handleSubmit = async values => {
    const errors = [];
    if (id && data) {
      const result = await updateUser({
        variables: { input: values, id },
        refetchQueries: [GET_USERS],
      });
      if (result.errors) errors.push(result.errors);
    } else {
      const result = await createUser({
        variables: { input: values },
        refetchQueries: [GET_USERS],
      });
      if (result.errors) errors.push(result.errors);
    }
    if (errors.length === 0) {
      onSubmit && onSubmit();
      openSuccessMessage(true);
    } else {
      openErrorMessage(true);
    }
  };

  if (loading || createLoading || updateLoading) return <LoadingSpinner />;

  return <UserUpsertFormView onSubmit={handleSubmit} data={data?.user} isUpdate={Boolean(id)} />;
};
