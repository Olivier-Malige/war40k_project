import React from 'react';
import { EnhancedTable } from 'src/components/EnhancedTable/EnhancedTable';
import { RowData } from 'src/components/EnhancedTable/types';
import { ApolloError } from '@apollo/client';

type Props = {
  rowsData: RowData[];
  loading: boolean;
  error: ApolloError;
};
export const War40kUnitsTableView: React.FC<Props> = ({ loading, error, rowsData }) => {
  if (loading) return <div>loading</div>;
  if (error) return <div>Errors : {error}</div>;
  return <EnhancedTable tableTitle="Warhammer 4000 units" rowsData={rowsData} />;
};
