import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { RowData } from './types';
import { UnitTableView } from './UnitTableView';
import { W40KUpsertForm } from '../W40kUpsertForm';

export const War40kUnitsTableContainer: React.FC = () => {
  const GET_W40K_UNITS = gql`
    query GetW40kUnits {
      w40kUnits {
        id
        name
        version
        lang
        factionKeywords
        keywords
      }
    }
  `;

  const DELETE_UNITS = gql`
    mutation DeleteUnits($unitID: String!) {
      removeW40kUnit(id: $unitID)
    }
  `;

  const { loading, error, data } = useQuery(GET_W40K_UNITS);
  const [deleteUnits] = useMutation(DELETE_UNITS);

  const [rowsData, setRowsData] = useState<RowData[]>([]);
  useEffect(() => {
    setRowsData(
      data?.w40kUnits.map(unit => ({
        name: unit.name,
        id: unit.id,
        lang: unit.lang,
        version: unit.version,
        keywords: unit.keywords,
        factionKeywords: unit.factionKeywords,
      })) ?? [],
    );
  }, [data]);

  if (loading) return <div>loading</div>;
  if (error) return <div>Errors : {error}</div>;

  return (
    <UnitTableView
      tableTitle="Warhammer 4000 units"
      rowsData={rowsData}
      onDeleteRow={id =>
        deleteUnits({ variables: { unitID: id }, refetchQueries: [GET_W40K_UNITS] })
      }
      upsertModalContent={<W40KUpsertForm />}
    />
  );
};
