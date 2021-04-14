import dotenv from 'dotenv';
dotenv.config();

export interface Envs {
  PORT: number;
  MONGOURL: string;
  ROOTDIR: string;
  DEV: boolean;
  JWTSECRET: string;
  SALT: number;
}

const envVars: Envs = {
  PORT: Number(process.env.PORT),
  MONGOURL: process.env.MONGOURL ?? '',
  ROOTDIR: process.env.ROOTDIR || process.cwd(),
  DEV: Boolean(process.env.DEV),
  JWTSECRET: process.env.JWTSECRET || '',
  SALT: Number(process.env.SALT) || 8,
};

export default envVars;
