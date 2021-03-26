import dotenv from 'dotenv';
dotenv.config();

export interface Envs {
  PORT: number;
  MONGOURL: string;
}

const envVars: Envs = {
  PORT: Number(process.env.PORT),
  MONGOURL: process.env.MONGOURL ?? '',
};

export default envVars;
