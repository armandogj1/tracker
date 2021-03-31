import { Request, Response } from 'express';
import { createTicket, deleteTicket, updateTicket } from '../db/models/Ticket';
import cleanDocument from '../utils/cleanDocument';

const postTicketController = async (req: Request, res: Response) => {
  try {
    const { board_id, ...tix } = req.body;
    const ticket = await createTicket({ board_id, ticket: tix });
    res.send(cleanDocument(ticket));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const deleteTicketController = async (req: Request, res: Response) => {
  try {
    const ticket = await deleteTicket(req.body);
    res.send('ticket deleted');
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const putTicketController = async (req: Request, res: Response) => {
  try {
    const { board_id, ...tix } = req.body;
    const ticket = await updateTicket({ board_id, ticket: tix });
    res.send(cleanDocument(ticket));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export { postTicketController, putTicketController, deleteTicketController };
