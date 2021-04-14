import { useMutation, useQuery, useQueryClient } from 'react-query';
import { postNewUser, postLogin } from '../API_Helpers/auth';
import getToken from '../helpers/getToken';

const useNewUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (credentials: { email: string; password: string }) => postNewUser(credentials),
    {
      onSuccess: (data, { email }) => {
        const authToken = { user: email, token: data };
        localStorage.setItem('tktit_token', JSON.stringify(authToken));
        queryClient.invalidateQueries('auth');
      },
    }
  );
};

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (credentials: { email: string; password: string }) => postLogin(credentials),
    {
      onSuccess: (data, { email }) => {
        const authToken = { user: email, token: data };
        localStorage.setItem('tktit_token', JSON.stringify(authToken));
        queryClient.invalidateQueries('auth');
      },
    }
  );
};

const useIsAuth = () => {
  // const [token, setToken] = useState(localStorage.getItem('tktit_token') || '');

  return useQuery(['auth'], getToken);
};

export { useNewUser, useLogin, useIsAuth };
