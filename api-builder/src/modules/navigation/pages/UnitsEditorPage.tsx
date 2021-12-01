import React, { FC } from 'react';
import { Button, Grid } from '@mui/material';
import { War40kUnitsTable } from '../../unitsEditor/UnitsTables';
import { Box } from '@mui/system';
import wh40kLogo from 'src/assets/logo_wh40k8ed.png';
import whAosLogo from 'src/assets/logo_whAos.png';

export const UnitsEditorPage: FC = ({}) => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 70px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* TODO Put it in a reusable component when selection is done */}
      <Grid container justifyContent={'center'} sx={{ mt: 2 }}>
        <Button
          variant={'outlined'}
          sx={{
            p: 1,
            mr: 3,
            border: 'solid 1px',
            cursor: 'pointer',
            backgroundColor: theme => theme.palette.background.paper,
            borderColor: theme => theme.palette.primary.main,
          }}
        >
          <img src={wh40kLogo} height="50" alt="wh40kLogo" />
        </Button>
        <Button sx={{ p: 1, backgroundColor: theme => theme.palette.background.paper }} disabled>
          <img src={whAosLogo} height="50" style={{ filter: 'grayscale(100%)' }} alt="whAos" />
        </Button>
      </Grid>

      <War40kUnitsTable />
    </Box>
  );
};
