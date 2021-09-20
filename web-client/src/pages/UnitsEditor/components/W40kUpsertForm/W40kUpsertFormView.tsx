import React, { FC } from 'react';
import { Avatar, Container, Fab, Grid, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/system';
import { Save as SaveIcon, AddAPhoto as AddAPhotoIcon } from '@mui/icons-material';

const validationSchema = yup.object({
  name: yup.string().required('Name is required').nullable(),
  powerRating: yup.number().required('Power is required').nullable(),
});

type W40KUnit = {
  lang: string;
  name: string;
  powerRating: number;
  commandPoints: number;
  version: string;
  detail: string;
  description: string;
  keywords: string;
  factionKeywords: string;
};

export type W40KUpsertFormProps = {
  onSubmit: (values: W40KUnit) => void;
  data?: W40KUnit;
};

export const W40kUpsertFormView: FC<W40KUpsertFormProps> = ({ onSubmit, data }) => {
  const formik = useFormik({
    initialValues: {
      lang: data?.lang || 'fr_FR',
      name: data?.name || null,
      powerRating: data?.powerRating || null,
      commandPoints: data?.commandPoints || null,
      version: data?.version || 'v9',
      detail: data?.detail || null,
      description: data?.description || null,
      keywords: data?.keywords || null,
      factionKeywords: data?.factionKeywords || null,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  return (
    <Box sx={{ padding: 5 }}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex' }}>
          <Grid container direction="column" alignContent={'center'} sx={{ mr: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                sx={{ width: '50px' }}
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
              <TextField
                select
                label={'Lang'}
                margin={'dense'}
                name="lang"
                value={formik.values.lang}
                onChange={formik.handleChange}
                color={'secondary'}
                variant="standard"
              >
                <MenuItem value={'fr_FR'}>French</MenuItem>
                <MenuItem value={'en_GB'}>English</MenuItem>
              </TextField>
            </Box>
            <hr />
            <Avatar
              sx={{ width: 300, height: 300, bgcolor: theme => theme.palette.background.default }}
            >
              <AddAPhotoIcon
                fontSize={'inherit'}
                sx={{ color: theme => theme.palette.secondary.main, transform: 'scale(6)' }}
              />
            </Avatar>
            <hr />
            <TextField
              value={formik.values.description}
              name={'description'}
              onChange={formik.handleChange}
              color={'secondary'}
              margin={'dense'}
              label="Description"
              multiline
              rows={6}
              variant="standard"
            />
          </Grid>
          <Grid container direction="column">
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
            <Grid container spacing={1}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
          </Grid>
        </Box>
        <Grid
          sx={{
            marginTop: theme => theme.spacing(3),
          }}
          container
          justifyContent={'center'}
        >
          <Fab
            onClick={formik.submitForm}
            color="secondary"
            size={'large'}
            aria-label="add"
            sx={{
              position: 'absolute',
              padding: 3,
              top: '90%',
              left: '95%',
            }}
          >
            <SaveIcon fontSize={'large'} />
          </Fab>
        </Grid>
      </form>
    </Box>
  );
};
