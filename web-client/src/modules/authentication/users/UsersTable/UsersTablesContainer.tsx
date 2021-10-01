import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { RowData } from './types';
import { UsersTableView } from './UsersTableView';
import { LoadingSpinner } from 'src/components/LoadingSpinner';

export const UsersTablesContainer: React.FC = () => {
  const [rowsData, setRowsData] = useState<RowData[]>([]);

  // if (loading) return <LoadingSpinner />;
  // if (error) return <div>Errors : {error}</div>;

  return <UsersTableView tableTitle="Users" rowsData={[]} onDeleteRow={() => null} />;
};
