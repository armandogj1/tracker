import React from 'react';
import { useQueryClient } from 'react-query';
import { ITicket } from '../API_Helpers/Board';
import { Bar, Line } from 'react-chartjs-2';

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

  const dateLabels = Object.values(tickets)
    .reduce((acc, { timestamps }) => {
      const d: number[] = [];

      Object.values(timestamps).forEach((time) => {
        d.push(Date.parse(time + ''));
      });

      return [...acc, ...d];
    }, [] as number[])
    .sort((a, b) => a - b)
    .reduce((unique, d) => {
      const dateObj = new Date(d);
      const date = `${dateObj.getMonth()}/${
        dateObj.getDate() + 1
      }/${dateObj.getFullYear()}`;

      if (unique[unique.length - 1] !== date) {
        unique.push(date);
      }

      return unique;
    }, [] as string[]);

  const datesMap = Object.values(tickets).reduce((acc, tix) => {
    Object.entries(tix.timestamps).forEach(([status, time]) => {
      const dateObj = new Date(time);
      const date = `${dateObj.getMonth()}/${
        dateObj.getDate() + 1
      }/${dateObj.getFullYear()}`;

      if (!acc.has(status)) {
        acc.set(status, {});
      }

      const dateCounts = acc.get(status);
      dateCounts[date] = dateCounts[date] ? dateCounts[date] + 1 : 1;
    });

    return acc;
  }, new Map());

  const dateData = statuses.map((status, idx) => {
    if (datesMap instanceof Map) {
      const dateCountsForStatus = datesMap.get(status);
      const dataObjs = [];

      for (let date in dateCountsForStatus) {
        dataObjs.push({ x: date, y: dateCountsForStatus[date] });
      }

      return {
        label: status,
        data: dataObjs,
        fill: false,
        borderColor: colors[idx],
      };
    }
    return {};
  });

  const lineData = {
    labels: dateLabels,
    datasets: dateData,
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
