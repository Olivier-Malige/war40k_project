import React from 'react';
import { Backdrop, Fade, Modal } from '@mui/material';
import { Box } from '@mui/system';

export const StyledModal = ({ children, open, handleClose }) => {
  return (
    <Modal
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 10,
            p: 4,
            position: 'absolute',
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};
