import React, { DragEventHandler, useState } from 'react';
import EditViewTicketModal from './EditViewTicketModal';
import { ITicket } from './TicketLists';

const style = {
  color: 'black',
  backgroundColor: '#fff',
  borderRadius: '5px',
  padding: '10px',
};

const Ticket = ({ ticket_id, description, title, link, status, timestamps }: ITicket) => {
  const [isOpen, setOpen] = useState(false);

  const handleDrag: DragEventHandler<HTMLElement> = (e) => {
    e?.dataTransfer?.setData(
      'text/plain',
      JSON.stringify({ ticket_id, description, title, link })
    );
  };

  return (
    <article
      style={style}
      key={ticket_id}
      draggable
      onClick={() => {
        console.log('click event in ticket');
        !isOpen && setOpen((prev) => !prev);
      }}
      onDragStart={handleDrag}
    >
      <h3>{title}</h3>
      {isOpen && (
        <EditViewTicketModal
          ticket={{ ticket_id, status, title, description, link, timestamps }}
          setOpen={setOpen}
        />
      )}
    </article>
  );
};

export default Ticket;
