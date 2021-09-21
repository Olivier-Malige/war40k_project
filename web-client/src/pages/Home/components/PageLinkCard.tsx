import React, { ReactElement, useState } from 'react';
import { Typography, Card, CardContent, Grid, CardMedia } from '@mui/material';

import { LinkRoute } from '../../../components/LinkRoute';

type Props = {
  linkTo: string;
  title: string;
  icon: ReactElement;
  picture: string;
};

const INITIAL_ELEVATION = 2;
const MOUSE_OVER_ELEVATION = 8;

export const PageLinkCard: React.FC<Props> = ({ linkTo, title, icon, picture }) => {
  const [elevation, setElevation] = useState(INITIAL_ELEVATION);
  return (
    <LinkRoute to={linkTo}>
      <Card
        elevation={elevation}
        onMouseOver={() => setElevation(MOUSE_OVER_ELEVATION)}
        onMouseOut={() => setElevation(INITIAL_ELEVATION)}
      >
        <CardMedia
          sx={{
            height: 300,
          }}
          image={picture}
        />
        <CardContent>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            {icon}
            <Typography
              sx={{
                marginLeft: 2,
              }}
              variant="h4"
              component="h2"
            >
              {title}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </LinkRoute>
  );
};
