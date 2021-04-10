import { connect } from 'mongoose';
import ENV from '../env.config';

const init = () => {
  console.log('this is env url', ENV.MONGOURL);
  return connect(ENV.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export default init;
