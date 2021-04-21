import { Dispatch, FormEvent, FormEventHandler, SetStateAction, useState } from 'react';
import { TDynamicInputTuple } from './DynamicTicketModal';

const AddInput = ({
  setOpen,
  updateList,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  updateList: (tuple: TDynamicInputTuple) => void;
}) => {
  const [kind, setKind] = useState('');
  const [name, setName] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newType = kind === 'link' ? 'url' : kind === 'small' ? 'text' : kind;
    const newTuple = [kind, newType, name] as TDynamicInputTuple;
    updateList(newTuple);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <select onChange={(e) => setKind(e.target.value)}>
          <option key='small' value='small'>
            Short Text
          </option>
          <option key='large' value='large'>
            Long Text
          </option>
          <option key='email' value='email'>
            Email
          </option>
          <option key='link' value='link'>
            Link
          </option>
        </select>
      </label>
      <label>
        Name:
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type='submit'>Add</input>
    </form>
  );
};

export default AddInput;
