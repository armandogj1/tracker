import express from 'express';
import path from 'path';
import ENV from './env.config';
import dbConnect from './db/index';
import { ticketRouter, boardRouter } from './routes/index';
dbConnect().catch(() => {
  throw new Error('DB not connected');
});

const app = express();

// include cors in development
import cors from 'cors';
ENV.DEV && app.use(cors());

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

// app.listen(ENV.PORT, () => {
//   console.log(`listening on ${ENV.PORT}`);
// });

export default app;
