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
import { connect } from 'react-redux';
import { validateEmail, validatePassword } from '../utils/validation';
import { getSessionToken } from '../utils/authenticate';
import { snackbar } from '../actions';
import Snackbar from '../shared/Snackbar';

//TODO: Implement styling

const Register: React.FC<{ snackbarState: any; dispatch: any }> = ({
  snackbarState,
  dispatch
}) => {
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
  const [registerState, setRegisterState] = React.useState({
    errors: null,
    data: null,
    pending: false
  });

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
  const handleSubmit = () => {
    const query = `mutation CreateUser($input: CreateUserInput) {
        createUser(input: $input) {
            id
        }
    }`;

    if (email.value && !email.error && password.value && !password.error) {
      setRegisterState({ ...registerState, pending: true });
      fetch(`http://localhost:5050/graphql`, {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${getSessionToken()}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }),
        body: JSON.stringify({
          query,
          variables: {
            input: {
              email: email.value,
              password: password.value
            }
          }
        })
      })
        .then(response => response.json())
        .then(payload => {
          handlePayload(payload);
          setRegisterState({
            ...registerState,
            pending: false,
            ...payload
          });
        });
      //Post to create user
      //Handle success and handle failure
      //Show loading feedback
      //Implement redux
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handlePayload = (payload: any) => {
    if (payload.errors) {
      dispatch({
        type: snackbar.UPDATE,
        msg: payload.errors[0].message,
        severity: 'error',
        open: true
      });
    }
    if (
      payload.errors &&
      payload.errors[0].message === 'Email already exists'
    ) {
      setEmail({
        ...email,
        error: true,
        msg: 'Email already exists. Please use a different email.',
        existingEmails: [...email.existingEmails, email.value]
      });
    }
    if (payload.data && payload.data.createUser) {
      dispatch({
        type: snackbar.UPDATE,
        msg: 'You have successfully registered your account.',
        severity: 'success',
        open: true
      });
      //Redirect
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
      {registerState.pending && <LinearProgress />}
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

export default connect(
  state => ({ snackbarState: (state as any).snackbar }),
  dispatch => ({ dispatch })
)(Register);
