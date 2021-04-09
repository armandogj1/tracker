import React, {
  ChangeEventHandler,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { useQueryClient } from 'react-query';
import { ITicket } from '../API_Helpers/Board';
import { useDeleteTicket, useUpdateTicket } from '../hooks/useTicket';

const style = {
  main: {
    display: 'flex',
    'flex-direction': 'column',
    'border-radius': '10px',
    backgroundColor: '#fff',
    padding: '1em',
    color: 'black',
    'z-index': '3',
    width: '600px',
    height: '500px',
  },
  textarea: {
    width: '400px',
    height: '250px',
  },
};

const EditViewTicketModal = ({
  ticket,
  setOpen,
}: {
  ticket: ITicket;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [tix, setTix] = useState(ticket);
  const { mutateAsync } = useUpdateTicket();
  const { mutateAsync: deleteHandler } = useDeleteTicket();
  const queryClient = useQueryClient();

  const defaultData: { statuses: string[]; board_id: string } = {
    statuses: [],
    board_id: '',
  };
  const { statuses, board_id }: { statuses: string[]; board_id: string } =
    queryClient.getQueryData('board') || defaultData;

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    if (!e) return;

    const newTicket = {
      ...tix,
      [e.target?.name]: e.target.value,
    };

    setTix(newTicket);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync({ ticket: tix, board_id }).then(() => setOpen((prev) => !prev));
  };

  const handleDelete = () => {
    deleteHandler({ ticket_id: tix.ticket_id, board_id }).then(() => setOpen(false));
  };

  return (
    <form
      className='modal'
      style={style.main}
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <label>
        Title:
        <input type='text' name='title' value={tix.title} />
      </label>
      <label>
        Link:
        <input type='text' name='link' value={tix.link} />
        <a href={tix.link} target='_blank' rel='noopener noreferrer'>
          link
        </a>
      </label>
      <label>
        Description:
        <textarea style={style.textarea} name='description' value={tix.description} />
      </label>
      <label>
        Pick Status:
        <select value={tix.status} name='status'>
          <option value='' disabled selected hidden>
            Status
          </option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      <input type='submit' value='Submit' />
      <button onClick={() => setOpen((prev) => !prev)}>Cancel</button>
      <button onClick={handleDelete}>Delete</button>
    </form>
  );
};

export default EditViewTicketModal;
