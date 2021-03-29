import { NextFunction, Request, Response } from 'express';
import isBodyValid from '../utils/isBodyValid';

const validateTicket = (req: Request, res: Response, next: NextFunction) => {
  if (isBodyValid(req.body, 'ticket')) return next();

  res.status(400).send('Invalid payload');
};

export default validateTicket;
