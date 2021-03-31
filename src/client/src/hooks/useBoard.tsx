import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getBoard, IBoard, postBoard } from '../API_Helpers/Board';

const useBoard = (board_id: string) =>
  useQuery(['board', board_id], () => getBoard(board_id));

const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation((board: IBoard) => postBoard(board), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('board');
    },
  });
};

export { useBoard, useCreateBoard };
