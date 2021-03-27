import { connect, connection } from 'mongoose';
import ENV from '../env.config';

connect(ENV.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
