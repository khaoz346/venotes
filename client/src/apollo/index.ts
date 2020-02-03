import ApolloClient from 'apollo-boost';
import { getSessionToken } from '../utils/authenticate';

export const client = new ApolloClient({
  uri: 'http://localhost:5050/graphql',
  request: operation => {
    const token = getSessionToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});
