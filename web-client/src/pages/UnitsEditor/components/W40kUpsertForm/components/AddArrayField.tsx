import React, { FC } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { FieldArray, FormikContextType, FormikProvider } from 'formik';
import { Add, Remove } from '@mui/icons-material';
import { FieldConfig, W40KProfile, W40KWeapon } from '../types';

type Props = {
  formik: FormikContextType<any>;
  fieldName: string;
  title: string;
  fieldsConfig: FieldConfig[];
  emptyFieldValues: W40KProfile | W40KWeapon;
};

export const AddArrayField: FC<Props> = ({
  title,
  formik,
  fieldName,
  fieldsConfig,
  emptyFieldValues,
}) => {
  return (
    <div>
      <Typography sx={{ mt: 5 }} variant={'h6'}>
        {title}
      </Typography>
      <FormikProvider value={formik}>
        <FieldArray
          name={fieldName}
          render={arrayHelper => (
            <>
              {formik.values[fieldName].map((values, index) => (
                <>
                  {fieldsConfig.map(profile => (
                    <>
                      <TextField
                        value={formik.values[fieldName][index][profile.name]}
                        onChange={formik.handleChange}
                        sx={{ width: profile.width, mr: 1 }}
                        name={`${fieldName}.${index}[${profile.name}]`}
                        margin={'normal'}
                        type={profile.type}
                        label={profile.label}
                        variant="standard"
                      />
                    </>
                  ))}
                </>
              ))}
              <Button
                sx={{ height: '30px' }}
                onClick={() => arrayHelper.push(emptyFieldValues)}
                color={'primary'}
                variant={'outlined'}
                aria-label="add"
              >
                <Add fontSize={'small'} />
              </Button>
              {formik.values[fieldName].length > 1 && (
                <Button
                  sx={{ height: '30px', ml: 2 }}
                  onClick={() => arrayHelper.pop()}
                  color={'warning'}
                  variant={'outlined'}
                  aria-label="remove"
                >
                  <Remove fontSize={'small'} />
                </Button>
              )}
            </>
          )}
        />
      </FormikProvider>
    </div>
  );
};
