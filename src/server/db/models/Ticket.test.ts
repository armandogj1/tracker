import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import cleanDocument from '../../utils/cleanDocument';
import { getBoard, createBoard, BoardInputs } from './Board';
import { createTicket, deleteTicket, updateTicket } from './Ticket';

const testBoard: BoardInputs = {
  board_id: '',
  title: 'job board',
  description: 'test job board',
  statuses: ['added', 'applied', 'interviewed', 'offered', 'rejected'],
};

beforeAll(async () => {
  return mongoose
    .connect('mongodb://localhost:27017/testDBTicket', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      return createBoard(testBoard);
    })
    .then((board) => (testBoard.board_id = board.board_id));
});

test('should add a ticket to board', async (done) => {
  const ticket = {
    ticket_id: '',
    title: 'first job offer',
    description: 'I work at Goldman Sachs now',
    link: '',
    status: 'added',
  };
  const board_id = testBoard.board_id;

  const saved = await createTicket({ ticket, board_id });
  ticket.ticket_id = saved.ticket_id;

  expect(saved).toMatchObject(ticket);
  done();
});

test('Should remove ticket', async (done) => {
  const ticket = {
    ticket_id: '',
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
    toDelete = await createTicket({ ticket, board_id: testBoard.board_id });
    ticket.ticket_id = toDelete.ticket_id;
    board = await getBoard(testBoard.board_id);
    deleted = await deleteTicket({
      ticket_id: ticket.ticket_id,
      board_id: testBoard.board_id,
    });
    updatedBoard = await getBoard(testBoard.board_id);
  } catch (e) {
    throw new Error(`Error during this procedure: ${e}`);
  }

  expect(board?.tickets.get(ticket.ticket_id)).toBeTruthy();
  expect(deleted.ticket_id).toBe(ticket.ticket_id);
  expect(updatedBoard?.tickets.get(ticket.ticket_id)).toBeUndefined();
  done();
});

test('Should update ticket', async (done) => {
  const ticket = {
    ticket_id: '',
    title: 'update ticket',
    description: 'test job to update',
    link: '',
    status: 'interview',
  };

  let ticketToUpdate;
  let updated;

  try {
    ticketToUpdate = await createTicket({ board_id: testBoard.board_id, ticket });
    updated = await updateTicket({
      board_id: testBoard.board_id,
      ticket: {
        ticket_id: ticketToUpdate.ticket_id,
        title: 'updated',
        link: 'example.com',
        status: 'hired',
        description: 'best job ever',
      },
    });
  } catch (e) {
    throw new Error(`Error during update procedure: ${e}`);
  }

  expect(ticketToUpdate.link).toBeFalsy();
  expect(updated?.status).not.toBe(ticketToUpdate?.status);
  expect(updated.title).toBe('updated');
  expect(updated.link).toBe('example.com');
  expect(updated.status).toBe('hired');
  done();
});

afterAll(() => {
  return mongoose.connection.dropDatabase().then(() => {
    return mongoose.connection.close();
  });
});
