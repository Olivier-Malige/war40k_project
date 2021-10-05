import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { RowData } from './types';
import { UnitTableView } from './UnitTableView';
import W40kUpsertForm from './components/W40kUpsertForm';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

export const GET_W40K_UNITS = gql`
  query GetW40kUnits {
    w40kUnits {
      id
      pictureUrl
      creationDate
      lastUpdateDate
      name
      version
      lang
      factionKeywords {
        name
      }
      keywords {
        name
      }
    }
  }
`;

const DELETE_UNITS = gql`
  mutation DeleteUnits($unitsID: [String!]!) {
    removeW40kUnits(id: $unitsID)
  }
`;

export const War40kUnitsTableContainer: React.FC = () => {
  const { loading, error, data } = useQuery(GET_W40K_UNITS);
  const [deleteUnits, { loading: loadingDeleteUnits, error: errorDeleteUnits }] =
    useMutation(DELETE_UNITS);

  const [rowsData, setRowsData] = useState<RowData[]>([]);

  useEffect(() => {
    setRowsData(
      data?.w40kUnits.map(unit => ({
        pictureUrl: unit.pictureUrl,
        name: unit.name,
        id: unit.id,
        lang: unit.lang,
        version: unit.version,
        keywords: unit.keywords.map(elem => elem.name),
        factionKeywords: unit.factionKeywords.map(elem => elem.name),
        creationDate: unit.creationDate,
        lastUpdateDate: unit.lastUpdateDate,
      })) ?? [],
    );
  }, [data]);

  if (loading || loadingDeleteUnits) return <LoadingSpinner />;
  if (error || errorDeleteUnits) return <div>Errors : {error || errorDeleteUnits}</div>;

  return (
    <UnitTableView
      tableTitle="Warhammer 4000 units"
      rowsData={rowsData}
      onDeleteRow={id =>
        deleteUnits({ variables: { unitsID: id }, refetchQueries: [GET_W40K_UNITS] })
      }
      UpsertForm={W40kUpsertForm}
    />
  );
};
