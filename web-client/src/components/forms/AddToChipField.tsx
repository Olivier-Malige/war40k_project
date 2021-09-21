import React, { FC, useState } from 'react';
import { Add } from '@mui/icons-material';
import { Button, Chip, Stack, TextField } from '@mui/material';
import { FieldArray, FieldArrayRenderProps, FormikContextType, FormikProvider } from 'formik';
import { Box } from '@mui/system';

type Props = {
  formik: FormikContextType<any>;
  fieldName: string;
  label: string;
};
export const AddToChipField: FC<Props> = ({ formik, fieldName, label }) => {
  const [fieldValue, setFieldValue] = useState('');

  const handleChange = value => {
    setFieldValue(value.target.value);
  };
  const handleAdd = (arrayHelper: FieldArrayRenderProps) => {
    if (fieldValue) {
      arrayHelper.push(fieldValue);
      setFieldValue('');
    }
  };
  const handleDelete = (arrayHelper: FieldArrayRenderProps, index: number) => {
    arrayHelper.remove(index);
  };

  return (
    <div>
      <FormikProvider value={formik}>
        <FieldArray
          name={fieldName}
          render={arrayHelper => (
            <>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button
                  onClick={() => handleAdd(arrayHelper)}
                  color={'primary'}
                  variant={'outlined'}
                  aria-label="add"
                >
                  <Add fontSize={'small'} />
                </Button>
                <TextField
                  value={fieldValue}
                  onChange={handleChange}
                  sx={{ ml: 5, width: '100%' }}
                  name={'keywords'}
                  margin={'dense'}
                  label={label}
                  variant="standard"
                />
              </Box>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {formik.values[fieldName].map((value, index) => (
                  <Chip
                    key={new Date() + value + index}
                    label={value}
                    variant={'filled'}
                    onDelete={() => handleDelete(arrayHelper, index)}
                  />
                ))}
              </Stack>
            </>
          )}
        />
      </FormikProvider>
    </div>
  );
};
