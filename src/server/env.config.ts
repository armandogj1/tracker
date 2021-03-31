import dotenv from 'dotenv';
dotenv.config();

export interface Envs {
  PORT: number;
  MONGOURL: string;
  ROOTDIR: string;
  DEV: boolean;
}

const envVars: Envs = {
  PORT: Number(process.env.PORT),
  MONGOURL: process.env.MONGOURL ?? '',
  ROOTDIR: process.cwd(),
  DEV: Boolean(process.env.DEV),
};

export default envVars;
