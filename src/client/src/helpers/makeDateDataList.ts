import { ITicket } from '../API_Helpers/Board';
import dateAndStatusMap from './dateAndStatusToMap';

const makeDateDataList = (
  tickets: { [key: string]: ITicket },
  statuses: string[],
  colors: string[]
) => {
  const dateStatusMap: Map<string, Map<string, number>> = dateAndStatusMap(tickets);

  const dateData = statuses.map((status, idx) => {
    const dateCountsForStatus: Map<string, number> =
      dateStatusMap.get(status) || new Map();
    const dataObjs: { x: string; y: number }[] = [];

    dateCountsForStatus.forEach((count, date) => {
      dataObjs.push({ x: date, y: count });
    });

    return {
      label: status,
      data: dataObjs,
      fill: false,
      borderColor: colors[idx],
    };
  });

  return dateData;
};

export default makeDateDataList;
