import { createToken, isTokenValid } from './Token';

test('Should create token', async (done) => {
  const payload = { email: 'test@test.test', password: 'secret' };
  const token = await createToken(payload);

  expect(token).toBeTruthy();
  done();
});

test('Should validate token', async (done) => {
  const payload = { email: 'test@test.test', password: 'secret' };
  const token = await createToken(payload);

  const validated = await isTokenValid(token);
  expect(validated.email).toBe(payload.email);
  done();
});

test('Should not validate token', async (done) => {
  const payload = { email: 'test@test.test', password: 'secret' };
  const token = await createToken(payload);
  const tokenArr = token.split('.');
  tokenArr[1] = tokenArr[1] + 'addedMoreText';
  const modified = tokenArr.join('.');

  try {
    const validated = await isTokenValid(modified);
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
  }

  done();
});
