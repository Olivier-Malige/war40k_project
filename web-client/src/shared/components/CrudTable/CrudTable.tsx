/* eslint-disable react/jsx-no-undef */
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
  Avatar,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Box } from '@mui/system';
import { Add as AddIcon } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

import { CrudTableHeader } from './components/CrudTableHeader';
import { CrudTableToolsBar } from './components/CrudTableToolsBar';
import { RowCellsType, Order, TableCellConfig, CrudTableTexts, UpsertFormProps } from './types';

import { getComparator, stableSort } from 'src/shared/utils/sort';
import { FullScreenDialog } from 'src/shared/components/FullScreenDialog';

type Props = {
  tableCells: TableCellConfig[];
  rowsData: { id: string }[];
  onDeleteRow: (id: string[]) => void;
  UpsertForm: FC<UpsertFormProps>;
  texts: CrudTableTexts;
  initialSortOrderCell?: string;
  canCopy?: boolean;
};

export const CrudTable: FC<Props> = ({
  rowsData,
  onDeleteRow,
  UpsertForm,
  tableCells,
  texts,
  initialSortOrderCell,
  canCopy = false,
}) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState(initialSortOrderCell || null);
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property) => {
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

  const handleOpenUpsertForm = () => {
    setOpenUpsertModal(true);
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
  const handleCloseUpsertForm = () => {
    setOpenUpsertModal(false);
    setIsUpdate(false);
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
          <CrudTableToolsBar
            numSelected={selected.length}
            tableTitle={texts.tableTitle}
            deleteRowElementName={texts.deleteRowElement}
            onDelete={handleDeleteRow}
            onEdit={handleEdit}
            onCopy={handleCopy}
            canCopy={canCopy}
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
              size={dense ? 'small' : 'medium'}
            >
              <CrudTableHeader
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rowsData.length}
                order={order}
                orderBy={orderBy}
                tableCells={tableCells}
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
                        {tableCells.map(cellValue => (
                          <TableCell key={uuidv4()} component="th" scope="row" padding="none">
                            {cellValue.rowType === RowCellsType.value && row[cellValue.id]}

                            {cellValue.rowType === RowCellsType.date &&
                              row[cellValue.id] &&
                              new Date(row[cellValue.id]).toLocaleDateString()}

                            {cellValue.rowType === RowCellsType.boolean &&
                              (row[cellValue.id] ? 'true' : 'false')}

                            {cellValue.rowType === RowCellsType.imageUrl && (
                              <Avatar
                                variant={'rounded'}
                                sx={{
                                  ml: 2,
                                  width: dense ? 30 : 80,
                                  height: dense ? 30 : 80,
                                }}
                                src={row[cellValue.id] as string}
                              />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow>
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
              onClick={handleOpenUpsertForm}
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
        title={isUpdate ? texts.updateTitle : texts.createTile}
        handleClose={handleCloseUpsertForm}
        open={openUpsertModal}
      >
        <UpsertForm
          onSubmit={handleCloseUpsertForm}
          isCopy={isCopy}
          id={isUpdate || isCopy ? selected[0] : undefined}
        />
      </FullScreenDialog>
    </Box>
  );
};
