import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import AddInput from './AddInput';
import DynamicInputElement, { isKindValid } from './DynamicInputElement';

const defaultInputs: { [key: string]: string } = {
  title: '',
};

type TDynamicInputKind = 'small' | 'large' | 'email' | 'link';
type TDynamicInputType = 'url' | 'text' | 'email';
export type TDynamicInputTuple = [TDynamicInputKind, TDynamicInputType, string];

const defaultInputList = [] as TDynamicInputTuple[];

const DynamicTicketModal = () => {
  const [inputs, setInputs] = useState(defaultInputs);
  const [inputList, setInputList] = useState(defaultInputList);
  const [isAddOpen, setAddOpen] = useState(false);

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newInputs = { ...inputs, [e.target.name]: e.target.value };

    setInputs(newInputs);
  };

  const updateList = (newTuple: TDynamicInputTuple) => {
    const newList = [...inputList, newTuple];

    setInputList(newList);
  };

  const handleInputAdd: MouseEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className='modal'>
      <form onChange={handleChange}>
        <label>
          Title:
          <input type='text' name='title' value={inputs.title}></input>
        </label>
        {inputList.map(([kind, elType, elName]) => {
          if (!isKindValid(kind)) return null;
          return (
            <label>
              <DynamicInputElement
                kind={kind}
                type={elType}
                name={elName}
                value={inputs[elName]}
              />
            </label>
          );
        })}
        {isAddOpen ? (
          <button onClick={() => setAddOpen(true)}>+</button>
        ) : (
          <AddInput setOpen={setAddOpen} updateList={updateList} />
        )}
        <input className='submit' type='submit'>
          Submit
        </input>
      </form>
    </div>
  );
};

export default DynamicTicketModal;
