import React, { useState } from 'react';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ConfirmDialog } from '../../../../../components/ConfirmDialog';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

type EnhancedTableToolbarProps = {
  numSelected: number;
  tableTitle: string;
  onDeleteRow: () => any;
};

export const UnitTableToolbar = ({
  numSelected,
  tableTitle,
  onDeleteRow,
}: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handleOpenConfirmDelete = () => {
    setOpenDeleteConfirm(true);
  };
  const handleCloseConfirmDelete = () => {
    setOpenDeleteConfirm(false);
  };

  const handleConfirmDelete = () => {
    handleCloseConfirmDelete();
    onDeleteRow();
  };
  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              {tableTitle}
            </Typography>
          </>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon onClick={handleOpenConfirmDelete} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <ConfirmDialog
        title={'Delete unit(s)'}
        open={openDeleteConfirm}
        handleClose={handleCloseConfirmDelete}
        handleOk={handleConfirmDelete}
      >
        <div>Please confirm the deletions of {numSelected} unit(s). </div>
      </ConfirmDialog>
    </>
  );
};
