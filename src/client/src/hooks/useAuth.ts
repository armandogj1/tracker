import { useMutation, useQuery, useQueryClient } from 'react-query';
import { postNewUser, postLogin } from '../API_Helpers/auth';
import getToken from '../helpers/getToken';
import removeToken from '../helpers/removeToken';

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

  return useQuery(['auth'], getToken, { retryOnMount: false, retry: false });
};

const useLogOut = () => {
  const queryClient = useQueryClient();

  return useMutation(removeToken, {
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export { useNewUser, useLogin, useIsAuth, useLogOut };
