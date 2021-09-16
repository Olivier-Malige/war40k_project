import React from 'react';
import { TableSortLabel } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import { HeadCell, Order, RowData } from '../types';

type EnhancedTableProps = {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof RowData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

const headCells: HeadCell[] = [
  { id: 'name', label: 'Unit name' },
  { id: 'id', label: 'Id' },
  { id: 'lang', label: 'Lang' },
  { id: 'version', label: 'Version' },
  { id: 'creationDate', label: 'Creation date' },
  { id: 'lastUpdateDate', label: 'Last update date' },
  { id: 'Keywords', label: 'Keywords' },
  { id: 'factionKeywords', label: 'Faction keywords' },
];

export const UnitTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, rowCount, numSelected, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof RowData) => (event: React.MouseEvent<unknown>) => {
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
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            padding={'none'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id as keyof RowData)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
