import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { createBoard, deleteBoard, getBoard, updateBoard } from './Board';

beforeAll(() => {
  return mongoose.connect('mongodb://localhost:27017/testDBBoard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

test('should add a Board to database', async (done) => {
  const board = {
    board_id: '',
    title: 'jobs application',
    description: 'tracking job application processes',
    statuses: ['added', 'applied', 'interview', 'offer', 'rejected'],
  };

  const saved = await createBoard(board);
  board.board_id = saved.board_id;

  if (saved instanceof Error) {
    throw new Error('Error saving Board');
  }

  expect(saved).toEqual(
    expect.objectContaining({
      board_id: board.board_id,
      title: 'jobs application',
      description: 'tracking job application processes',
    })
  );
  expect(saved.statuses).toEqual(expect.arrayContaining(board.statuses));
  done();
});

test('should remove board', async (done) => {
  const board = {
    board_id: '',
    title: 'board to remove',
    description: '',
    statuses: ['added', 'applied', 'interview', 'offer', 'rejected'],
  };

  const { board_id } = await createBoard(board);

  const savedBoard = await getBoard(board_id);
  await deleteBoard(board_id);
  const invalidQuery = await getBoard(board_id);

  expect(savedBoard?.board_id).toBe(board_id);
  expect(invalidQuery).toBeNull();
  done();
});

test('should update board', async (done) => {
  const board = {
    board_id: '',
    title: 'board to update',
    description: '',
    statuses: ['added', 'applied', 'interview', 'offer', 'rejected'],
  };

  const { board_id } = await createBoard(board);
  const updateVals = {
    ...board,
    board_id,
    description: 'a board to update',
    statuses: ['offer', 'accepted'],
  };

  await updateBoard(updateVals, '');
  const updated = await getBoard(board_id);
  if (!updated) {
    throw new Error('Error updating board');
  }

  expect(updated.board_id).toBe(board_id);
  expect(updated.title).toBe(updateVals.title);
  expect(updated.description).toBe(updateVals.description);
  expect([...updated.statuses]).toEqual(updateVals.statuses);

  done();
});

test('should NOT update board', async (done) => {
  const board = {
    board_id: nanoid(),
    title: 'board to NOT update',
    description: '',
    statuses: ['added', 'applied', 'interview', 'offer', 'rejected'],
  };

  try {
    await updateBoard(board, '');
  } catch (e) {
    expect(e.message).toBe('Error board not found');
  }

  done();
});

afterAll(() => {
  return mongoose.connection.dropDatabase().then(() => {
    return mongoose.connection.close();
  });
});
