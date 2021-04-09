import React, { DragEventHandler, useState } from 'react';
import { useUpdateTicket } from '../hooks/useTicket';
import CreateTicketModal from './CreateTicketModal';
import Ticket from './Ticket';
import { ITicket } from './TicketLists';

const style = {
  main: {
    width: '300px',
    backgroundColor: '#cdcdcd',
    color: 'black',
  },
  ul: {
    // 'list-style': 'none',
  },
  button: {
    width: '100px',
  },
};

const TicketList = ({
  tickets,
  status,
  board_id,
}: {
  tickets: ITicket[];
  status: string;
  board_id: string;
}) => {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const { mutate } = useUpdateTicket();

  const handleDragOver: DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLElement> = (e) => {
    const tixString = e.dataTransfer.getData('text/plain');

    const newTicket = JSON.parse(tixString);
    newTicket.status = status;

    mutate({ board_id, ticket: newTicket });
  };

  return (
    <div
      className='list'
      style={style.main}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2>{status}</h2>
      {isCreateOpen && (
        <CreateTicketModal
          status={status}
          board_id={board_id}
          setCreateOpen={setCreateOpen}
        />
      )}
      <ul style={style.ul}>
        {tickets.map((tix) => (
          <li key={tix.ticket_id}>
            <Ticket {...tix} status={status} />
          </li>
        ))}
      </ul>
      <button style={style.button} onClick={() => setCreateOpen((prev) => !prev)}>
        +
      </button>
    </div>
  );
};

export default TicketList;
