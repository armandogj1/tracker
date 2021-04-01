import { useMutation, useQueryClient } from 'react-query';
import { ITicket } from '../API_Helpers/Board';
import { postTicket, putTicket } from '../API_Helpers/Ticket';

const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ ticket, board_id }: { ticket: ITicket; board_id: string }) =>
      postTicket({ ticket, board_id }),
    {
      onSuccess: (data, { board_id }) => {
        queryClient.invalidateQueries(['board', board_id]);
      },
    }
  );
};

const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ ticket, board_id }: { ticket: ITicket; board_id: string }) =>
      putTicket({ ticket, board_id }),
    {
      onSuccess: (data, { board_id }) => {
        queryClient.invalidateQueries(['board', board_id]);
      },
    }
  );
};

export { useCreateTicket, useUpdateTicket };
