import React from 'react';
import { useQueryClient } from 'react-query';
import Ticket from './Ticket';
import TicketList from './TicketList';

export interface ITicket {
  ticket_id: string;
  title: string;
  description: string;
  link: string;
  status: string;
}

interface ITickets {
  tickets: {
    [key: string]: ITicket;
  };
  statuses: string[];
}

const style = {
  display: 'flex',
};

const TicketLists = ({ board_id }: { board_id: string }) => {
  const queryClient = useQueryClient();
  const {
    statuses = [],
    tickets = {} as ITickets,
  }: { statuses?: string[]; tickets?: ITickets } =
    queryClient.getQueryData(['board', board_id]) || {};

  return (
    <section style={style}>
      {statuses.map((status) => {
        const filteredTix = Object.values(tickets).filter((tix) => tix.status === status);

        return <TicketList tickets={filteredTix} />;
      })}
    </section>
  );
};

export default TicketLists;
