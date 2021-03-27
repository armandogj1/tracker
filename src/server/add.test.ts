import add from './add';

test('should return a number', () => {
  const sum = add(4, 6);
  expect(sum).toBe(10);
});
