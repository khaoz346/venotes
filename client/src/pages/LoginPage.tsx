import React from 'react';
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';

import Center from '../components/Layout/Center';
import LoginForm from '../components/Form/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Center>
      <Grid item xs={3}>
        <Card>
          <CardHeader title="Log In" />
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Grid>
    </Center>
  );
};

export default LoginPage;
