import React, { FC } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { FieldConfig } from '../../../modules/unitsEditor/UnitsTables/components/W40kUpsertForm/types';
import { useFieldArray, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  control: any;
  fieldName: string;
  fieldsConfig: FieldConfig[];
  emptyFieldValues: unknown;
  commonFiledConfig?: FieldConfig[];
  subFieldName?: string;
};

export const AddTableToField: FC<Props> = ({
  control,
  fieldName,
  subFieldName = null,
  fieldsConfig,
  emptyFieldValues,
  commonFiledConfig = [],
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: subFieldName ? `${fieldName}.${subFieldName}` : fieldName,
  });
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        {commonFiledConfig.map(fieldConfig => (
          <Controller
            key={uuidv4()}
            name={`${fieldName}.${fieldConfig.name}`}
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
        ))}
      </Box>

      {fields.map((values, index) => (
        <Stack key={uuidv4()} spacing={2}>
          <Box sx={{ display: 'flex' }}>
            {fieldsConfig.map(fieldConfig => (
              <Controller
                key={uuidv4()}
                name={
                  subFieldName
                    ? `${fieldName}.${subFieldName}.${index}[${fieldConfig.name}]`
                    : `${fieldName}.${index}[${fieldConfig.name}]`
                }
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
            ))}
          </Box>
        </Stack>
      ))}

      <Button
        sx={{ height: '30px' }}
        onClick={() => append(emptyFieldValues)}
        color={'primary'}
        variant={'contained'}
        aria-label="add"
      >
        <Add fontSize={'small'} />
      </Button>
      {fields.length > 1 && (
        <Button
          sx={{ height: '30px', ml: 2 }}
          onClick={() => remove(fields.length - 1)}
          color={'warning'}
          variant={'contained'}
          aria-label="remove"
        >
          <Remove fontSize={'small'} />
        </Button>
      )}
    </div>
  );
};
