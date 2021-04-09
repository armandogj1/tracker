import { ITicket } from '../API_Helpers/Board';
import sortTicketsByDate from './sortTicketsBydate';

const dateAndStatusMap = (tickets: { [key: string]: ITicket }) => {
  const dateStatusTuples = sortTicketsByDate(tickets);

  const datesMap = dateStatusTuples.reduce((acc, [status, time]) => {
    const dateObj = new Date(time);
    const date = `${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()}/${dateObj.getFullYear()}`;

    if (!acc.has(status)) {
      acc.set(status, new Map());
    }

    const dateCounts = acc.get(status);
    const dateCountForDate = dateCounts.get(date) || 0;
    dateCounts.set(date, dateCountForDate + 1);

    return acc;
  }, new Map());

  return datesMap;
};

export default dateAndStatusMap;
