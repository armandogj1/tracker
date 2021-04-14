import bcryp from 'bcrypt';
import ENV from '../../env.config';
import { User } from '../schema';

type TUserInput = {
  email: string;
  password: string;
};

const createUser = async ({ email, password }: TUserInput) => {
  const hashedPassword = await bcryp.hash(password, ENV.SALT);
  console.log(typeof hashedPassword);
  return User.create({ email, password: hashedPassword });
};

const validateUser = async ({ email, password }: TUserInput) => {
  const savedUser = await User.findOne({ email }).exec();

  if (!savedUser) {
    throw new Error('No existing user');
  }

  const isValid = await bcryp.compare(password, savedUser.password);

  if (!isValid) {
    throw new Error('Invalid Password');
  }

  return isValid;
};

export { createUser, validateUser };
