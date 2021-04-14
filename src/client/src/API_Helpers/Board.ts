import axios from 'axios';

export interface ITicket {
  ticket_id: string;
  title: string;
  description: string;
  link: string;
  status: string;
  timestamps: { [key: string]: string };
}

export interface IBoard {
  board_id: string;
  user: string;
  title: string;
  description: string;
  tickets: { [key: string]: ITicket } | {};
  statuses: string[];
}

const getBoard = (board_id: string, token: string): Promise<IBoard> => {
  let URL = `/board/${board_id}`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios.get(URL, { headers: { authorization: token } }).then(({ data }) => data);
};

const getBoardIds = (token: string): Promise<string[][]> => {
  let URL = `/boards`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios.get(URL, { headers: { authorization: token } }).then(({ data }) => {
    return data;
  });
};

const postBoard = (board: IBoard, token: string): Promise<IBoard> => {
  let URL = `/board`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios
    .post(URL, board, { headers: { authorization: token } })
    .then(({ data }) => data);
};

const putBoard = (board: IBoard, token: string): Promise<IBoard> => {
  let URL = `/board`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios
    .put(URL, board, { headers: { authorization: token } })
    .then(({ data }) => data);
};

export { getBoard, postBoard, putBoard, getBoardIds };
