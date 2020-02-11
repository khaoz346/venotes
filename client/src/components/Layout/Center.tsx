import React from 'react';
import { Grid } from '@material-ui/core';

//This component centers its children as a Grid item
const Center: React.FC<any> = ({ children }) => {
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      style={{ height: '100vh' }}
    >
      {children}
    </Grid>
  );
};

export default Center;
