import { Request, Response, NextFunction } from 'express';
import validateBoard from './validateBoard';

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

  validateBoard(req, res, next);
  expect(res.status).toBeCalledTimes(1);
  expect(res.status).toBeCalledWith(400);
  expect(res.send).toBeCalledWith('Invalid payload');
  expect(next).toBeCalledTimes(0);
});

describe('Should send status 400 for invalid payload', () => {
  const invalidPayloads = [{ board_id: 1 }, { statuses: 'added' }, { title: ['job'] }];

  invalidPayloads.forEach((payload) => {
    test(`payload: ${JSON.stringify(payload)}`, () => {
      const req = mockRequest({}, payload);
      const res = mockResponse();
      const next = mockNext();

      validateBoard(req, res, next);
      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(400);
      expect(res.send).toBeCalledWith('Invalid payload');
      expect(next).toBeCalledTimes(0);
    });
  });
});
