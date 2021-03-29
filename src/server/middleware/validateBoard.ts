import { Request, Response, NextFunction } from 'express';
import isBodyValid from '../utils/isBodyValid';

const validateBoard = (req: Request, res: Response, next: NextFunction) => {
  if (isBodyValid(req.body, 'board')) return next();

  res.status(400).send('Invalid payload');
};

export default validateBoard;
