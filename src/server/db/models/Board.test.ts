import mongoose from 'mongoose';
import { createBoard, deleteBoard, getBoard } from './Board';

beforeAll(() => {
  return mongoose.connect('mongodb://localhost:27017/testDBBoard', {
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

test('should remove board', async (done) => {
  const board = {
    board_id: 2,
    title: 'board to remove',
    description: '',
    statuses: ['added', 'applied', 'interview', 'offer', 'rejected'],
  };

  await createBoard(board);

  const savedBoard = await getBoard(board.board_id);
  await deleteBoard(board.board_id);
  const invalidQuery = await getBoard(board.board_id);

  expect(savedBoard?.board_id).toBe(board.board_id);
  expect(invalidQuery).toBeNull();
  done();
});

afterAll(() => {
  return mongoose.connection.dropDatabase().then(() => {
    return mongoose.connection.close();
  });
});
