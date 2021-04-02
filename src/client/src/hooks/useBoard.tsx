import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getBoard, IBoard, postBoard, getBoardIds } from '../API_Helpers/Board';

const useBoard = (board_id: string) => useQuery(['board'], () => getBoard(board_id));

const useBoardIds = () => {
  return useQuery(['boards'], () => getBoardIds());
};

const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation((board: IBoard) => postBoard(board), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('board');
    },
  });
};

export { useBoard, useCreateBoard, useBoardIds };
