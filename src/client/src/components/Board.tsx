import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { ITokenData } from '../helpers/getToken';
import { testNotification } from '../helpers/notifications';
import { useBoard } from '../hooks/useBoard';
import LogIn from './LogIn';
import Metrics from './Metrics';
import TicketLists from './TicketLists';

const Board = ({ boardId }: { boardId: string }) => {
  const queryClient = useQueryClient();
  const authData: ITokenData = queryClient.getQueryData('auth') || {
    user: '',
    token: '',
  };
  const { data, isError } = useBoard(boardId, authData.token);
  const [openMetrics, setOpenMetrics] = useState(false);
  const [login, setLogin] = useState(false);

  if (isError || !data) return <p>Some went wrong</p>;

  const { board_id, title } = data;

  return (
    <section className='board'>
      <header>
        <h1>{title}</h1>
        <button onClick={() => setOpenMetrics((prev) => !prev)}>Metrics</button>
        <button id='notifications' onClick={testNotification}>
          Notification
        </button>
        <button onClick={() => setLogin((prev) => !prev)}>login</button>
      </header>
      {login ? (
        <LogIn setOpen={setLogin} />
      ) : openMetrics ? (
        <Metrics />
      ) : (
        <TicketLists board_id={board_id} />
      )}
    </section>
  );
};

export default Board;
