import React, { FC } from 'react';
import { TableSortLabel } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

import { Order, TableCellConfig } from '../types';

type Props = {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  tableCells: TableCellConfig[];
};

export const CrudTableHeader: FC<Props> = ({
  onSelectAllClick,
  rowCount,
  numSelected,
  order,
  orderBy,
  onRequestSort,
  tableCells,
}) => {
  const createSortHandler = property => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {tableCells.map(headCell => (
          <TableCell
            key={headCell.id}
            padding={'none'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
