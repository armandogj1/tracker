type BodyInput = {
  board_id: number;
  ticket_id?: number;
  title: string;
  description: string;
  statuses?: string[];
  link?: string;
  status?: string;
};

const isBodyValid = (body: BodyInput, type: 'ticket' | 'board') => {
  const { ticket_id, board_id, title, description, status, statuses, link } = body;
  let validVals;

  if (type === 'ticket') {
    validVals =
      typeof title === 'string' &&
      typeof description === 'string' &&
      typeof status === 'string' &&
      typeof link === 'string' &&
      !isNaN(Number(ticket_id));
  } else {
    validVals =
      typeof title === 'string' &&
      typeof description === 'string' &&
      Array.isArray(statuses);
  }

  return !!body && !isNaN(Number(board_id)) && validVals;
};

export default isBodyValid;
