import { sign, verify } from 'jsonwebtoken';
import ENV from '../env.config';

const createToken = ({ email }: { email: string }): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign({ email }, ENV.JWTSECRET, { expiresIn: '2 days' }, (err, JWT) => {
      if (err || !JWT) {
        reject(err);
      } else {
        resolve(JWT);
      }
    });
  });
};

export interface IJWT {
  email: string;
  password: string;
}

const isTokenValid = (token: string): Promise<IJWT> => {
  return new Promise((resolve, reject) => {
    verify(token, ENV.JWTSECRET, {}, (err, JWT) => {
      if (err || !JWT) {
        reject(err);
      } else {
        const valid = JWT as IJWT;
        resolve(valid);
      }
    });
  });
};

export { createToken, isTokenValid };
