import { gql } from 'apollo-boost';
import { client } from '../index';

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
