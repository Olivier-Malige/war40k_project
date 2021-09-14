import React from 'react';
import { Theme, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PageLinkCard } from './components/PageLinkCard';
import { routeNames } from '../../navigation/CONSTANTS';
import { ImageAspectRatio } from '@material-ui/icons';

export const HomeView: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <PageLinkCard
          linkTo={routeNames.UNITS_EDITOR}
          title={'Units editor'}
          icon={<ImageAspectRatio fontSize={'large'} color={'secondary'} />}
          picture="https://geeko.lesoir.be/wp-content/uploads/2019/07/warhammer.jpg"
        />
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
}));
