import React, { FC } from 'react';
import { Avatar, Fab, Grid, MenuItem, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/system';
import { Save as SaveIcon, AddAPhoto as AddAPhotoIcon } from '@mui/icons-material';

import { AddToChipField } from 'src/components/forms/AddToChipField';

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
  keywords: string[];
  factionKeywords: string[];
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
      keywords: data?.keywords || [],
      factionKeywords: data?.factionKeywords || [],
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
              margin={'dense'}
              label="Name"
              variant="standard"
            />
            <Grid container direction={'row'}>
              <TextField
                sx={{ mr: 2 }}
                value={formik.values.powerRating}
                name={'powerRating'}
                onChange={formik.handleChange}
                error={formik.touched.powerRating && Boolean(formik.errors.powerRating)}
                helperText={formik.touched.powerRating && formik.errors.powerRating}
                margin={'dense'}
                label="Power rating"
                variant="standard"
                type="number"
              />
              <TextField
                value={formik.values.commandPoints}
                name={'commandPoints'}
                onChange={formik.handleChange}
                margin={'dense'}
                type={'number'}
                label="Command points"
                variant="standard"
              />
            </Grid>

            <TextField
              value={formik.values.detail}
              name={'detail'}
              onChange={formik.handleChange}
              margin={'dense'}
              label="Detail"
              variant="standard"
            />
            <AddToChipField
              formik={formik}
              fieldName={'factionKeywords'}
              label={'Faction keywords'}
            />
            <AddToChipField formik={formik} fieldName={'keywords'} label={'Keywords'} />
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
            aria-label="save"
            sx={{
              position: 'absolute',
              padding: 3,
              bottom: '50px',
              right: '50px',
            }}
          >
            <SaveIcon fontSize={'large'} />
          </Fab>
        </Grid>
      </form>
    </Box>
  );
};
