import { gql } from 'apollo-boost';
import { client } from './apollo/index';

export const login = async (email: string, password: string) => {
  try {
    const response = await client.query({
      query: gql`
            {
                loginUser(email: "${email}", password: "${password}")
            }`
    });
    return response && response.data && response.data.loginUser;
  } catch (e) {
    console.log(e);
  }
};

export const MUTATION_CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const MUTATION_LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;
