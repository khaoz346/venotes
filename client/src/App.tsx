import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import store from './store';
import { client } from './graphql/apollo';
import { Router } from './router';
import Snackbar from './components/Feedback/Snackbar';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
          <Snackbar />
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
