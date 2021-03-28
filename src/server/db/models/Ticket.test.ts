import mongoose from 'mongoose';
import { getBoard, createBoard, BoardInputs } from './Board';
import { createTicket, deleteTicket, updateTicket } from './Ticket';

const testBoard: BoardInputs = {
  board_id: 1,
  title: 'job board',
  description: 'test job board',
  statuses: ['added', 'applied', 'interviewed', 'offered', 'rejected'],
};

beforeAll(async () => {
  return mongoose
    .connect('mongodb://localhost:27017/testDBTicket', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      return createBoard(testBoard);
    });
});

test('should add a ticket to board', async (done) => {
  const ticket = {
    ticket_id: 1,
    title: 'first job offer',
    description: 'I work at Goldman Sachs now',
    link: '',
    status: 'added',
  };
  const board_id = 1;

  const saved = await createTicket({ ticket, board_id });

  expect(saved).toMatchObject(ticket);
  done();
});

test('Should remove ticket', async (done) => {
  const ticket = {
    ticket_id: 2,
    title: 'job to delete',
    description: 'test job to delete',
    link: '',
    status: 'added',
  };

  let toDelete;
  let board;
  let deleted;
  let updatedBoard;

  try {
    toDelete = await createTicket({ ticket, board_id: 1 });
    board = await getBoard(1);
    deleted = await deleteTicket({ ticket_id: ticket.ticket_id, board_id: 1 });
    updatedBoard = await getBoard(1);
  } catch (e) {
    throw new Error(`Error during this procedure: ${e}`);
  }

  expect(board?.tickets.get('2')).toBeTruthy();
  expect(toDelete.ticket_id).toBe(ticket.ticket_id);
  expect(deleted.ticket_id).toBe(ticket.ticket_id);
  expect(updatedBoard?.tickets.get('2')).toBeUndefined();
  done();
});

test('Should update ticket', async (done) => {
  const ticket = {
    ticket_id: 1,
    title: 'update ticket',
    description: 'test job to update',
    link: '',
    status: 'interview',
  };

  let board;
  let ticketToUpdate;
  let updated;

  try {
    board = await getBoard(testBoard.board_id);
    ticketToUpdate = board?.tickets.get(`${ticket.ticket_id}`);
    updated = await updateTicket({ board_id: testBoard.board_id, ticket });
  } catch (e) {
    throw new Error(`Error during update procedure: ${e}`);
  }

  expect(updated?.status).not.toBe(ticketToUpdate?.status);
  expect(updated.title).toBe(ticket.title);
  done();
});

afterAll(() => {
  return mongoose.connection.dropDatabase().then(() => {
    return mongoose.connection.close();
  });
});
