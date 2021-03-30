import ENV from './env.config';
import app from '.';

app.listen(ENV.PORT, () => {
  console.log(`listening on ${ENV.PORT}`);
});
