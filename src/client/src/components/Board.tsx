import React from 'react';
import { useQueryClient } from 'react-query';
import { ITokenData } from '../helpers/getToken';
import { useBoard } from '../hooks/useBoard';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import TicketLists from './TicketLists';

const Board = ({ match }: RouteComponentProps) => {
  const queryClient = useQueryClient();
  const authData: ITokenData = queryClient.getQueryData('auth') || {
    user: '',
    token: '',
  };
  const { boardId = '' } = match.params as { boardId?: string };
  const { data, isError } = useBoard(boardId, authData.token);

  if (isError || !data) return <Redirect to='/' />;

  const { board_id } = data;

  return (
    <section className='board' key={board_id}>
      <TicketLists board_id={board_id} />
    </section>
  );
};

export default Board;
