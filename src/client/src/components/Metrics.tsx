import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ITicket } from '../API_Helpers/Board';
import { Bar } from 'react-chartjs-2';

const Metrics = () => {
  const queryClient = useQueryClient();

  const {
    tickets,
    statuses,
  }: {
    statuses: string[];
    tickets: { [key: string]: ITicket };
  } = queryClient.getQueryData(['board']) || { statuses: [], tickets: {} };

  const applicationsCount = statuses.map((status) => {
    return Number(Object.values(tickets).filter((t) => t.status === status).length);
  });

  const colors = ['#7777ff', '#77adff', '#77fdff', '#77ff9e', '#a0ff77', '#ff9777'];

  const chartData = {
    labels: statuses,
    datasets: [
      {
        label: 'Application Count',
        data: applicationsCount,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <section className='metrics'>
      <Bar
        data={chartData}
        width={500}
        height={400}
        options={{ maintainAspectRatio: false }}
      />
    </section>
  );
};

export default Metrics;
