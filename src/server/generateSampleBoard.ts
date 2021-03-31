import { createBoard } from './db/models/Board';
import dbConnect from './db/index';
import { createTicket } from './db/models/Ticket';
dbConnect();

const board = {
  board_id: '',
  title: 'job',
  description: 'job board',
  statuses: ['added'],
};

const ticket = {};

createBoard(board)
  .then((board) => {
    const ticket = {
      ticket_id: '',
      title: 'first post',
      description: 'first offer',
      link: 'job.com',
      status: '',
    };
    return createTicket({ board_id: board.board_id, ticket });
  })
  .then(() => process.exit());
