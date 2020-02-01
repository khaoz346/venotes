import jwt from 'jsonwebtoken';
import { CustomError } from '../errors';

export const generateJwtToken = (payload: any): string => {
  const payloadPlainObj = Object.assign({}, payload);
  const token: string = jwt.sign(
    payloadPlainObj,
    process.env.VENOTES_JWT as string,
    {
      expiresIn: '180 days'
    }
  );
  return token;
};

export const verifyJwtToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.VENOTES_JWT as string);
    return decoded;
  } catch (e) {
    console.log('JWT verification error');
    throw new CustomError('Failed to verify JWT token', 'INVALID_TOKEN', 401);
  }
};
