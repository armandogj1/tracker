import React from 'react';
import { ITicket } from './TicketLists';

const Ticket = ({ ticket_id, description, title, link }: ITicket) => {
  return (
    <article key={ticket_id}>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link}>link</a>
    </article>
  );
};

export default Ticket;
