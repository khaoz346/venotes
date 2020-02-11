import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const Loading = () => {
  const classes = useStyles();
  return <CircularProgress className={classes.loading} />;
};

const useStyles = makeStyles(() => ({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '50%',
    transform: 'translate(-50%,-50%)'
  }
}));

export default Loading;
