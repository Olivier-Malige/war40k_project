import React, { cloneElement, FC, ReactElement, useState } from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { UnitTableToolbar } from './components/UnitTableToolbar';
import { UnitTableHead } from './components/UnitTableHead';
import { Order, RowData } from './types';
import { Fab, Grid } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { StyledModal } from 'src/components/StyledModal';
import { getComparator, stableSort } from 'src/utils/sort';

type Props = {
  tableTitle: string;
  rowsData: RowData[];
  onDeleteRow: (id: string[]) => void;
  upsertModalContent: ReactElement;
};

export const UnitTableView: FC<Props> = ({
  tableTitle,
  rowsData,
  onDeleteRow,
  upsertModalContent,
}) => {
  const classes = useStyles();
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

  const handleOpenUpsertModal = () => {
    setOpenUpsertModal(true);
  };

  const handleCloseUpsertModal = () => {
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div>
          <UnitTableToolbar
            numSelected={selected.length}
            tableTitle={tableTitle}
            onDelete={handleDeleteRow}
            onEdit={handleEdit}
            onCopy={handleCopy}
          />
          <TableContainer className={classes.tableContainer}>
            <Table
              className={classes.table}
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
              onClick={handleOpenUpsertModal}
              color="secondary"
              size={'large'}
              aria-label="add"
              className={classes.addIcon}
            >
              <AddIcon />
            </Fab>
          </Grid>
          <Grid container justifyContent={'space-between'} className={classes.bottomTools}>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
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
      <StyledModal handleClose={handleCloseUpsertModal} open={openUpsertModal}>
        {cloneElement(
          upsertModalContent,
          {
            isCopy,
            id: isUpdate || isCopy ? selected[0] : undefined,
            handleClose: handleCloseUpsertModal,
          },
          null,
        )}
      </StyledModal>
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: 20,
      paddingBottom: 20,
      height: '100%',
      overflowY: 'hidden',
    },
    paper: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    tableContainer: {
      height: '100%',
      maxHeight: '65vh',
    },
    table: {
      minWidth: 750,
      height: '100%',
      overflowY: 'scroll',
    },
    addIcon: {
      marginRight: 30,
    },
    bottomTools: {
      padding: 10,
    },
  }),
);
