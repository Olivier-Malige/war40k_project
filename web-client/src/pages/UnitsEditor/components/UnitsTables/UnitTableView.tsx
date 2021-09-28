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
  Switch,
  FormControlLabel,
  Fab,
  Grid,
  Avatar,
} from '@mui/material';
import { Box } from '@mui/system';
import { Add as AddIcon } from '@mui/icons-material';

import { UnitTableToolbar } from './components/UnitTableToolbar';
import { UnitTableHead } from './components/UnitTableHead';
import { Order, RowData } from './types';

import { getComparator, stableSort } from 'src/utils/sort';
import { FullScreenDialog } from '../../../../components/FullScreenDialog';
import { UpsertFormProps } from '../W40kUpsertForm/W40kUpsertFormContainer';

type Props = {
  tableTitle: string;
  rowsData: RowData[];
  onDeleteRow: (id: string[]) => void;
  UpsertForm: FC<UpsertFormProps>;
};

export const UnitTableView: FC<Props> = ({ tableTitle, rowsData, onDeleteRow, UpsertForm }) => {
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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
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

  const handleCopy = () => {
    setOpenUpsertModal(true);
    setIsCopy(true);
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
          <UnitTableToolbar
            numSelected={selected.length}
            tableTitle={tableTitle}
            onDelete={handleDeleteRow}
            onEdit={handleEdit}
            onCopy={handleCopy}
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
              <UnitTableHead
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
                          <Avatar
                            variant={'rounded'}
                            sx={{
                              ml: 2,
                              width: dense ? 30 : 80,
                              height: dense ? 30 : 80,
                            }}
                            src={row?.pictureUrl as string}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.id}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.lang}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.version}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {new Date(row.creationDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.lastUpdateDate && new Date(row.lastUpdateDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.keywords?.toString()}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {row.factionKeywords?.toString()}
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
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense"
            />
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
      <FullScreenDialog
        title={isUpdate ? 'Update a warhammer 40k unit' : 'Create a new warhammer 40k unit'}
        handleClose={handleCloseUpsertUnit}
        open={openUpsertModal}
      >
        <UpsertForm
          onSubmit={handleCloseUpsertUnit}
          isCopy={isCopy}
          id={isUpdate || isCopy ? selected[0] : undefined}
        />
      </FullScreenDialog>
    </Box>
  );
};
