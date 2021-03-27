import { Board, IBoard } from '../schema';

type BoardInputs = {
  board_id: number;
  title: string;
  description: string;
  statuses: string[];
};

const createBoard = async (boardInputs: BoardInputs): Promise<IBoard | Error> => {
  return Board.create(boardInputs);
};

export { createBoard };
