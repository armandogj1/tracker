import React from 'react';
import { useBoard } from '../hooks/useBoard';
import TicketLists from './TicketLists';

const Board = ({ boardId }: { boardId: string }) => {
  const { data, isError } = useBoard(boardId);

  if (isError || !data) return <p>Some went wrong</p>;

  const { board_id, title, description } = data;

  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
      <TicketLists board_id={board_id} />
    </section>
  );
};

export default Board;
