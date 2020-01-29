import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';
import { verifyJwtToken } from '../utils/auth';
import { User } from 'graphql/user';

interface AuthenticatedRequest extends Request {
  currentUser?: User;
  access?: string;
}

const getAuthTokenFromRequest = (req: Request): string | null => {
  const header = req.get('Authorization') || '';
  const [bearer, token] = header.split(' ');
  return bearer === 'Bearer' && token ? token : null;
};

export const authenticate = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = getAuthTokenFromRequest(req);
    if (!token) {
      throw new CustomError('No authentication token in request.');
    }
    const decoded = verifyJwtToken(token);
    const userId = decoded.userId as number;
    if (!userId) {
      throw new CustomError(
        'Invalid authentication token',
        'INVALID_TOKEN',
        401
      );
    }
    //Find User based on User ID and return that user to req.currentUser
    //Determine role of that user and add to req.access
    req.currentUser = {
      id: 1,
      email: 'victor@gmail.com'
    };

    //If no User found, throw a custom error and handle in error middleware
  } catch (e) {
    next(e);
  }
};
