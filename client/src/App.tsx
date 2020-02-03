import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';

import store from './store';
import { client } from './apollo';
import { Router } from './router';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
