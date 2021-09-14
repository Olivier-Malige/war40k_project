import React, { ReactElement, useState } from 'react';
import { Theme, Typography, Card, CardContent, Grid, CardMedia } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
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
  const classes = useStyles();
  const [elevation, setElevation] = useState(INITIAL_ELEVATION);
  return (
    <LinkRoute to={linkTo}>
      <Card
        className={classes.root}
        elevation={elevation}
        onMouseOver={() => setElevation(MOUSE_OVER_ELEVATION)}
        onMouseOut={() => setElevation(INITIAL_ELEVATION)}
      >
        <CardMedia className={classes.media} image={picture} />
        <CardContent>
          <Grid container direction="row" justifyContent={'center'} alignItems="center">
            {icon}
            <Typography className={classes.title} variant="h4" component="h2">
              {title}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </LinkRoute>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  media: {
    height: 300,
  },
  title: {
    marginLeft: 10,
  },
}));
