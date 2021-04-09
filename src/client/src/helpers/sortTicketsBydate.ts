import { ITicket } from '../API_Helpers/Board';

type TDateStatusTuple = [string, number];

const sortTicketsByDate = (tickets: { [key: string]: ITicket }) => {
  const flattened = Object.values(tickets).reduce((acc, tix) => {
    const currTimes: TDateStatusTuple[] = Object.entries(tix.timestamps).map(
      ([status, time]) => {
        const parsedTime = Date.parse(time);
        return [status, parsedTime];
      }
    );

    return [...acc, ...currTimes];
  }, [] as TDateStatusTuple[]);

  flattened.sort((a, b) => a[1] - b[1]);

  return flattened;
};

export default sortTicketsByDate;
