const removeToken = () => {
  return new Promise((resolve, reject) => {
    localStorage.removeItem('tktit_token');

    if (localStorage.getItem('tktit_token')) {
      return reject(new Error('Error removing token'));
    }

    resolve('token removed');
  });
};

export default removeToken;
