import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ITicket } from '../API_Helpers/Board';
import { ITokenData } from '../helpers/getToken';
import { useCreateTicket } from '../hooks/useTicket';

interface IEventTarget {
  target: HTMLInputElement | HTMLTextAreaElement;
}

const style = {
  main: {
    display: 'flex',
    'flex-direction': 'column',
    'border-radius': '10px',
    backgroundColor: '#fff',
    height: '300px',
    width: '300px',
    padding: '1em',
    color: 'black',
    'z-index': '3',
  },
  textarea: {
    width: '250px',
    height: '100px',
  },
};

const CreateTicketModal = ({
  status,
  board_id,
  setCreateOpen,
}: {
  status: string;
  board_id: string;
  setCreateOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const initialBoard: ITicket = {
    status,
    ticket_id: '',
    title: '',
    description: '',
    link: '',
    timestamps: {},
  };
  const queryClient = useQueryClient();
  const authData: ITokenData = queryClient.getQueryData('auth') || {
    user: '',
    token: '',
  };
  const { mutateAsync } = useCreateTicket(authData.token);
  const [ticket, setTicket] = useState(initialBoard);

  const handleChange = (e: IEventTarget) => {
    if (!e) return;

    const newTicket = {
      ...ticket,
      [e.target?.name]: e.target.value,
    };

    setTicket(newTicket);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync({ ticket, board_id }).then(() => setCreateOpen((prev) => !prev));
  };

  return (
    <form className='modal' style={style.main} onSubmit={handleSubmit}>
      <label>
        Title:
        <input type='text' name='title' value={ticket.title} onChange={handleChange} />
      </label>
      <label>
        Link:
        <input type='text' name='link' value={ticket.link} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea
          style={style.textarea}
          name='description'
          value={ticket.description}
          onChange={handleChange}
        />
      </label>
      <input type='submit' value='Submit' />
      <button onClick={() => setCreateOpen((prev) => !prev)}>Cancel</button>
    </form>
  );
};

export default CreateTicketModal;
