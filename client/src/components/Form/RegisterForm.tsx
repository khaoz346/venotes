import React from 'react';
import {
  TextField,
  makeStyles,
  Button,
  Typography,
  InputAdornment
} from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { validateEmail, validatePassword } from '../../utils/validation';
import { getGraphQLErrorMsg } from '../../utils/error';
import { MUTATION_CREATE_USER } from '../../graphql/user';
import { withSnackbar, WithSnackbarProps } from '../HOC/withSnackbar';
import Loading from '../Feedback/Loading';

const RegisterForm: React.FC<WithSnackbarProps> = ({
  showSuccess,
  showError
}) => {
  const classes = useStyles();
  const history = useHistory();
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
  const [password2, setPassword2] = React.useState({
    value: '',
    error: false,
    msg: 'Passwords do not match'
  });

  const [createUser, { loading }] = useMutation(MUTATION_CREATE_USER, {
    onCompleted: () => handleCompleted(),
    onError: e => handleError(e)
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

  const handlePassword2Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPassword2({
      ...password2,
      value,
      error: value !== password.value
    });
  };

  const handleCompleted = () => {
    showSuccess('You have successfuly registered an account.');
    history.push('/login');
  };

  const handleError = (e: any) => {
    setEmail({
      ...email,
      error: true,
      ...(e.message.includes`exists` && {
        existingEmails: [...email.existingEmails, email.value]
      })
    });
    showError(getGraphQLErrorMsg(e));
  };

  const handleSubmit = async () => {
    if (
      email.value &&
      !email.error &&
      password.value &&
      !password.error &&
      password2.value &&
      !password2.error
    ) {
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
    <form>
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="small" color="secondary" />
            </InputAdornment>
          )
        }}
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock fontSize="small" color="secondary" />
            </InputAdornment>
          )
        }}
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="Confirm password"
        variant="outlined"
        value={password2.value}
        type="password"
        error={password2.error}
        helperText={password2.error && password2.msg}
        onChange={handlePassword2Change}
        onKeyDown={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock fontSize="small" color="secondary" />
            </InputAdornment>
          )
        }}
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleSubmit}
      >
        <Typography>Register</Typography>
      </Button>
      {loading && <Loading />}
    </form>
  );
};

const useStyles = makeStyles({
  textField: {
    margin: '16px 0px'
  }
});

export default withSnackbar(RegisterForm);
