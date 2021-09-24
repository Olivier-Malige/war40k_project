import React, { FC, memo } from 'react';

import { Add, DeleteForever } from '@mui/icons-material';
import { Button, Chip, Stack, TextField, Typography } from '@mui/material';

import { Box } from '@mui/system';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

type Props = {
  control: any;
  fieldName: string;
  label: string;
  label2?: string;
  display?: 'chip' | 'li';
  subFieldNames?: { subfield1: string; subfield2: string };
  title?: string;
};

// TODO this component need to be optimised or remake
// eslint-disable-next-line react/display-name
export const AddToField: FC<Props> = memo(
  ({ control, fieldName, label, display, label2, subFieldNames, title }) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name: fieldName,
    });
    const {
      handleSubmit,
      control: localControl,
      reset,
    } = useForm({
      defaultValues: {
        field1: '',
        field2: '',
      },
    });

    console.log('AddToField Refresh' + title);
    console.log(fields);
    const handleAdd = data => {
      if (
        subFieldNames?.subfield1 &&
        subFieldNames?.subfield2 &&
        data.field1.length > 0 &&
        data.field2.length > 0
      ) {
        append({
          [subFieldNames.subfield1]: data.field1,
          [subFieldNames.subfield2]: data.field2,
        });
        reset();
      } else if (data.field1.length > 0 && !subFieldNames) {
        append({ name: data.field1 });
        reset();
      }
    };
    const handleDelete = (index: number) => {
      remove(index);
    };

    return (
      <div>
        {title && (
          <Typography
            sx={{
              mt: 5,
            }}
            variant={'h6'}
          >
            {title}
          </Typography>
        )}

        <Box sx={{ display: 'flex' }}>
          <Controller
            name="field1"
            control={localControl}
            render={({ field }) => (
              <TextField
                sx={{ width: '100%' }}
                margin={'dense'}
                label={label}
                multiline
                variant="standard"
                {...field}
              />
            )}
          />

          {subFieldNames?.subfield2 && (
            <Controller
              name="field2"
              control={localControl}
              render={({ field }) => (
                <TextField
                  sx={{ ml: 2, width: '100%' }}
                  margin={'dense'}
                  label={label2}
                  multiline
                  variant="standard"
                  {...field}
                />
              )}
            />
          )}
          <Button
            sx={{ height: '30px' }}
            onClick={handleSubmit(handleAdd)}
            color={'primary'}
            variant={'outlined'}
            aria-label="handleAdd"
          >
            <Add fontSize={'small'} />
          </Button>
        </Box>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          {display === 'chip' ? (
            <>
              {fields.map((values: any, index) => (
                <>
                  <Chip
                    color={'primary'}
                    key={values.id}
                    label={
                      subFieldNames
                        ? `${values[subFieldNames.subfield1]} : ${values[subFieldNames.subfield2]} `
                        : values.name
                    }
                    variant={'filled'}
                    onDelete={() => handleDelete(index)}
                  />
                </>
              ))}
            </>
          ) : (
            <ul>
              {fields.map((values: any, index) => (
                <li key={values.id} style={{ listStyleType: 'none' }}>
                  <Button onClick={() => handleDelete(index)} sx={{ mr: 1 }}>
                    <DeleteForever color={'warning'} />
                  </Button>
                  {subFieldNames && (
                    <span style={{ fontWeight: 'bold' }}>{values[subFieldNames.subfield1]} :</span>
                  )}
                  <span>{subFieldNames ? values[subFieldNames.subfield2] : values.name}</span>
                </li>
              ))}
            </ul>
          )}
        </Stack>
      </div>
    );
  },
);
