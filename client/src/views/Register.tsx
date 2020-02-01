import React from 'react';
import {
  Container,
  Card,
  CardContent,
  FormLabel,
  TextField,
  makeStyles,
  Button
} from '@material-ui/core';
import { validateEmail, validatePassword } from '../utils/validation';

//TODO: Check if email is already taken
//TODO: Implement styling

const Register: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = React.useState();
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState();
  const [passwordError, setPasswordError] = React.useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailVal = event.target.value;
    setEmail(emailVal);
    setEmailError(!validateEmail(emailVal));
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordVal = event.target.value;
    setPassword(passwordVal);
    setPasswordError(!validatePassword(passwordVal));
  };

  const handleSubmit = () => {
    if (!emailError && !passwordError) {
      //Post to create user
      //Handle success and handle failure
      //Show loading feedback
      //Implement redux
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
              value={email}
              error={emailError}
              helperText={emailError && 'Please enter a valid email'}
              onChange={handleEmailChange}
            />
            <TextField
              className={classes.textField}
              fullWidth
              label="Password"
              variant="outlined"
              value={password}
              type="password"
              error={passwordError}
              helperText={
                passwordError &&
                'A valid password must be at least 8 characters long'
              }
              onChange={handlePasswordChange}
            />
          </form>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </CardContent>
      </Card>
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

export default Register;
