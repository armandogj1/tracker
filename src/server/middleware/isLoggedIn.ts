import { NextFunction, Request, Response } from 'express';
import { IJWT, isTokenValid } from '../utils/Token';

//TODO: Find a better way to extend req, req.token throws a type error

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.get('authorization');

  if (!header) {
    res.status(400).send('Log In');
  } else {
    const validToken = await isTokenValid(header).catch(() => {
      res.status(400).send('Invalid Token');
    });

    if (validToken) {
      req.body.token = validToken;
      next();
    }
  }
};

export default isLoggedIn;
