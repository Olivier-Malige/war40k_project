import React, { FC } from 'react';
import { Avatar, Fab, Grid, MenuItem, TextField } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/system';
import { Save as SaveIcon, AddAPhoto as AddAPhotoIcon } from '@mui/icons-material';

import { AddToField } from 'src/components/forms/AddToField';

import { W40KUpsertFormProps } from './types';
import { emptyProfile, emptyWeapon, profileFieldsConfig, weaponFieldsConfig } from './filedsConfig';
import { AddArrayField } from './components/AddArrayField';

const validationSchema = yup.object({
  name: yup.string().required('Name is required').nullable(),
  powerRating: yup.number().required('Power is required').nullable(),
});

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
      wargearOptions: data?.wargearOptions || [],
      abilities: data?.abilities || [],
      weapons: data?.weapons || [],
      profiles: data?.profiles || [{ ...emptyProfile }],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  console.log('form refresh');
  return (
    <Box sx={{ padding: 5 }}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', mt: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            <Grid container direction="column" alignContent={'center'} sx={{ mr: 3 }}>
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
              <AddArrayField
                fieldName={'profiles'}
                title={'Profiles'}
                formikFieldValues={formik.values.profiles}
                formikHandleChange={formik.handleChange}
                emptyFieldValues={{ ...emptyProfile }}
                fieldsConfig={profileFieldsConfig}
              />
              <AddArrayField
                fieldName={'weapons'}
                title={'Weapons'}
                formikFieldValues={formik.values.weapons}
                formikHandleChange={formik.handleChange}
                emptyFieldValues={{ ...emptyWeapon }}
                fieldsConfig={weaponFieldsConfig}
              />
              <AddToField
                title={'Wargear options'}
                formikFieldValues={formik.values.wargearOptions}
                fieldName={'wargearOptions'}
                label={'Option'}
              />
              <AddToField
                title={'Abilities'}
                formikFieldValues={formik.values.abilities}
                fieldName={'abilities'}
                subFieldNames={{ subfield1: 'name', subfield2: 'rule' }}
                label={'Name'}
                label2={'Rule'}
              />

              <AddToField
                title={'Faction keywords'}
                formikFieldValues={formik.values.factionKeywords}
                fieldName={'factionKeywords'}
                label={'Keyword name'}
                display={'chip'}
              />
              <AddToField
                title={'Keywords'}
                formikFieldValues={formik.values.keywords}
                fieldName={'keywords'}
                label={'Keyword name'}
                display={'chip'}
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
              aria-label="save"
              sx={{
                position: 'fixed',
                padding: 3,
                bottom: '50px',
                right: '50px',
              }}
            >
              <SaveIcon fontSize={'large'} />
            </Fab>
          </Grid>
        </form>
      </FormikProvider>
    </Box>
  );
};
