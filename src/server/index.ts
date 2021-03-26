import express from 'express';
import path from 'path';
import ENV from '../server/env.config';

const app = express();

app.use(express.static(path.resolve(ENV.ROOTDIR, 'dist', 'build')));

app.get('/hello', (req, res) => {
  res.send('Hello');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(ENV.ROOTDIR, 'dist', 'build', 'index.html'));
});

app.listen(ENV.PORT, () => {
  console.log(`listening on ${ENV.PORT}`);
});
