import { User } from './database/models';
import { Request, Response } from 'express';
import { generateJwtToken } from './utils/auth';

export const addGuestRoute = (app: any): void => {
  app.post(
    '/guest/token',
    async (_req: Request, res: Response): Promise<void> => {
      const user = await User.createGuest();
      const token = generateJwtToken(user);
      res.send(token);
    }
  );
};
