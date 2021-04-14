import { Board, IBoard } from '../schema';

export type BoardInputs = {
  board_id: string;
  user?: string;
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

const getBoardIds = async (): Promise<string[][]> => {
  return Board.find()
    .exec()
    .then((boards) => {
      return boards.map(({ board_id, title }) => [board_id, title]);
    });
};

const deleteBoard = async (id: string): Promise<IBoard> => {
  const board = await getBoard(id);

  if (!board) {
    throw new Error('Error board not found');
  }

  board.remove();

  return board;
};

const updateBoard = async ({
  board_id,
  title,
  description,
  statuses,
  user,
}: BoardInputs) => {
  const board = await getBoard(board_id);

  if (!board) {
    throw new Error('Error board not found');
  }

  board.title = title;
  user && (board.user = user);
  board.description = description;
  board.statuses = statuses;
  await board.save();

  return board;
};

export { createBoard, getBoard, deleteBoard, updateBoard, getBoardIds };
