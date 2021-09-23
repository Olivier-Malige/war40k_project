import React, { FC, memo } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { FieldArray } from 'formik';
import { Add, Remove } from '@mui/icons-material';
import { FieldConfig, W40KProfile, W40KWeapon } from '../types';

type Props = {
  formikFieldValues: Array<any>;
  formikHandleChange: any;
  fieldName: string;
  title: string;
  fieldsConfig: FieldConfig[];
  emptyFieldValues: W40KProfile | W40KWeapon;
};

// eslint-disable-next-line react/display-name
export const AddArrayField: FC<Props> = memo(
  ({ title, formikFieldValues, fieldName, fieldsConfig, emptyFieldValues, formikHandleChange }) => {
    console.log('addArrayField refresh');
    return (
      <div>
        <Typography sx={{ mt: 5 }} variant={'h6'}>
          {title}
        </Typography>
        <FieldArray
          name={fieldName}
          render={arrayHelper => (
            <>
              {formikFieldValues.map((values, index) => (
                <>
                  {fieldsConfig.map(profile => (
                    <>
                      <TextField
                        value={formikFieldValues[index][profile.name]}
                        onChange={formikHandleChange}
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
              {formikFieldValues.length > 1 && (
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
      </div>
    );
  },
);
