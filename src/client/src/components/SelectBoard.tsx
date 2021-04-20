import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { ITokenData } from '../helpers/getToken';
import { useBoard, useBoardIds } from '../hooks/useBoard';
import { RouteComponentProps } from 'react-router-dom';

const style = {
  form: {
    height: '200px',
    width: '500px',
    margin: '10px',
    'border-radius': '10px',
  },
  select: {
    'font-size': '1.5em',
    width: '150px',
    border: 'none',
    backgroundColor: 'transparent',
    'border-bottom': '1px solid black',
  },
  button: {
    color: '#fff',
    backgroundColor: '#333',
    cursor: 'pointer',
  },
};

const SelectBoard = ({ history }: RouteComponentProps) => {
  const queryClient = useQueryClient();
  const authData: ITokenData = queryClient.getQueryData('auth') || {
    user: '',
    token: '',
  };
  const { data, isError } = useBoardIds(authData.token);
  const [selected, setSelected] = useState('');
  const { isError: isErrorBoard } = useBoard(selected, authData.token);

  if (isError) return <p>Something went wrong getting Boards</p>;
  if (!data) return <p>No Boards</p>;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected) {
      console.log('triggered break out in SelectBoard');
      return;
    }

    if (isErrorBoard) {
      console.log('get board threw error and a fetch was not done');
      return;
    }

    history.push(`board/${selected}`);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  return (
    <form className='modal' style={style.form} onSubmit={handleSubmit}>
      <label>
        Pick Board:
        <select
          style={style.select}
          placeholder='Select Board'
          value={selected}
          onChange={handleChange}
        >
          <option value='' disabled selected hidden>
            Boards
          </option>
          {data.map(([bId, title]) => (
            <option key={bId} value={bId}>
              {title}
            </option>
          ))}
        </select>
      </label>
      <input className='submit' type='submit' value='Submit' />
    </form>
  );
};

export default SelectBoard;
