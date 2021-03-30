import mongoose from 'mongoose';
import supertest from 'supertest';

jest.mock('./db/index.ts', () => {
  return () => {
    return mongoose.connect('mongodb://localhost:27017/testDBServer', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  };
});

import app from '.';
const request = supertest(app);

test('Should create board', async (done) => {
  const board = {
    board_id: 1,
    title: 'Test board',
    description: 'a job board',
    statuses: ['added', 'offer', 'accepted'],
  };

  const response = await request.post('/board').send(board);
  expect(response.status).toBe(200);
  done();
});

test('Should respond with board', async (done) => {
  const board = {
    board_id: 1,
    title: 'Test board',
    description: 'a job board',
    statuses: ['added', 'offer', 'accepted'],
  };

  const response = await request
    .get('/board')
    .send({ board_id: 1, title: '', description: '', statuses: [] });
  expect(response.status).toBe(200);
  expect(response.body.title).toBe(board.title);
  expect(response.body.description).toBe(board.description);
  expect(response.body.statuses).toEqual(board.statuses);
  done();
});

test('Should NOT respond with board', async (done) => {
  const board = {
    board_id: 2,
    title: 'Test board',
    description: 'a job board',
    statuses: ['added', 'offer', 'accepted'],
  };

  const response = await request.get('/board').send(board);
  expect(response.status).toBe(400);
  done();
});

test('Should update board', async (done) => {
  const board = { board_id: 1, title: '', description: '', statuses: [] };

  const boardUpdate = {
    board_id: 1,
    title: 'Test board Updated',
    description: 'a job board update',
    statuses: ['updated', 'offer', 'accepted'],
  };

  const original = await request.get('/board').send(board);
  const response = await request.put('/board').send(boardUpdate);
  expect(response.status).toBe(200);
  expect(response.body).not.toEqual(original.body);
  expect(response.body.board_id).toBe(original.body.board_id);
  expect(response.body.title).toBeTruthy();
  expect(response.body).toEqual({ ...boardUpdate, tickets: {} });
  done();
});

afterAll(() => {
  return mongoose.connection.dropDatabase().then(() => mongoose.connection.close());
});
