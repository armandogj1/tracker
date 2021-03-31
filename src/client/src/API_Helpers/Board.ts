import axios from 'axios';

export interface ITicket {
  ticket_id: string;
  title: string;
  description: string;
  link: string;
  status: string;
}

export interface IBoard {
  board_id: string;
  title: string;
  description: string;
  tickets: { [key: string]: ITicket } | {};
  statuses: string[];
}

const getBoard = (board_id: string): Promise<IBoard> => {
  let URL = `/board/${board_id}`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios.get(URL).then(({ data }) => data);
};

const postBoard = (board: IBoard): Promise<IBoard> => {
  let URL = `/board`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios.post(URL, board).then(({ data }) => data);
};

const putBoard = (board: IBoard): Promise<IBoard> => {
  let URL = `/board`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios.put(URL, board).then(({ data }) => data);
};

export { getBoard, postBoard, putBoard };
