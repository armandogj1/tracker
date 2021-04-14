import { useMutation, useQueryClient } from 'react-query';
import { ITicket } from '../API_Helpers/Board';
import { deleteTicket, postTicket, putTicket } from '../API_Helpers/Ticket';

const useCreateTicket = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ ticket, board_id }: { ticket: ITicket; board_id: string }) =>
      postTicket({ ticket, board_id, token }),
    {
      onSuccess: (data, { board_id }) => {
        queryClient.invalidateQueries(['board']);
      },
    }
  );
};

const useUpdateTicket = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ ticket, board_id }: { ticket: ITicket; board_id: string }) =>
      putTicket({ ticket, board_id, token }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['board']);
      },
    }
  );
};

const useDeleteTicket = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ ticket_id, board_id }: { ticket_id: string; board_id: string }) =>
      deleteTicket({ ticket_id, board_id, token }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['board']);
      },
    }
  );
};

export { useCreateTicket, useUpdateTicket, useDeleteTicket };
