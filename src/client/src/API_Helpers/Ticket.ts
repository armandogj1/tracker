import axios from 'axios';
import { ITicket } from './Board';

const postTicket = async ({
  board_id,
  ticket,
}: {
  ticket: ITicket;
  board_id: string;
}) => {
  let URL = `/ticket`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios.post(URL, { board_id, ...ticket }).then(({ data }) => data);
};

const putTicket = async ({ board_id, ticket }: { ticket: ITicket; board_id: string }) => {
  let URL = `/ticket`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios.put(URL, { board_id, ...ticket }).then(({ data }) => data);
};

const deleteTicket = async ({
  board_id,
  ticket_id,
}: {
  ticket_id: string;
  board_id: string;
}) => {
  let URL = `/ticket`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios.delete(URL, { params: { board_id, ticket_id } }).then(({ data }) => data);
};

export { postTicket, putTicket, deleteTicket };
