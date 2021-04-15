import { useQueryClient } from 'react-query';
import { ITokenData } from '../helpers/getToken';
import { useLogOut } from '../hooks/useAuth';
import { useHistory, Link } from 'react-router-dom';

const LogButton = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { token }: ITokenData = queryClient.getQueryData('auth') || {
    user: '',
    token: '',
  };

  const { mutateAsync } = useLogOut();

  const handleLogOut = () => {
    mutateAsync()
      .then(() => history.push('/'))
      .catch((e) => console.log(e));
  };

  return (
    <>
      {token ? (
        <button onClick={handleLogOut}>Logout</button>
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </>
  );
};

export default LogButton;
