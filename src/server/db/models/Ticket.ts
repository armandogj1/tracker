import { ITicket, Ticket } from '../schema';
import { getBoard } from './Board';

type ticketInputs = {
  ticket_id: number;
  description: string;
  title: string;
  link: string;
  status: string;
};

const createTicket = async ({
  ticket,
  board_id,
}: {
  ticket: ticketInputs;
  board_id: number;
}): Promise<ITicket> => {
  const board = await getBoard(board_id);
  const { ticket_id } = ticket;

  if (board === null) {
    throw new Error('Board was not found');
  }

  const newTicket = new Ticket(ticket);
  board.tickets.set(`${ticket_id}`, newTicket);
  try {
    await board.save();
  } catch (e) {
    throw new Error('Error saving ticket to board');
  }
  // return await Ticket.create(ticket);
  return newTicket;
};

type DeleteInputs = {
  board_id: number;
  ticket_id: number;
};

const deleteTicket = async ({ board_id, ticket_id }: DeleteInputs): Promise<ITicket> => {
  const board = await getBoard(board_id);

  if (board === null) {
    throw new Error('Board was not found');
  }
  const ticket = board.tickets.get(ticket_id.toString());

  if (!ticket) {
    throw new Error('Ticket not found');
  }

  board.tickets.delete(ticket_id.toString());
  await board.save();

  return ticket;
};

const updateTicket = async ({
  board_id,
  ticket,
}: {
  board_id: number;
  ticket: ticketInputs;
}): Promise<ITicket> => {
  const board = await getBoard(board_id);

  if (!board) {
    throw new Error('Error board not found');
  }

  let ticketToUpdate = board.tickets.get(ticket.ticket_id.toString());

  if (!ticketToUpdate) {
    throw new Error('Error ticket not found');
  }

  ticketToUpdate.title = ticket.title;
  ticketToUpdate.status = ticket.status;
  ticketToUpdate.description = ticket.description;
  ticketToUpdate.link = ticket.link;

  await board.save();
  return ticketToUpdate;
};

export { createTicket, deleteTicket, updateTicket };
