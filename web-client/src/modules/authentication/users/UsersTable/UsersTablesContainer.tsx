import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { RowData } from './types';
import { UsersTableView } from './UsersTableView';
import { LoadingSpinner } from 'src/components/LoadingSpinner';
import UserUpsertForm from './components/UserUpsertForm';
export const GET_USERS = gql`
  query GetUsers {
    users {
      email
      id
      displayName
      role
      disabled
    }
  }
`;

const DELETE_USERS = gql`
  mutation DeleteUsers($userIds: [String!]!) {
    deleteUsers(id: $userIds)
  }
`;

export const UsersTablesContainer: React.FC = () => {
  const [rowsData, setRowsData] = useState<RowData[]>([]);
  const { loading, error, data } = useQuery(GET_USERS);
  const [removeUsers] = useMutation(DELETE_USERS);

  useEffect(() => {
    setRowsData(
      data?.users.map(user => ({
        email: user.email,
        id: user.id,
        displayName: user.displayName,
        role: user.role,
        disabled: user.disabled,
      })) ?? [],
    );
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Errors : {error}</div>;

  return (
    <UsersTableView
      tableTitle="Users"
      rowsData={rowsData}
      onDeleteRow={id => removeUsers({ variables: { userIds: id }, refetchQueries: [GET_USERS] })}
      UpsertForm={UserUpsertForm}
    />
  );
};
