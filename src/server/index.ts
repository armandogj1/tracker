import express from 'express';
import path from 'path';
import ENV from './env.config';
import { ticketRouter, boardRouter } from './routes/index';

const app = express();
console.log('this is root', ENV.ROOTDIR, ENV.PORT, process.env.PORT);

// middlewares
app.use(express.static(path.resolve(ENV.ROOTDIR, 'dist')));
app.use(express.json());

// routers
app.use('/ticket', ticketRouter);
app.use('/board', boardRouter);

app.get('/hello', (req, res) => {
  res.send('Hello');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(ENV.ROOTDIR, 'dist', 'index.html'));
});

app.listen(ENV.PORT, () => {
  console.log(`listening on ${ENV.PORT}`);
});
