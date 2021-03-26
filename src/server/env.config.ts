import dotenv from 'dotenv';
dotenv.config();

export interface Envs {
  PORT: number;
  MONGOURL: string;
  ROOTDIR: string;
}

const envVars: Envs = {
  PORT: Number(process.env.PORT),
  MONGOURL: process.env.MONGOURL ?? '',
  ROOTDIR: process.cwd(),
};

export default envVars;
