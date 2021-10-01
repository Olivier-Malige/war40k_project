import React, { FC, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Fab,
  Grid,
} from '@mui/material';
import { Box } from '@mui/system';
import { Add as AddIcon } from '@mui/icons-material';

import { UsersTableHead as TableHeader } from './components/UsersTableHead';
import { UsersTableToolbar as TableToolbar } from './components/UsersTableToolbar';
import { Order, RowData } from './types';

import { getComparator, stableSort } from 'src/utils/sort';

type Props = {
  tableTitle: string;
  rowsData: RowData[];
  onDeleteRow: (id: string[]) => void;
};

export const UsersTableView: FC<Props> = ({ tableTitle, rowsData, onDeleteRow }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof RowData>('name');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof RowData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowsData.length - page * rowsPerPage);

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rowsData.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenUpsertUnit = () => {
    setOpenUpsertModal(true);
  };

  const handleCloseUpsertUnit = () => {
    setOpenUpsertModal(false);
    setIsUpdate(false);
    setIsCopy(false);
  };

  const handleDeleteRow = () => {
    onDeleteRow(selected);
    setSelected([]);
  };

  const handleEdit = () => {
    setOpenUpsertModal(true);
    setIsUpdate(true);
    setIsCopy(false);
  };

  return (
    <Box
      sx={{
        padding: 2,
        height: '100%',
        overflowY: 'hidden',
      }}
    >
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <TableToolbar
            numSelected={selected.length}
            tableTitle={tableTitle}
            onDelete={handleDeleteRow}
            onEdit={handleEdit}
          />
          <TableContainer
            sx={{
              height: '100%',
              maxHeight: '60vh',
            }}
          >
            <Table
              sx={{
                minWidth: 750,
                height: '100%',
                overflowY: 'scroll',
              }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <TableHeader
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rowsData.length}
                order={order}
                orderBy={orderBy}
              />
              <TableBody>
                {stableSort(rowsData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    const isItemSelected = isSelected(row.id as string);
                    const labelId = row.id;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.id as string)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId as string }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.email}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.role}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {new Date(row.creationDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.lastUpdateDate && new Date(row.lastUpdateDate).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <Grid container justifyContent={'flex-end'}>
            <Fab
              onClick={handleOpenUpsertUnit}
              color="secondary"
              size={'large'}
              aria-label="add"
              sx={{
                marginRight: 5,
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>
          <Grid
            container
            justifyContent={'space-between'}
            sx={{
              padding: 2,
            }}
          >
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 40]}
              component="div"
              count={rowsData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </div>
      </Paper>
    </Box>
  );
};