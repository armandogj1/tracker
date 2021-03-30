import { Board, IBoard } from '../schema';

export type BoardInputs = {
  board_id: string;
  title: string;
  description: string;
  statuses: string[];
};

const createBoard = async (boardInputs: BoardInputs): Promise<IBoard> => {
  const { board_id, ...inputs } = boardInputs;
  return Board.create(inputs);
};

const getBoard = async (id: string): Promise<IBoard | null> => {
  return Board.findOne({ board_id: id }).exec();
};

const deleteBoard = async (id: string): Promise<IBoard> => {
  const board = await getBoard(id);

  if (!board) {
    throw new Error('Error board not found');
  }

  board.remove();

  return board;
};

const updateBoard = async ({ board_id, title, description, statuses }: BoardInputs) => {
  const board = await getBoard(board_id);

  if (!board) {
    throw new Error('Error board not found');
  }

  board.title = title;
  board.description = description;
  board.statuses = statuses;
  await board.save();

  return board;
};

export { createBoard, getBoard, deleteBoard, updateBoard };
