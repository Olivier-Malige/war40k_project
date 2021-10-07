import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CopyIcon from '@mui/icons-material/FileCopy';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ConfirmDialog } from 'src/shared/components/ConfirmDialog';
import { alpha } from '@mui/material';

type UnitTableToolBarProps = {
  numSelected: number;
  tableTitle: string;
  onDelete: () => void;
  onEdit: () => void;
  onCopy: () => void;
};

export const UnitTableToolbar = ({
  numSelected,
  tableTitle,
  onDelete,
  onEdit,
  onCopy,
}: UnitTableToolBarProps) => {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handleOpenConfirmDelete = () => {
    setOpenDeleteConfirm(true);
  };
  const handleCloseConfirmDelete = () => {
    setOpenDeleteConfirm(false);
  };

  const handleConfirmDelete = () => {
    handleCloseConfirmDelete();
    onDelete();
  };
  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: theme =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <>
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
              {tableTitle}
            </Typography>
          </>
        )}
        {numSelected > 0 ? (
          <>
            {numSelected === 1 && (
              <>
                <Tooltip title="Edit">
                  <IconButton color={'secondary'} aria-label="Edit" size="large">
                    <EditIcon onClick={onEdit} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy">
                  <IconButton color={'secondary'} aria-label="Copy" size="large">
                    <CopyIcon onClick={onCopy} />
                  </IconButton>
                </Tooltip>
              </>
            )}
            <Tooltip title="Delete">
              <IconButton color={'warning'} aria-label="delete" size="large">
                <DeleteIcon onClick={handleOpenConfirmDelete} />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list" size="large">
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
