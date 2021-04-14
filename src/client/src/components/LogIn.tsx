import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from 'react';
import { useLogin } from '../hooks/useAuth';

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
};

const LogIn = () => {
  const defaultInputs = { email: '', password: '' };
  const [inputs, setInputs] = useState(defaultInputs);
  const { mutateAsync } = useLogin();

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const newInputs = { ...inputs, [e.target.name]: e.target.value };

    setInputs(newInputs);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutateAsync(inputs).catch((e) => console.log(e));
  };

  return (
    <form
      className='modal'
      style={style.main}
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <label>
        Email:
        <input type='text' name='email' value={inputs.email} />
      </label>

      <label>
        Password:
        <input type='text' name='password' value={inputs.password} />
      </label>

      <input type='submit' value='Submit' />
    </form>
  );
};

export default LogIn;
