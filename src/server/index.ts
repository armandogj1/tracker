import express from 'express';
import path from 'path';
import ENV from '../server/env.config';

const app = express();

app.use(express.static(path.resolve(__dirname, 'src/client/public')));

app.get('/hello', (req, res) => {
  res.send('Hello');
});

app.listen(ENV.PORT, () => {
  console.log(`listening on ${ENV.PORT}`);
});
