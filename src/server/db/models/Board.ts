import { Board, IBoard } from '../schema';

export type BoardInputs = {
  board_id: number;
  title: string;
  description: string;
  statuses: string[];
};

const createBoard = async (boardInputs: BoardInputs): Promise<IBoard | Error> => {
  return Board.create(boardInputs);
};

const getBoard = async (id: number): Promise<IBoard | null> => {
  return Board.findOne({ board_id: id }).exec();
};

const deleteBoard = async (id: number): Promise<IBoard> => {
  const board = await getBoard(id);

  if (!board) {
    throw new Error('Error board not found');
  }

  board.remove();

  return board;
};

export { createBoard, getBoard, deleteBoard };
