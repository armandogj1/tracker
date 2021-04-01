import React, { DragEventHandler } from 'react';
import { ITicket } from './TicketLists';

const style = {
  width: '100%',
  height: '100px',
  color: 'black',
};

const Ticket = ({ ticket_id, description, title, link }: ITicket) => {
  const handleDrag: DragEventHandler<HTMLElement> = (e) => {
    e?.dataTransfer?.setData(
      'text/plain',
      JSON.stringify({ ticket_id, description, title, link })
    );
  };

  return (
    <article key={ticket_id} draggable onDragStart={handleDrag}>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link}>link</a>
    </article>
  );
};

export default Ticket;
