import React from 'react';
import {
  Container,
  Card,
  CardContent,
  FormLabel,
  TextField,
  makeStyles,
  Button,
  LinearProgress
} from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { validateEmail, validatePassword } from '../utils/validation';
import { setSessionToken } from '../utils/authenticate';
import { getGraphQLErrorMsg } from '../utils/error';
import { snackbar } from '../actions';
import Snackbar from '../shared/Snackbar';
import { login } from '../apollo/queries/user';

//TODO: Implement styling

const Register: React.FC<{ dispatch?: any }> = ({ dispatch }) => {
  const classes = useStyles();
  const [email, setEmail] = React.useState({
    value: '',
    error: false,
    msg: 'Please enter a valid email address',
    existingEmails: [] as string[]
  });
  const [password, setPassword] = React.useState({
    value: '',
    error: false,
    msg: 'A valid password must be at least 8 characters long'
  });

  const GQL_CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        id
      }
    }
  `;

  const [createUser, { loading }] = useMutation(GQL_CREATE_USER, {
    onError: e => handleError(e),
    onCompleted: data => handleCompleted(data)
  });

  function handleError(e: any) {
    setEmail({
      ...email,
      error: true,
      existingEmails: [...email.existingEmails, email.value]
    });
    dispatch({
      type: snackbar.UPDATE,
      msg: getGraphQLErrorMsg(e),
      severity: 'error',
      open: true
    });
  }

  async function handleCompleted(data: any) {
    const userJwt = await login(email.value, password.value);
    if (userJwt) {
      setSessionToken(userJwt);
      //redirect to dashboard....
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const msg = !validateEmail(value)
      ? 'Please enter a valid email address'
      : 'Email already exists. Please use a different email.';
    setEmail({
      ...email,
      value,
      msg,
      error: !validateEmail(value) || email.existingEmails.includes(value)
    });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword({
      ...password,
      value,
      error: !validatePassword(value)
    });
  };

  //Use some graphql client and fetch helper
  const handleSubmit = async () => {
    if (email.value && !email.error && password.value && !password.error) {
      createUser({
        variables: {
          input: {
            email: email.value,
            password: password.value
          }
        }
      });
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent className={classes.cardContent}>
          <form>
            <FormLabel>Register</FormLabel>
            <TextField
              className={classes.textField}
              fullWidth
              label="Email"
              variant="outlined"
              value={email.value}
              error={email.error}
              helperText={email.error && email.msg}
              onChange={handleEmailChange}
              onKeyDown={handleKeyPress}
            />
            <TextField
              className={classes.textField}
              fullWidth
              label="Password"
              variant="outlined"
              value={password.value}
              type="password"
              error={password.error}
              helperText={password.error && password.msg}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress}
            />
          </form>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </CardContent>
      </Card>
      {loading && <LinearProgress />}
      <Snackbar />
    </Container>
  );
};

const useStyles = makeStyles({
  cardContent: {
    padding: '0px 64px'
  },
  textField: {
    margin: '16px 0px'
  }
});

export default connect(null, dispatch => ({ dispatch }))(Register);
