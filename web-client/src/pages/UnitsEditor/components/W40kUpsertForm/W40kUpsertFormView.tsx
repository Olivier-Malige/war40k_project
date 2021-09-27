import React, { FC } from 'react';
import { Avatar, Fab, Grid, MenuItem, TextField, Paper } from '@mui/material';
import * as yup from 'yup';
import { Box } from '@mui/system';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Save as SaveIcon, AddAPhoto as AddAPhotoIcon } from '@mui/icons-material';

import { AddToField } from 'src/components/forms/AddToField';
import { W40KUpsertFormProps } from './types';
import { emptyProfile, emptyWeapon, profileFieldsConfig, weaponFieldsConfig } from './filedsConfig';
import { AddArrayField } from './components/AddArrayField';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Name is required').nullable(),
    powerRating: yup.number().required('Power is required').nullable(),
    commandPoints: yup.number().nullable(),
    weapons: yup.array(
      yup.object({
        name: yup.string().nullable(),
        abilities: yup.string().nullable(),
        type: yup.string().nullable(),
        damage: yup.number().nullable(),
        strength: yup.number().nullable(),
        range: yup.number().nullable(),
        armourPenetration: yup.number().nullable(),
      }),
    ),
    profiles: yup.array(
      yup.object({
        numberMin: yup.number().nullable(),
        numberMax: yup.number().nullable(),
        name: yup.string().nullable(),
        move: yup.number().nullable(),
        weaponSkill: yup.number().nullable(),
        ballisticSkill: yup.number().nullable(),
        strength: yup.number().nullable(),
        toughness: yup.number().nullable(),
        wounds: yup.number().nullable(),
        attacks: yup.number().nullable(),
        leadership: yup.number().nullable(),
        save: yup.number().nullable(),
      }),
    ),
  })
  .required();

export const W40kUpsertFormView: FC<W40KUpsertFormProps> = ({ onSubmit, data }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      lang: data?.lang || 'fr_FR',
      name: data?.name || null,
      battlefieldRole: data?.battlefieldRole || null,
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
  });

  console.log('form refresh');

  return (
    <Paper sx={{ padding: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              margin={'dense'}
              label="Name"
              sx={{ width: '100%' }}
              variant="standard"
              {...field}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          )}
        />
        <Box sx={{ display: 'flex', mt: 5 }}>
          <Grid container direction="column">
            <Controller
              name="battlefieldRole"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label={'Battlefield role'}
                  margin={'dense'}
                  variant="standard"
                  {...field}
                >
                  <MenuItem value={'HQs'}>HQs</MenuItem>
                  <MenuItem value={'Troops'}>Troops</MenuItem>
                  <MenuItem value={'Elites'}>Elites</MenuItem>
                  <MenuItem value={'Flyers'}>Flyers</MenuItem>
                  <MenuItem value={'FastAttacks'}>Fast attacks</MenuItem>
                  <MenuItem value={'HeavySupports'}>Heavy supports</MenuItem>
                  <MenuItem value={'DedicatedTransports'}>Dedicated transports</MenuItem>
                  <MenuItem value={'LordOfWars'}>Lord of wars</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="powerRating"
              control={control}
              render={({ field }) => (
                <TextField
                  margin={'dense'}
                  label="Power rating"
                  variant="standard"
                  type="number"
                  error={Boolean(errors.powerRating)}
                  helperText={errors.powerRating?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="commandPoints"
              control={control}
              render={({ field }) => (
                <TextField
                  name={'commandPoints'}
                  margin={'dense'}
                  type={'number'}
                  label="Command points"
                  variant="standard"
                  {...field}
                />
              )}
            />
            <Controller
              name="detail"
              control={control}
              render={({ field }) => (
                <TextField
                  name={'detail'}
                  margin={'dense'}
                  label="Detail"
                  variant="standard"
                  multiline
                  rows={4}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid container direction="column" alignContent={'center'}>
            <Avatar
              sx={{ width: 300, height: 300, bgcolor: theme => theme.palette.background.default }}
            >
              <AddAPhotoIcon
                fontSize={'inherit'}
                sx={{ color: theme => theme.palette.secondary.main, transform: 'scale(6)' }}
              />
            </Avatar>
          </Grid>
          <Grid container direction="column">
            <Controller
              name="version"
              control={control}
              render={({ field }) => (
                <TextField select margin={'dense'} label="Version" variant="standard" {...field}>
                  <MenuItem value={'v8'}>v8</MenuItem>
                  <MenuItem value={'v9'}>v9</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="lang"
              control={control}
              render={({ field }) => (
                <TextField select label={'Lang'} margin={'dense'} variant="standard" {...field}>
                  <MenuItem value={'fr_FR'}>French</MenuItem>
                  <MenuItem value={'en_GB'}>English</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  margin={'dense'}
                  label="Description"
                  multiline
                  rows={7}
                  variant="standard"
                  {...field}
                />
              )}
            />
          </Grid>
        </Box>

        <Grid container direction="column">
          <Box sx={{ display: 'flex', mt: 5 }}>
            <Grid container direction="column">
              <AddArrayField
                fieldName={'profiles'}
                title={'Profiles'}
                control={control}
                emptyFieldValues={{ ...emptyProfile }}
                fieldsConfig={profileFieldsConfig}
              />
              <AddArrayField
                fieldName={'weapons'}
                title={'Weapons'}
                control={control}
                emptyFieldValues={{ ...emptyWeapon }}
                fieldsConfig={weaponFieldsConfig}
              />
            </Grid>

            <Grid container direction="column">
              <AddToField
                control={control}
                title={'Wargear options'}
                fieldName={'wargearOptions'}
                label={'Option'}
              />
              <AddToField
                control={control}
                title={'Abilities'}
                fieldName={'abilities'}
                subFieldNames={{ subfield1: 'name', subfield2: 'rule' }}
                label={'Name'}
                label2={'Rule'}
              />
              <AddToField
                control={control}
                title={'Faction keywords'}
                fieldName={'factionKeywords'}
                label={'Keyword name'}
                display={'chip'}
              />
              <AddToField
                control={control}
                title={'Keywords'}
                fieldName={'keywords'}
                label={'Keyword name'}
                display={'chip'}
              />
            </Grid>
          </Box>
        </Grid>

        <Grid
          sx={{
            marginTop: theme => theme.spacing(3),
          }}
          container
          justifyContent={'center'}
        >
          <Fab
            type={'submit'}
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
    </Paper>
  );
};
