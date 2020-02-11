import React from 'react';
import {
  TextField,
  makeStyles,
  Button,
  InputAdornment,
  Typography,
  Link
} from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { validateEmail, validatePassword } from '../../utils/validation';
import { getGraphQLErrorMsg } from '../../utils/error';
import { MUTATION_LOGIN } from '../../graphql/user';
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

  const [login, { loading }] = useMutation(MUTATION_LOGIN, {
    onCompleted: () => handleCompleted(),
    onError: e => handleError(e)
  });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const msg = !validateEmail(value)
      ? 'Please enter a valid email address'
      : 'Incorrect login credentials';
    setEmail({
      ...email,
      value,
      msg,
      error: !validateEmail(value)
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

  const handleCompleted = () => {
    showSuccess('You have successfuly logged in.');
    //Push to home page / dashboard
  };

  const handleError = (e: any) => {
    setEmail({
      ...email,
      error: true
    });
    showError(getGraphQLErrorMsg(e));
  };

  const handleSubmit = async () => {
    if (email.value && !email.error && password.value && !password.error) {
      login({
        variables: {
          email: email.value,
          password: password.value
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
    <form style={{ textAlign: 'center' }}>
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
      <Button
        style={{ marginBottom: '8px' }}
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleSubmit}
      >
        <Typography>Log in</Typography>
      </Button>
      <Link href="/register">Sign up for an account</Link>
      {loading && <Loading />}
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  textField: {
    margin: '16px 0px'
  }
}));

export default withSnackbar(RegisterForm);
