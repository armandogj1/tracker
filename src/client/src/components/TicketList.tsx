import React from 'react';
import Ticket from './Ticket';
import { ITicket } from './TicketLists';

const style = {
  width: '200px',
  border: '1px solid black',
  backgroundColor: '#fff',
  color: 'black',
};

const TicketList = ({ tickets }: { tickets: ITicket[] }) => {
  return (
    <ul style={style}>
      {tickets.map((tix) => (
        <li key={tix.ticket_id}>
          <Ticket {...tix} />
        </li>
      ))}
    </ul>
  );
};

export default TicketList;
