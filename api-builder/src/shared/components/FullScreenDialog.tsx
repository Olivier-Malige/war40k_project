import React, { FC, ReactElement } from 'react';

import { Slide, Dialog, AppBar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { IconButton, Toolbar } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material/';
import { Box } from '@mui/system';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide direction="up" ref={ref} {...props}>
      {props.children}
    </Slide>
  );
});

type Props = {
  title: string;
  children?: ReactElement;
  open: boolean;
  handleClose: () => void;
};
export const FullScreenDialog: FC<Props> = ({ title, children, open, handleClose }) => {
  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant={'h5'}>
            {title}
          </Typography>
          <IconButton size={'large'} color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon fontSize={'large'} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: 'calc(100% - 40px)',
          mt: 5,
          backgroundColor: theme => theme.palette.background.default,
        }}
      >
        {children}
      </Box>
    </Dialog>
  );
};
