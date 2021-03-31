import React from 'react';
import { useBoard } from '../hooks/useBoard';
import TicketLists from './TicketLists';

const Board = () => {
  const { data, isError } = useBoard('2-p5uWmZDgpSwlpjpYVBS');

  if (isError || !data) return <p>Some went wrong</p>;

  const { board_id, title, description, statuses, tickets } = data;

  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{JSON.stringify(statuses)}</p>
      <TicketLists board_id={board_id} />
    </section>
  );
};

export default Board;
