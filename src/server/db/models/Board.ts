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

const getBoardIds = async (token: string | { email: string }): Promise<string[][]> => {
  return Board.find()
    .exec()
    .then((boards) => {
      return boards
        .map(({ board_id, title, user }) => {
          console.log({ board_id, title, user, token: token });
          if (typeof token === 'object' && (user === token.email || user === '')) {
            return [board_id, title];
          } else if (token === '__PUBLIC__' && user === '') {
            return [board_id, title];
          }
          return ['void', ''];
        })
        .filter((tuple) => tuple[0] !== 'void');
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

//TODO: Fix the two argument format
const updateBoard = async (
  { board_id, title, description, statuses }: BoardInputs,
  token: string | { email: string }
) => {
  const board = await getBoard(board_id);

  if (!board) {
    throw new Error('Error board not found');
  }

  board.title = title;
  typeof token === 'object' && (board.user = token.email);
  board.description = description;
  board.statuses = statuses;
  await board.save();

  return board;
};

export { createBoard, getBoard, deleteBoard, updateBoard, getBoardIds };
