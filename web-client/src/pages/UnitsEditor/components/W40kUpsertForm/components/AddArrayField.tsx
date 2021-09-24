import React, { FC, memo } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { FieldConfig, W40KProfile, W40KWeapon } from '../types';
import { useFieldArray, Controller } from 'react-hook-form';

type Props = {
  control: any;
  fieldName: string;
  title: string;
  fieldsConfig: FieldConfig[];
  emptyFieldValues: W40KProfile | W40KWeapon;
};

// eslint-disable-next-line react/display-name
export const AddArrayField: FC<Props> = memo(
  ({ title, control, fieldName, fieldsConfig, emptyFieldValues }) => {
    console.log('addArrayField refresh' + title);
    const { fields, append, remove } = useFieldArray({
      control,
      name: fieldName,
    });
    return (
      <div>
        <Typography sx={{ mt: 5 }} variant={'h6'}>
          {title}
        </Typography>
        {fields.map((values, index) => (
          <>
            {fieldsConfig.map(fieldConfig => (
              <>
                <Controller
                  name={`${fieldName}.${index}[${fieldConfig.name}]`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      sx={{ width: fieldConfig.width, mr: 1 }}
                      margin={'normal'}
                      type={fieldConfig.type}
                      label={fieldConfig.label}
                      variant="standard"
                      {...field}
                    />
                  )}
                />
              </>
            ))}
          </>
        ))}
        <Button
          sx={{ height: '30px' }}
          onClick={() => append(emptyFieldValues)}
          color={'primary'}
          variant={'outlined'}
          aria-label="add"
        >
          <Add fontSize={'small'} />
        </Button>
        {fields.length > 1 && (
          <Button
            sx={{ height: '30px', ml: 2 }}
            onClick={() => remove(fields.length - 1)}
            color={'warning'}
            variant={'outlined'}
            aria-label="remove"
          >
            <Remove fontSize={'small'} />
          </Button>
        )}
      </div>
    );
  },
);
