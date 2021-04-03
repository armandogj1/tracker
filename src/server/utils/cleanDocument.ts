import { Board, IBoard, ITicket } from '../db/schema';

const cleanDocument = (doc: IBoard | ITicket) => {
  if (doc instanceof Board) {
    const { board_id, title, description, statuses, tickets } = doc;
    return { board_id, title, description, statuses: [...statuses], tickets };
  } else {
    const { ticket_id, title, description, link, status, timestamps } = doc;
    return { ticket_id, title, description, link, status, timestamps };
  }
};

export default cleanDocument;
