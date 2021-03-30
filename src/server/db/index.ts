import { connect, connection } from 'mongoose';
import ENV from '../env.config';

// connect(ENV.MONGOURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const init = () => {
  return connect(ENV.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default init;
