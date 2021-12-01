import React, { FC, ReactElement } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide direction="up" ref={ref} {...props}>
      {props?.children}
    </Slide>
  );
});

type Props = {
  title: string;
  children?: ReactElement;
  open: boolean;
  handleClose: () => void;
  handleOk: () => void;
};
export const ConfirmDialog: FC<Props> = ({ title, children, open, handleClose, handleOk }) => {
  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="secondary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
