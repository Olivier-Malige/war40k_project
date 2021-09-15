import React, { FC } from 'react';
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
  { id: 'name', numeric: false, label: 'Unit name' },
  { id: 'id', numeric: false, label: 'Id' },
  { id: 'lang', numeric: false, label: 'Lang' },
  { id: 'version', numeric: false, label: 'Version' },
  { id: 'Keywords', numeric: false, label: 'Keywords' },
  { id: 'factionKeywords', numeric: false, label: 'Faction keywords' },
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
            align={headCell.numeric ? 'right' : 'left'}
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
