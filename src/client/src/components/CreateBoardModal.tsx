import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { IBoard } from '../API_Helpers/Board';
import { useCreateBoard } from '../hooks/useBoard';

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
  },
  textarea: {
    width: '250px',
    height: '100px',
  },
};

const CreateBoardModal = ({
  setBoardId,
}: {
  setBoardId: Dispatch<SetStateAction<string>>;
}) => {
  const initialBoard: IBoard = {
    board_id: '',
    title: '',
    description: '',
    tickets: {},
    statuses: [],
  };
  const [board, setBoard] = useState(initialBoard);
  const { mutateAsync } = useCreateBoard();

  const handleChange = (e: IEventTarget) => {
    if (!e) return;

    let newValue: string | string[] = e.target?.value;

    if (e.target?.name === 'statuses') {
      newValue = newValue.split(',');
    }

    const newBoard = {
      ...board,
      [e.target?.name]: newValue,
    };

    setBoard(newBoard);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(board).then(({ board_id }) => setBoardId(board_id));
  };

  return (
    <form style={style.main} onSubmit={handleSubmit}>
      <label>
        Title:
        <input type='text' name='title' value={board.title} onChange={handleChange} />
      </label>
      <label>
        Statuses:
        <input
          type='text'
          name='statuses'
          value={board.statuses.join(',')}
          placeholder='comma separated values'
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          style={style.textarea}
          name='description'
          value={board.description}
          onChange={handleChange}
        />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
};

export default CreateBoardModal;
