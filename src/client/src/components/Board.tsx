import React from 'react';
import { useBoard } from '../hooks/useBoard';
import TicketLists from './TicketLists';

const Board = ({ boardId }: { boardId: string }) => {
  const { data, isError } = useBoard(boardId);

  if (isError || !data) return <p>Some went wrong</p>;

  const { board_id, title, description } = data;

  return (
    <section className='board'>
      <header>
        <h1>{title}</h1>
      </header>
      <TicketLists board_id={board_id} />
    </section>
  );
};

export default Board;
