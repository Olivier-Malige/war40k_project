import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { RowData } from './types';
import W40kUpsertForm from './components/W40kUpsertForm';
import { LoadingSpinner } from 'src/shared/components/LoadingSpinner';
import { CrudTable } from 'src/shared/components/CrudTable/CrudTable';
import {
  CrudTableTexts,
  RowCellsType,
  TableCellConfig,
} from 'src/shared/components/CrudTable/types';
import { openErrorMessage } from 'src/graphQL/cache';
import { DELETE_UNITS, GET_TABLE_W40K_UNITS } from 'src/graphQL/queries/server/w40kUnit';

export const War40kUnitsTable: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TABLE_W40K_UNITS);
  const [deleteUnits, { loading: loadingDeleteUnits, error: errorDeleteUnits }] =
    useMutation(DELETE_UNITS);

  const [rowsData, setRowsData] = useState<RowData[]>([]);

  useEffect(() => {
    setRowsData(
      data?.w40kUnits.map(unit => ({
        pictureUrl: unit?.pictures?.main?.url,
        name: unit.name,
        id: unit.id,
        lang: unit.lang,
        version: unit.version,
        keywords: unit.data.keywords.map(elem => `${elem.name}; `),
        factionKeywords: unit.data.factionKeywords.map(elem => `${elem.name}; `),
        creationDate: unit.creationDate,
        lastUpdateDate: unit.lastUpdateDate,
      })) ?? [],
    );
  }, [data]);

  useEffect(() => {
    if (error || errorDeleteUnits) openErrorMessage(true);
  }, [error, errorDeleteUnits]);

  if (loading || loadingDeleteUnits) return <LoadingSpinner />;

  const tableCells: TableCellConfig[] = [
    {
      rowType: RowCellsType.imageUrl,
      id: 'pictureUrl',
      label: 'Picture',
    },
    {
      rowType: RowCellsType.value,
      id: 'name',
      label: 'Name',
    },
    {
      rowType: RowCellsType.value,
      id: 'lang',
      label: 'Lang',
    },
    {
      rowType: RowCellsType.value,
      id: 'version',
      label: 'Version',
    },
    {
      rowType: RowCellsType.value,
      id: 'keywords',
      label: 'Keywords',
    },
    {
      rowType: RowCellsType.value,
      id: 'factionKeywords',
      label: 'Faction Keywords',
    },
    {
      rowType: RowCellsType.date,
      id: 'creationDate',
      label: 'Creation date',
    },
    {
      rowType: RowCellsType.date,
      id: 'lastUpdateDate',
      label: 'Last update date',
    },
  ];

  const w40kUnitTableTexts: CrudTableTexts = {
    tableTitle: 'Warhammer 4000 units',
    updateTitle: 'Update unit',
    createTile: 'Create a new unit',
    deleteRowElement: 'unit(s)',
  };

  return (
    <CrudTable
      texts={w40kUnitTableTexts}
      rowsData={rowsData}
      onDeleteRow={id =>
        deleteUnits({ variables: { unitsID: id }, refetchQueries: [GET_TABLE_W40K_UNITS] })
      }
      UpsertForm={W40kUpsertForm}
      tableCells={tableCells}
      canCopy
    />
  );
};
