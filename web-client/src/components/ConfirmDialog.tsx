import React, { FC, ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
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
