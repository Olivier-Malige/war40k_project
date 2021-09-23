import React, { FC, useState, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Add, DeleteForever } from '@mui/icons-material';
import { Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { FieldArray, FieldArrayRenderProps } from 'formik';
import { Box } from '@mui/system';

type Props = {
  fieldName: string;
  formikFieldValues: Array<any>;
  label: string;
  label2?: string;
  display?: 'chip' | 'li';
  subFieldNames?: { subfield1: string; subfield2: string };
  title?: string;
};
// eslint-disable-next-line react/display-name
export const AddToField: FC<Props> = memo(
  ({ fieldName, formikFieldValues, label, display, label2, subFieldNames, title }) => {
    const [fieldValue, setFieldValue] = useState('');
    const [field2Value, setField2Value] = useState('');
    console.log('AddToField Refresh' + title);
    const handleAdd = (arrayHelper: FieldArrayRenderProps) => {
      if (
        subFieldNames?.subfield1 &&
        subFieldNames?.subfield2 &&
        fieldValue.length > 0 &&
        field2Value.length > 0
      ) {
        arrayHelper.push({
          [subFieldNames.subfield1]: fieldValue,
          [subFieldNames.subfield2]: field2Value,
        });
        setFieldValue('');
        setField2Value('');
      } else if (fieldValue.length > 0 && !subFieldNames) {
        arrayHelper.push(fieldValue);
        setFieldValue('');
      }
    };
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
        <FieldArray
          name={fieldName}
          render={arrayHelper => (
            <>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  value={fieldValue}
                  onChange={value => setFieldValue(value.target.value)}
                  sx={{ width: '100%' }}
                  name={'keywords'}
                  margin={'dense'}
                  label={label}
                  multiline
                  variant="standard"
                />
                {subFieldNames?.subfield2 && (
                  <TextField
                    value={field2Value}
                    onChange={value => setField2Value(value.target.value)}
                    sx={{ ml: 2, width: '100%' }}
                    name={'keywords'}
                    margin={'dense'}
                    label={label2}
                    multiline
                    variant="standard"
                  />
                )}
              </Box>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button
                  sx={{ height: '30px' }}
                  onClick={() => handleAdd(arrayHelper)}
                  color={'primary'}
                  variant={'outlined'}
                  aria-label="add"
                >
                  <Add fontSize={'small'} />
                </Button>
                {display === 'chip' ? (
                  <>
                    {formikFieldValues.map((value, index) => (
                      <Chip
                        color={'primary'}
                        key={uuidv4()}
                        label={
                          subFieldNames
                            ? `${value[subFieldNames.subfield1]} : ${
                                value[subFieldNames.subfield2]
                              } `
                            : value
                        }
                        variant={'filled'}
                        onDelete={() => handleDelete(arrayHelper, index)}
                      />
                    ))}
                  </>
                ) : (
                  <ul>
                    {formikFieldValues.map((value, index) => (
                      <li key={uuidv4()} style={{ listStyleType: 'none' }}>
                        <Button onClick={() => handleDelete(arrayHelper, index)} sx={{ mr: 1 }}>
                          <DeleteForever color={'warning'} />
                        </Button>
                        {subFieldNames && (
                          <span style={{ fontWeight: 'bold' }}>
                            {value[subFieldNames.subfield1]} :
                          </span>
                        )}
                        <span>{subFieldNames ? value[subFieldNames.subfield2] : value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Stack>
            </>
          )}
        />
      </div>
    );
  },
);
