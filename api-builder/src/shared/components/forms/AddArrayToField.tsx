import React, { FC } from 'react';

import { Add, Remove } from '@mui/icons-material';
import { Button, Chip, Grid, Stack, TextField } from '@mui/material';

import { Box } from '@mui/system';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
type Props = {
  control: any;
  fieldName: string;
  label: string;
  label2?: string;
  display?: 'chip' | 'text';
  subFieldNames?: { subfield1: string; subfield2: string };
};

// TODO this component need to be optimised or remake into 2 components
export const AddArrayToField: FC<Props> = ({
  control,
  fieldName,
  label,
  display,
  label2,
  subFieldNames,
}) => {
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
        <Button
          sx={{ height: '30px', mr: 2 }}
          onClick={handleSubmit(handleAdd)}
          color={'primary'}
          variant={'contained'}
          aria-label="handleAdd"
        >
          <Add fontSize={'small'} />
        </Button>
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
      </Box>
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        {display === 'chip' ? (
          <>
            {fields.map((values: any, index) => (
              <Chip
                color={'primary'}
                key={uuidv4()}
                label={
                  subFieldNames
                    ? `${values[subFieldNames.subfield1]} : ${values[subFieldNames.subfield2]} `
                    : values.name
                }
                variant={'outlined'}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </>
        ) : (
          <Grid>
            {fields.map((values: any, index) => (
              <div key={uuidv4()} style={{ listStyleType: 'none' }}>
                <Button
                  sx={{ height: '30px', mr: 2, mt: 2 }}
                  onClick={() => handleDelete(index)}
                  color={'warning'}
                  variant={'contained'}
                  aria-label="remove"
                >
                  <Remove fontSize={'small'} />
                </Button>
                {subFieldNames && (
                  <span style={{ fontWeight: 'bold' }}>{values[subFieldNames.subfield1]} :</span>
                )}
                <span>{subFieldNames ? values[subFieldNames.subfield2] : values.name}</span>
              </div>
            ))}
          </Grid>
        )}
      </Stack>
    </Box>
  );
};
