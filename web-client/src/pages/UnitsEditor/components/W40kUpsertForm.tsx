import React, { FC } from 'react';
import { Button, Container, Grid, MenuItem, TextField, Theme } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/styles';

const validationSchema = yup.object({
  name: yup.string().required('Name is required').nullable(),
  powerRating: yup.number().required('Power is required').nullable(),
});

type Props = {
  onSubmit: (values: any) => void;
};

export const W40KUpsertForm: FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      lang: 'fr_FR',
      name: null,
      powerRating: null,
      commandPoints: null,
      version: 'v9',
      detail: null,
      description: null,
      keywords: null,
      factionKeywords: null,
      battlefieldRole: 'Troops',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container direction="column">
          <TextField
            select
            label={'Lang'}
            margin={'dense'}
            name="lang"
            value={formik.values.lang}
            onChange={formik.handleChange}
            color={'secondary'}
          >
            <MenuItem value={'fr_FR'}>French</MenuItem>
            <MenuItem value={'en_GB'}>English</MenuItem>
          </TextField>
          <TextField
            value={formik.values.name}
            name={'name'}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            color={'secondary'}
            margin={'dense'}
            label="Name"
            variant="standard"
          />
          <Grid container justifyContent={'space-between'} spacing={2}>
            <Grid item xs={4}>
              <TextField
                value={formik.values.powerRating}
                name={'powerRating'}
                onChange={formik.handleChange}
                error={formik.touched.powerRating && Boolean(formik.errors.powerRating)}
                helperText={formik.touched.powerRating && formik.errors.powerRating}
                color={'secondary'}
                margin={'dense'}
                label="Power rating"
                variant="standard"
                type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={formik.values.commandPoints}
                name={'commandPoints'}
                onChange={formik.handleChange}
                color={'secondary'}
                margin={'dense'}
                type={'number'}
                label="Command points"
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                value={formik.values.version}
                name={'version'}
                onChange={formik.handleChange}
                color={'secondary'}
                margin={'dense'}
                label="Version"
                variant="standard"
              >
                <MenuItem value={'v8'}>v8</MenuItem>
                <MenuItem value={'v9'}>v9</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <TextField
            value={formik.values.detail}
            name={'detail'}
            onChange={formik.handleChange}
            color={'secondary'}
            margin={'dense'}
            label="Detail"
            variant="standard"
          />
          <TextField
            value={formik.values.description}
            name={'description'}
            onChange={formik.handleChange}
            color={'secondary'}
            margin={'dense'}
            label="Description"
            multiline
            variant="standard"
          />
          <TextField
            value={formik.values.keywords}
            name={'keywords'}
            onChange={formik.handleChange}
            color={'secondary'}
            margin={'dense'}
            label="Keywords"
            variant="standard"
          />
          <TextField
            value={formik.values.factionKeywords}
            name={'factionKeywords'}
            onChange={formik.handleChange}
            color={'secondary'}
            margin={'dense'}
            label="Faction keywords"
            variant="standard"
          />
          <Button
            type={'submit'}
            color={'secondary'}
            className={classes.button}
            variant="contained"
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(3),
  },
}));
