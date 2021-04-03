import React from 'react';
import { useQueryClient } from 'react-query';
import { ITicket } from '../API_Helpers/Board';

const Metrics = () => {
  const queryClient = useQueryClient();
  const { tickets }: { [key: string]: ITicket } =
    queryClient.getQueryData(['board']) || {};

  return (
    <section className='metrics'>
      {Object.values(tickets).map((tix) => {
        return (
          <span>
            <p>{tix.title}</p>
            <p>{new Date(tix.timestamps[tix.status]).toString()}</p>
          </span>
        );
      })}
    </section>
  );
};

export default Metrics;
