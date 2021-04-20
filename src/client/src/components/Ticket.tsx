import React, { DragEventHandler, useState } from 'react';
import EditViewTicketModal from './EditViewTicketModal';
import { ITicket } from './TicketLists';

const style = {
  color: 'black',

  borderRadius: '5px',
};

interface ITicketProps {
  ticket: ITicket;
  board_id: string;
  status: string;
}

const Ticket = ({ ticket, board_id, status }: ITicketProps) => {
  const { ticket_id, description, title, link } = ticket;
  const [isOpen, setOpen] = useState(false);

  const handleDrag: DragEventHandler<HTMLElement> = (e) => {
    e?.dataTransfer?.setData(
      'text/plain',
      JSON.stringify({ ticket_id, description, title, link })
    );
  };

  return (
    <article
      className='ticket'
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
        <EditViewTicketModal ticket={ticket} board_id={board_id} setOpen={setOpen} />
      )}
    </article>
  );
};

export default Ticket;
