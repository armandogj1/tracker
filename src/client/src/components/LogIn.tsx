import React, {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import { useIsAuth, useLogin, useNewUser } from '../hooks/useAuth';
import { RouteComponentProps } from 'react-router-dom';
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
};

const LogInOrCreate = ({ history }: RouteComponentProps) => {
  const defaultInputs = { email: '', password: '' };
  const [inputs, setInputs] = useState(defaultInputs);
  const [action, setAction] = useState('login');
  const { data: token } = useIsAuth();
  const { mutateAsync: logUser } = useLogin();
  const { mutateAsync: createUser } = useNewUser();

  if (token) {
    history.push('/');
  }

  const handleChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    const newInputs = { ...inputs, [e.target.name]: e.target.value };

    setInputs(newInputs);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (action === 'login') {
      return logUser(inputs)
        .then(() => history.push('/'))
        .catch((e) => console.log(e));
    }

    createUser(inputs)
      .then(() => history.push('/'))
      .catch((e) => console.log(e));
  };

  const handleAction: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (action === 'login') return setAction('createAccount');

    setAction('login');
  };

  return (
    <div className='modal login'>
      <h3>{action === 'login' ? 'Login' : 'Sign Up'}</h3>
      <form onChange={handleChange} onSubmit={handleSubmit}>
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
      <button onClick={handleAction}>
        {action === 'login' ? 'Create Account' : 'Login'}
      </button>
    </div>
  );
};

export default LogInOrCreate;
