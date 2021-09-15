import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { War40kUnitsTableView } from './War40kUnitsTableView';
import { RowData } from '../../../../components/EnhancedTable/types';

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
  const { loading, error, data } = useQuery(GET_W40K_UNITS);
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

  return <War40kUnitsTableView loading={loading} error={error} rowsData={rowsData} />;
};
