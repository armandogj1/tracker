import { ITicket } from '../API_Helpers/Board';
import sortTicketsByDate from './sortTicketsBydate';

const makeDateLabels = (tickets: { [key: string]: ITicket }) => {
  const sortedDates = sortTicketsByDate(tickets);

  return sortedDates.reduce((acc, [_, date]) => {
    const dateObj = new Date(date);
    const formattedDate = `${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()}/${dateObj.getFullYear()}`;

    if (acc[acc.length - 1] !== formattedDate) {
      acc.push(formattedDate);
    }

    return acc;
  }, [] as string[]);
};

export default makeDateLabels;
