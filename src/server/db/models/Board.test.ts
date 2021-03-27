import mongoose from 'mongoose';
import { createBoard } from './Board';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

test('should add a Board to database', async (done) => {
  const board = {
    board_id: 1,
    title: 'jobs application',
    description: 'tracking job application processes',
    statuses: ['added', 'applied', 'interview', 'offer', 'rejected'],
  };

  const saved = await createBoard(board);

  if (saved instanceof Error) {
    throw new Error('Error saving Board');
  }

  expect(saved).toEqual(
    expect.objectContaining({
      board_id: 1,
      title: 'jobs application',
      description: 'tracking job application processes',
    })
  );
  expect(saved.statuses).toEqual(expect.arrayContaining(board.statuses));
  done();
});

afterAll(async () => {
  await mongoose.connection.dropCollection('boards');
  await mongoose.connection.close();
});
