import React from 'react';
import { useQueryClient } from 'react-query';
import TicketList from './TicketList';

export interface ITicket {
  ticket_id: string;
  title: string;
  description: string;
  link: string;
  status: string;
  timestamps: {
    [key: string]: string;
  };
}

interface ITickets {
  tickets: {
    [key: string]: ITicket;
  };
  statuses: string[];
}

const style = {
  display: 'grid',
  backgroundColor: '#ffffff80',
  maxWidth: '100vw',
  'grid-auto-flow': 'column',
};

const TicketLists = ({ board_id }: { board_id: string }) => {
  const queryClient = useQueryClient();
  const {
    statuses = [],
    tickets = {} as ITickets,
  }: { statuses?: string[]; tickets?: ITickets } =
    queryClient.getQueryData(['board']) || {};

  return (
    <section className='tix-lists' style={style}>
      {statuses.map((status) => {
        const filteredTix = Object.values(tickets).filter((tix) => tix.status === status);

        return <TicketList tickets={filteredTix} status={status} board_id={board_id} />;
      })}
    </section>
  );
};

export default TicketLists;
