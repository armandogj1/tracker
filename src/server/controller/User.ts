import { Request, Response } from 'express';
import { createUser, validateUser } from '../db/models/User';
import { createToken } from '../utils/Token';

const postUser = async (req: Request, res: Response) => {
  const newUser = await createUser(req.body).catch(() => {
    res.status(400).send('Error saving user');
  });

  // TODO: Make jwt token;
  if (newUser) {
    const token = await createToken(req.body).catch((e) =>
      res.status(500).send('Error creating token')
    );
    res.send(token);
  }
};

const logIn = async (req: Request, res: Response) => {
  const isValid = await validateUser(req.body).catch(() => {
    res.status(401).send('User not valid');
  });

  if (isValid) {
    const token = await createToken(req.body).catch((e) =>
      res.status(500).send('Error generating token')
    );

    res.send(token);
  }
};

export { postUser, logIn };
