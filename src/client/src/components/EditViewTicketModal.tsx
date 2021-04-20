import React, {
  ChangeEventHandler,
  Dispatch,
  FormEvent,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from 'react';
import { useQueryClient } from 'react-query';
import { ITicket } from '../API_Helpers/Board';
import { ITokenData } from '../helpers/getToken';
import { useDeleteTicket, useUpdateTicket } from '../hooks/useTicket';
import '../styles/Modal.css';

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
  board_id,
  setOpen,
}: {
  ticket: ITicket;
  board_id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const authData: ITokenData = queryClient.getQueryData('auth') || {
    user: '',
    token: '',
  };
  const [tix, setTix] = useState(ticket);
  const [deleteButtonCount, setDeleteCount] = useState(0);
  const { mutateAsync } = useUpdateTicket(authData.token);
  const { mutateAsync: deleteHandler } = useDeleteTicket(authData.token);

  const defaultData: { statuses: string[] } = {
    statuses: [],
  };
  const { statuses }: { statuses: string[] } =
    queryClient.getQueryData(['board', board_id]) || defaultData;

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

  interface ITarget extends EventTarget {
    name?: string;
  }
  interface IEvent extends MouseEvent {
    target: ITarget;
  }

  const handleCountReset = (e: IEvent) => {
    if (!e.target || e.target.name !== 'delete') {
      return setDeleteCount(0);
    }
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (deleteButtonCount === 1) {
      return deleteHandler({ ticket_id: tix.ticket_id, board_id }).then(() =>
        setOpen(false)
      );
    }

    setDeleteCount((prev) => prev + 1);
  };

  return (
    <div onClick={handleCountReset}>
      <form
        className='modal ticket-modal'
        style={style.main}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <button
          className={deleteButtonCount ? 'submit delete' : 'submit'}
          name='delete'
          onClick={handleDelete}
        >
          Delete
        </button>
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
        <div>
          <input className='submit' type='submit' value='Submit' />
          <button className='submit' onClick={() => setOpen((prev) => !prev)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditViewTicketModal;
