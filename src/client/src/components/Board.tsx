import React, { useState } from 'react';
import { useBoard } from '../hooks/useBoard';
import Metrics from './Metrics';
import TicketLists from './TicketLists';

const Board = ({ boardId }: { boardId: string }) => {
  const { data, isError } = useBoard(boardId);
  const [openMetrics, setOpenMetrics] = useState(false);

  if (isError || !data) return <p>Some went wrong</p>;

  const { board_id, title, description } = data;

  return (
    <section className='board'>
      <header>
        <h1>{title}</h1>
        <button onClick={() => setOpenMetrics((prev) => !prev)}>Metrics</button>
      </header>
      {openMetrics ? <Metrics /> : <TicketLists board_id={board_id} />}
    </section>
  );
};

export default Board;
