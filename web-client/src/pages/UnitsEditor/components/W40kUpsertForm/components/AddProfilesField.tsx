import React, { FC, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { FieldArray, FormikContextType, FormikProvider } from 'formik';
import { Add, Remove } from '@mui/icons-material';
type Props = {
  formik: FormikContextType<any>;
  fieldName: string;
  title: string;
};

type Field = {
  name: string;
  type: 'number' | 'text';
  label: string;
  width?: number;
  value: number | string | null;
};

const profileFields: Field[] = [
  {
    name: 'numberMin',
    type: 'number',
    label: 'Min',
    width: 70,
    value: null,
  },
  {
    name: 'numberMax',
    type: 'number',
    label: 'Max',
    width: 70,
    value: null,
  },
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    width: 170,
    value: null,
  },
  {
    name: 'm',
    type: 'number',
    label: 'M',
    width: 50,
    value: null,
  },
  {
    name: 'ws',
    type: 'number',
    label: 'WS',
    width: 50,
    value: null,
  },
  {
    name: 'bs',
    type: 'number',
    label: 'BS',
    width: 50,
    value: null,
  },
  {
    name: 's',
    type: 'number',
    label: 'S',
    width: 50,
    value: null,
  },
  {
    name: 't',
    type: 'number',
    label: 'T',
    width: 50,
    value: null,
  },
  {
    name: 'w',
    type: 'number',
    label: 'W',
    width: 50,
    value: null,
  },
  {
    name: 'a',
    type: 'number',
    label: 'A',
    width: 50,
    value: null,
  },
  {
    name: 'ld',
    type: 'number',
    label: 'Ld',
    width: 50,
    value: null,
  },
  {
    name: 'sv',
    type: 'number',
    label: 'Sv',
    width: 50,
    value: null,
  },
];

export const AddProfilesField: FC<Props> = ({ title, formik, fieldName }) => {
  const [profiles, setProfiles] = useState<Field[][]>([JSON.parse(JSON.stringify(profileFields))]);

  return (
    <div>
      <Typography
        sx={{
          mt: 5,
        }}
        variant={'h6'}
      >
        {title}
      </Typography>
      <FormikProvider value={formik}>
        <FieldArray
          name={fieldName}
          render={arrayHelper => (
            <>
              {profiles.map((profile, profileIndex) => (
                <>
                  {profile.map((field, fieldIndex) => (
                    <TextField
                      value={field.value}
                      onChange={value =>
                        setProfiles(oldValue => {
                          oldValue[profileIndex][fieldIndex].value = value.target.value;
                          return [...oldValue];
                        })
                      }
                      key={field.name}
                      sx={{ width: field.width, mr: 1 }}
                      name={field.name}
                      margin={'normal'}
                      type={field.type}
                      label={field.label}
                      variant="standard"
                    />
                  ))}
                </>
              ))}
            </>
          )}
        />
      </FormikProvider>
      <Button
        sx={{ height: '30px' }}
        onClick={() =>
          setProfiles(profiles => [...profiles, JSON.parse(JSON.stringify(profileFields))])
        }
        color={'primary'}
        variant={'outlined'}
        aria-label="add"
      >
        <Add fontSize={'small'} />
      </Button>
      {profiles.length > 1 && (
        <Button
          sx={{ height: '30px', ml: 2 }}
          onClick={() =>
            setProfiles(profiles => [...profiles.filter((item, i) => i !== profiles.length - 1)])
          }
          color={'warning'}
          variant={'outlined'}
          aria-label="remove"
        >
          <Remove fontSize={'small'} />
        </Button>
      )}
    </div>
  );
};
