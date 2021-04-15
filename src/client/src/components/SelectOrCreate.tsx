import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SelectOrCreate.css';

const SelectOrCreate = () => {
  return (
    <section className='select-create'>
      <Link to='/create'>Create Board</Link>
      <Link to='/select'>Select Board</Link>
    </section>
  );
};

export default SelectOrCreate;
