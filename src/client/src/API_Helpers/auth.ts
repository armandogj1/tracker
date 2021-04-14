import axios from 'axios';

const postNewUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  let URL = `/auth/create`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios.post(URL, { email, password }).then(({ data }) => data);
};

const postLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  let URL = `/auth/login`;

  if (process.env.NODE_ENV !== 'production') {
    URL = `http://localhost:4000${URL}`;
  }

  return axios.post(URL, { email, password }).then(({ data }) => data);
};

export { postNewUser, postLogin };
