import ENV from './env.config';
import app from '.';
import dbConnect from './db/index';

dbConnect()
  .then(() => {
    app.listen(ENV.PORT, () => {
      console.log(`listening on ${ENV.PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
    throw new Error(`DB not connected ${e.message}`);
  })
  .catch((e) => console.log(e.message));
