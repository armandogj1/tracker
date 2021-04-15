import React from 'react';
import { useQueryClient } from 'react-query';
import { ITicket } from '../API_Helpers/Board';
import { Bar, Line } from 'react-chartjs-2';

import makeDateDataList from '../helpers/makeDateDataList';
import makeDateLabels from '../helpers/makeDateLabels';

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

  const dateLabels = makeDateLabels(tickets);

  const lineData = {
    labels: dateLabels,
    datasets: makeDateDataList(tickets, statuses, colors),
  };

  const barChartData = {
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
      <div className='graph'>
        <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
      </div>
      <div className='graph'>
        <Line
          data={lineData}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </section>
  );
};

export default Metrics;
