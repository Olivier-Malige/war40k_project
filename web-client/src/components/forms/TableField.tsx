import React, { FC, useState } from 'react';
import { Add, DeleteForever } from '@mui/icons-material';
import { Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { FieldArray, FieldArrayRenderProps, FormikContextType, FormikProvider } from 'formik';
import { Box } from '@mui/system';

type Props = {
  formik: FormikContextType<any>;
  fieldName: string;
  title?: string;
};
export const TableField: FC<Props> = ({ formik, fieldName, title }) => {
  const handleAdd = (arrayHelper: FieldArrayRenderProps) => null;
  const handleDelete = (arrayHelper: FieldArrayRenderProps, index: number) => {
    arrayHelper.remove(index);
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
      <FormikProvider value={formik}>
        <FieldArray name={fieldName} render={arrayHelper => <> toto </>} />
      </FormikProvider>
    </div>
  );
};
