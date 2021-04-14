import mongoose from 'mongoose';
import { doesNotMatch } from 'node:assert';
import { createUser } from './User';

beforeAll(async () => {
  return mongoose.connect('mongodb://localhost:27017/testDBUser', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

test('Should create user', async (done) => {
  const payload = { email: 'test111@test.com', password: 'secret' };
  jest.setTimeout(10000); // 10 second timeout
  const user = await createUser(payload);

  expect(user).toBeTruthy();
  done();
});

afterAll((done) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return mongoose.connection.close();
    })
    .then(() => done());
});
