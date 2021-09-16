import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { RowData } from './types';
import { UnitTableView } from './UnitTableView';
import { W40KUpsertForm } from '../W40kUpsertForm';

const GET_W40K_UNITS = gql`
  query GetW40kUnits {
    w40kUnits {
      id
      creationDate
      lastUpdateDate
      name
      version
      lang
      factionKeywords
      keywords
    }
  }
`;

const DELETE_UNITS = gql`
  mutation DeleteUnits($unitsID: [String!]!) {
    removeW40kUnits(id: $unitsID)
  }
`;

const CREATE_W40K_UNIT = gql`
  mutation ($unitInput: W40kUnitInput!) {
    createW40kUnit(input: $unitInput) {
      id
    }
  }
`;

export const War40kUnitsTableContainer: React.FC = () => {
  const { loading, error, data } = useQuery(GET_W40K_UNITS);
  const [deleteUnits] = useMutation(DELETE_UNITS);
  const [createUnit] = useMutation(CREATE_W40K_UNIT);
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
        creationDate: unit.creationDate,
        lastUpdateDate: unit.lastUpdateDate,
      })) ?? [],
    );
  }, [data]);

  const handleCreateUnitSubmit = async values => {
    await createUnit({
      variables: { unitInput: values },
      refetchQueries: [GET_W40K_UNITS],
    });
  };

  if (loading) return <div>loading</div>;
  if (error) return <div>Errors : {error}</div>;

  return (
    <UnitTableView
      tableTitle="Warhammer 4000 units"
      rowsData={rowsData}
      onDeleteRow={id =>
        deleteUnits({ variables: { unitsID: id }, refetchQueries: [GET_W40K_UNITS] })
      }
      upsertModalContent={<W40KUpsertForm onSubmit={handleCreateUnitSubmit} />}
    />
  );
};
