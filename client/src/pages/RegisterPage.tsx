import React from 'react';
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';

import Center from '../components/Layout/Center';
import RegisterForm from '../components/Form/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <Center>
      <Grid item xs={3}>
        <Card>
          <CardHeader title="Register" />
          <CardContent style={{ padding: '16px 32px' }}>
            <RegisterForm />
          </CardContent>
        </Card>
      </Grid>
    </Center>
  );
};

export default RegisterPage;
