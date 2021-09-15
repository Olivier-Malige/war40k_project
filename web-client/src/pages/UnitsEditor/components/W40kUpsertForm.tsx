import React from 'react';
import { Button, Grid, MenuItem, Select, TextField, Theme } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

export const W40KUpsertForm = () => {
  const classes = useStyles();
  return (
    <form>
      <Grid container direction="column" alignItems="stretch">
        <Select
          margin={'dense'}
          color={'secondary'}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
        >
          <MenuItem value={'fr_FR'}>French</MenuItem>
          <MenuItem value={'en_GB'}>English</MenuItem>
        </Select>
        <TextField color={'secondary'} margin={'dense'} label="Name" variant="standard" />
        <Grid container justifyContent={'space-between'} spacing={2}>
          <Grid item xs={3}>
            <TextField
              color={'secondary'}
              margin={'dense'}
              label="Power rating"
              variant="standard"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              color={'secondary'}
              margin={'dense'}
              type={'number'}
              label="Command points"
              variant="standard"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField color={'secondary'} margin={'dense'} label="Version" variant="standard" />
          </Grid>
        </Grid>

        <TextField color={'secondary'} margin={'dense'} label="Detail" variant="standard" />
        <TextField color={'secondary'} margin={'dense'} label="Description" variant="standard" />
        <TextField color={'secondary'} margin={'dense'} label="Keywords" variant="standard" />
        <TextField
          color={'secondary'}
          margin={'dense'}
          label="Factions keywords"
          variant="standard"
        />
        <Button className={classes.button} variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(3),
  },
}));
