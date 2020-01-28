const jwt = require('jsonwebtoken');
const { CustomError } = require('../errors');

export const generateJwtToken = (payload: object): string => {
  const token: string = jwt.sign(payload, process.env.VENOTES_JWT, {
    expiresIn: '180 days'
  });
  return token;
};

export const verifyJwtToken = (token: string): { [key: string]: any } => {
  try {
    const decoded: { [key: string]: any } = jwt.verify(
      token,
      process.env.VENOTES_JWT
    );
    return decoded;
  } catch (e) {
    console.log('JWT verification error');
    throw new CustomError('Failed to verify JWT token', 'INVALID_TOKEN', 401);
  }
};
