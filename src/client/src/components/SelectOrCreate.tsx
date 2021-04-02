import React, { Dispatch, SetStateAction, useState } from 'react';
import CreateBoardModal from './CreateBoardModal';
import SelectBoard from './SelectBoard';

const style = {
  button: {
    height: '200px',
    width: '200px',
    margin: '10px',
    'border-radius': '10px',
    backgroundColor: '#ffffff80',
    cursor: 'pointer',
  },
};

const SelectOrCreate = ({
  setBoardId,
}: {
  setBoardId: Dispatch<SetStateAction<string>>;
}) => {
  const [selected, setSelected] = useState('');

  if (!selected) {
    return (
      <section className='select-create'>
        <button style={style.button} onClick={() => setSelected('create')}>
          Create Board
        </button>
        <button style={style.button} onClick={() => setSelected('select')}>
          Select Board
        </button>
      </section>
    );
  }

  return (
    <section className='selectOrCreate'>
      {selected === 'create' ? (
        <CreateBoardModal setBoardId={setBoardId} />
      ) : (
        <SelectBoard setBoardId={setBoardId} />
      )}
    </section>
  );
};

export default SelectOrCreate;
