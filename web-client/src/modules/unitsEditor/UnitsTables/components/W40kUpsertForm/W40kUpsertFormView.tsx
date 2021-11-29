import React, { FC } from 'react';
import { Fab, Grid, MenuItem, Paper, TextField } from '@mui/material';
import * as yup from 'yup';
import { Box } from '@mui/system';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Save as SaveIcon } from '@mui/icons-material';

import { AddArrayToField } from 'src/shared/components/forms/AddArrayToField';
import { AddTableToField } from 'src/shared/components/forms/AddTableToField';
import { W40KUpsertFormProps } from './types';
import {
  emptyProfile,
  emptyWeapon,
  profileFieldsConfig,
  weaponFieldsConfig,
} from './config/filedsConfig';
import UploadPictureAvatar from 'src/shared/components/forms/UploadPictureAvatar';
import SectionAccordion from 'src/shared/components/forms/SectionAccordion';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Name is required').nullable(),
    version: yup.string(),
    pictures: yup.object({
      main: yup.object({
        url: yup.string().nullable(),
        ref: yup.string().nullable(),
      }),
    }),
    data: yup.object({
      powerRating: yup.number().nullable(),
      commandPoints: yup.number().nullable(),
      weapons: yup.object({
        specialRule: yup.string().nullable(),
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
      }),
      profiles: yup.array(
        yup.object({
          numberMin: yup.number().nullable(),
          numberMax: yup.number().nullable(),
          name: yup.string().nullable(),
          move: yup.string().nullable(),
          weaponSkill: yup.string().nullable(),
          ballisticSkill: yup.string().nullable(),
          strength: yup.string().nullable(),
          toughness: yup.string().nullable(),
          wounds: yup.string().nullable(),
          attacks: yup.string().nullable(),
          leadership: yup.string().nullable(),
          save: yup.string().nullable(),
        }),
      ),
    }),
  })
  .required();

export const W40kUpsertFormView: FC<W40KUpsertFormProps> = ({ onSubmit, w40kUnit }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      pictures: {
        main: {
          url: w40kUnit?.pictures?.main?.url || '',
          ref: w40kUnit?.pictures?.main?.ref || '',
        },
      },
      lang: w40kUnit?.lang || 'fr_FR',
      name: w40kUnit?.name || '',
      version: w40kUnit?.version || 'v9',
      data: {
        battlefieldRole: w40kUnit?.data?.battlefieldRole || 'Troops',
        powerRating: w40kUnit?.data?.powerRating || null,
        commandPoints: w40kUnit?.data?.commandPoints || null,
        detail: w40kUnit?.data?.detail || '',
        description: w40kUnit?.data?.description || '',
        keywords: w40kUnit?.data?.keywords || [],
        factionKeywords: w40kUnit?.data?.factionKeywords || [],
        wargearOptions: w40kUnit?.data?.wargearOptions || [],
        abilities: w40kUnit?.data?.abilities || [],
        weapons: {
          specialRule: w40kUnit?.data?.weapons?.specialRule || null,
          weapons: w40kUnit?.data?.weapons?.weapons || [],
        },
        profiles: w40kUnit?.data?.profiles || [{ ...emptyProfile }],
      },
    },
  });

  return (
    <Paper sx={{ padding: 5, backgroundColor: theme => theme.palette.background.default }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionAccordion title={'Unit information'} defaultExpanded>
          <>
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
                  name="data.battlefieldRole"
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
                  name="data.powerRating"
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
                  name="data.commandPoints"
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
                  name="data.detail"
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
                <UploadPictureAvatar
                  setUrlValue={value => setValue('pictures.main.url', value)}
                  setRefValue={value => setValue('pictures.main.ref', value)}
                  urlValue={w40kUnit?.pictures?.main?.url}
                  refValue={w40kUnit?.pictures?.main?.ref}
                  storageNameRef={'/w40k/units/images/'}
                />
              </Grid>
              <Grid container direction="column">
                <Controller
                  name="version"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      margin={'dense'}
                      label="Version"
                      variant="standard"
                      {...field}
                    >
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
                  name="data.description"
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
          </>
        </SectionAccordion>

        <SectionAccordion title={'profiles'}>
          <AddTableToField
            fieldName={'data.profiles'}
            control={control}
            emptyFieldValues={{ ...emptyProfile }}
            fieldsConfig={profileFieldsConfig}
          />
        </SectionAccordion>
        {/*<SectionAccordion title={'Weapons'}>*/}
        {/*  <AddTableToField*/}
        {/*    fieldName={'weapons'}*/}
        {/*    control={control}*/}
        {/*    emptyFieldValues={{ ...emptyWeapon }}*/}
        {/*    fieldsConfig={weaponFieldsConfig}*/}
        {/*  />*/}
        {/*</SectionAccordion>*/}

        <SectionAccordion title={'Wargear options'}>
          <AddArrayToField control={control} fieldName={'data.wargearOptions'} label={'Option'} />
        </SectionAccordion>
        <SectionAccordion title={'Abilities'}>
          <AddArrayToField
            control={control}
            fieldName={'data.abilities'}
            subFieldNames={{ subfield1: 'name', subfield2: 'rule' }}
            label={'Name'}
            label2={'Rule'}
          />
        </SectionAccordion>
        <SectionAccordion title={'Keywords'}>
          <Grid container direction={'row'} justifyContent={'space-between'} spacing={2}>
            <Grid item xs={6}>
              <AddArrayToField
                control={control}
                fieldName={'data.factionKeywords'}
                label={'Faction keyword'}
                display={'chip'}
              />
            </Grid>
            <Grid item xs={6}>
              <AddArrayToField
                control={control}
                fieldName={'keywords'}
                label={'Keyword'}
                display={'chip'}
              />
            </Grid>
          </Grid>
        </SectionAccordion>

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
      </form>
    </Paper>
  );
};
