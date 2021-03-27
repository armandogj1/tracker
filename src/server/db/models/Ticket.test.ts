import mongoose from 'mongoose';
import { createTicket } from './Ticket';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

test('should add a ticket to database', async (done) => {
  const ticket = {
    ticket_id: 1,
    title: 'first job offer',
    description: 'I work at Goldman Sachs now',
    link: '',
  };

  const saved = await createTicket(ticket);

  expect(saved).toMatchObject(ticket);
  done();
});

afterAll(async () => {
  await mongoose.connection.dropCollection('tickets');
  await mongoose.connection.close();
});
