import { ITicket, Ticket } from '../schema';

type ticketInputs = {
  ticket_id: number;
  description: string;
  title: string;
  link: string;
};

const createTicket = async (ticket: ticketInputs): Promise<ITicket> => {
  return await Ticket.create(ticket);
};

export { createTicket };
