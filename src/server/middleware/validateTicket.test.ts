import { Request, Response, NextFunction } from 'express';
import validateTicket from './validateTicket';

const mockRequest = (params = {}, body = {}, query = {}) => {
  const req = { params, body, query } as Request;

  return req;
};

const mockResponse = () => {
  const res = {} as Response;

  res.status = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();

  return res;
};

const mockNext = () => {
  return jest.fn().mockReturnValue('Next Called') as NextFunction;
};

test('Should send status 400 for empty body', () => {
  const req = mockRequest();
  const res = mockResponse();
  const next = mockNext();

  validateTicket(req, res, next);
  expect(res.status).toBeCalledTimes(1);
  expect(res.status).toBeCalledWith(400);
  expect(res.send).toBeCalledWith('Invalid payload');
  expect(next).toBeCalledTimes(0);
});

describe('Should send status 400 for invalid payload', () => {
  const invalidPayloads = [
    { board_id: 'one' },
    { statuses: 'added' },
    { title: ['job'] },
    { ticket_id: 'two' },
    { status: {} },
  ];

  invalidPayloads.forEach((payload) => {
    test(`payload: ${JSON.stringify(payload)}`, () => {
      const req = mockRequest({}, payload);
      const res = mockResponse();
      const next = mockNext();

      validateTicket(req, res, next);
      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith('Invalid payload');
      expect(next).toBeCalledTimes(0);
    });
  });
});

test('Should call next for valid payload', () => {
  const req = mockRequest(
    {},
    {
      board_id: 1,
      ticket_id: 2,
      link: 'example.com',
      status: 'added',
      description: 'description',
      title: 'job 1',
    }
  );
  const res = mockResponse();
  const next = mockNext();

  validateTicket(req, res, next);
  expect(res.status).toBeCalledTimes(0);
  expect(next).toBeCalledTimes(1);
});
