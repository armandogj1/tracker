import express from 'express';
import path from 'path';
import ENV from './env.config';
console.log('In index server', ENV.MONGOURL);
import { ticketRouter, boardRouter, authRouter } from './routes/index';

const app = express();

// include cors in development
import cors from 'cors';
import { getBoardIdsController } from './controller/Board';
import isLoggedIn from './middleware/isLoggedIn';
ENV.DEV && app.use(cors());

// middlewares
app.use(express.static(path.resolve(ENV.ROOTDIR, 'dist')));
app.use(express.json());

// routers
app.use('/auth', authRouter);
app.use(isLoggedIn);
app.use('/ticket', ticketRouter);
app.use('/board', boardRouter);

app.get('/boards', getBoardIdsController);
app.get('/hello', (req, res) => {
  res.send('Hello');
});

app.get('/', function (req, res) {
  res.send(`${ENV.ROOTDIR}/dist/index.html`);
  // res.sendFile(path.join(ENV.ROOTDIR, 'dist', 'index.html'));
});

export default app;
