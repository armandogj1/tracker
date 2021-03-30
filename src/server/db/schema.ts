import { connection, connect, Document, Schema, Model, model } from 'mongoose';
import { nanoid } from 'nanoid';

export interface ITicket extends Document {
  ticket_id: string;
  title: string;
  description: string;
  link: string;
  status: string;
}

const TicketSchema: Schema = new Schema({
  ticket_id: {
    type: String,
    unique: true,
    default: () => nanoid(),
  },
  title: { type: String, require: true },
  description: String,
  link: String,
  status: String,
});

const Ticket: Model<ITicket> = model('Ticket', TicketSchema);

export interface IBoard extends Document {
  board_id: string;
  title: string;
  description: string;
  tickets: Map<string, ITicket>;
  statuses: string[];
}

const BoardSchema: Schema = new Schema({
  board_id: {
    type: String,
    default: () => nanoid(),
    unique: true,
  },
  title: { type: String, require: true },
  description: String,
  tickets: {
    type: Map,
    of: TicketSchema,
    default: {},
  },
  statuses: { type: Array, of: String },
});

const Board: Model<IBoard> = model('Board', BoardSchema);

export { Ticket, Board };
