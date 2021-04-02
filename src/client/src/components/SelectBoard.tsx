import { NONAME } from 'node:dns';
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useBoardIds } from '../hooks/useBoard';

const style = {
  form: {
    height: '200px',
    width: '500px',
    margin: '10px',
    'border-radius': '10px',
    backgroundColor: '#ffffff80',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'space-evenly',
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

const SelectBoard = ({
  setBoardId,
}: {
  setBoardId: Dispatch<SetStateAction<string>>;
}) => {
  const { data, isError } = useBoardIds();
  const [selected, setSelected] = useState('');
  if (isError) return <p>Something went wrong getting Boards</p>;
  if (!data) return <p>No Boards</p>;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected) return;

    setBoardId(selected);
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
      <input style={style.button} type='submit' value='Submit' />
    </form>
  );
};

export default SelectBoard;
