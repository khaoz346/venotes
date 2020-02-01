import React from 'react';
import { CircularProgress } from '@material-ui/core';
import App from './App';

import {
  getSessionToken,
  setSessionToken as storeSessionTokenInLocalStorage
} from './utils/authenticate';

const Authenticate: React.FC = () => {
  const [currentToken, setCurrentToken] = React.useState(getSessionToken());

  React.useEffect(() => {
    if (!currentToken) {
      fetch('http://localhost:5050/guest/token', {
        method: 'POST'
      })
        .then(res => res.text())
        .then(data => {
          setCurrentToken(data);
          storeSessionTokenInLocalStorage(data);
        })
        .catch(err => console.log(err));
    }
  }, [currentToken]);

  return currentToken ? <App /> : <CircularProgress />;
};

export default Authenticate;
