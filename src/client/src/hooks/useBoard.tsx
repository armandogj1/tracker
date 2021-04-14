import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getBoard, IBoard, postBoard, getBoardIds } from '../API_Helpers/Board';

const useBoard = (board_id: string, token: string) =>
  useQuery(['board'], () => getBoard(board_id, token));

const useBoardIds = () => {
  return useQuery(['boards'], () => getBoardIds());
};

const useCreateBoard = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation((board: IBoard) => postBoard(board, token), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('board');
    },
  });
};

export { useBoard, useCreateBoard, useBoardIds };
