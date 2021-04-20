import React, { DragEventHandler, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ITokenData } from '../helpers/getToken';
import { useUpdateTicket } from '../hooks/useTicket';
import CreateTicketModal from './CreateTicketModal';
import Ticket from './Ticket';
import { ITicket } from './TicketLists';

const style = {
  main: {
    width: '300px',
    color: 'black',
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
  const queryClient = useQueryClient();
  const authData: ITokenData = queryClient.getQueryData('auth') || {
    user: '',
    token: '',
  };
  const [isCreateOpen, setCreateOpen] = useState(false);
  const { mutate } = useUpdateTicket(authData.token);

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
      <ul>
        {tickets.map((tix) => (
          <li key={tix.ticket_id}>
            <Ticket ticket={tix} status={status} board_id={board_id} />
          </li>
        ))}
      </ul>
      <button className='plus-button' onClick={() => setCreateOpen((prev) => !prev)}>
        +
      </button>
    </div>
  );
};

export default TicketList;
