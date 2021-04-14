export interface ITokenData {
  user: string;
  token: string;
}

const getToken = (): Promise<ITokenData> => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('tktit_token');

    if (!token) return reject(new Error('No Token'));
    const tokenObj: ITokenData = JSON.parse(token);
    resolve(tokenObj);
  });
};

export default getToken;
