import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { UserRowData } from './types';
import { LoadingSpinner } from 'src/shared/components/LoadingSpinner';
import { CrudTable } from 'src/shared/components/CrudTable/CrudTable';
import UserUpsertForm from './components/UserUpsertForm';
import {
  RowCellsType,
  TableCellConfig,
  CrudTableTexts,
} from 'src/shared/components/CrudTable/types';
import { openErrorMessage } from 'src/graphQL/cache';
export const GET_USERS = gql`
  query GetUsers {
    users {
      email
      id
      displayName
      role
      disabled
      lastSignInDate
      creationDate
    }
  }
`;

const DELETE_USERS = gql`
  mutation DeleteUsers($userIds: [String!]!) {
    deleteUsers(id: $userIds)
  }
`;

export const UsersTable: React.FC = () => {
  const [rowsData, setRowsData] = useState([]);
  const { loading, error, data } = useQuery(GET_USERS);
  const [removeUsers, { loading: loadingDeleteUser, error: errorDeleteUser }] =
    useMutation(DELETE_USERS);

  useEffect(() => {
    setRowsData(
      data?.users.map(
        (user: UserRowData) =>
          ({
            email: user.email,
            id: user.id,
            displayName: user.displayName,
            role: user.role,
            disabled: user.disabled,
            lastSignInDate: user.lastSignInDate,
            creationDate: user.creationDate,
          } as UserRowData),
      ) ?? [],
    );
  }, [data]);

  useEffect(() => {
    openErrorMessage(true);
  }, [error, errorDeleteUser]);

  if (loading || loadingDeleteUser) return <LoadingSpinner />;

  const tableCells: TableCellConfig[] = [
    {
      rowType: RowCellsType.value,
      id: 'displayName',
      label: 'Display name',
    },
    {
      rowType: RowCellsType.value,
      id: 'email',
      label: 'Email',
    },
    {
      rowType: RowCellsType.value,
      id: 'role',
      label: 'Role',
    },
    {
      rowType: RowCellsType.boolean,
      id: 'disable',
      label: 'Disable',
    },
    {
      rowType: RowCellsType.date,
      id: 'creationDate',
      label: 'Creation date',
    },
    {
      rowType: RowCellsType.date,
      id: 'lastSignInDate',
      label: 'Last signin date',
    },
  ];

  const usersTableTexts: CrudTableTexts = {
    tableTitle: 'Users',
    updateTitle: 'Update user',
    createTile: 'Create a new user',
    deleteRowElement: 'user(s)',
  };

  return (
    <CrudTable
      rowsData={rowsData}
      onDeleteRow={id => removeUsers({ variables: { userIds: id }, refetchQueries: [GET_USERS] })}
      UpsertForm={UserUpsertForm}
      tableCells={tableCells}
      texts={usersTableTexts}
      initialSortOrderCell="creationDate"
    />
  );
};
