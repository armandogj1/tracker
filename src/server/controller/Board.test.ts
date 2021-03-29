import { deleteBoardController, getBoardController } from './Board';
import { Request, Response } from 'express';
jest.mock('../db/models/Board', () => {
  return {
    getBoard: (id: any) => {
      if (typeof id !== 'number') {
        throw new Error('Error board not found');
      }

      return Promise.resolve(`board ${id}`);
    },
    deleteBoard: (id: any) => {
      if (typeof id !== 'number') {
        throw new Error('Error board not found');
      }

      return Promise.resolve(`board ${id} deleted`);
    },
  };
});

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

test('Should respond with status 400', () => {
  const req = mockRequest();
  const res = mockResponse();

  getBoardController(req, res);
  expect(res.status).toBeCalledTimes(1);
  expect(res.status).toBeCalledWith(400);
  expect(res.send).toBeCalledTimes(1);
  expect(res.send).toBeCalledWith('Error board_id not present');
});

test('Should respond with status 200', async (done) => {
  const req = mockRequest({}, { board_id: 1 });
  const res = mockResponse();

  await getBoardController(req, res);
  expect(res.status).toBeCalledTimes(1);
  expect(res.status).toBeCalledWith(200);
  expect(res.send).toBeCalledTimes(1);
  expect(res.send).toBeCalledWith('board 1');
  done();
});

test('Should respond with status 400 for invalid id', async (done) => {
  const req = mockRequest({}, { board_id: '1' });
  const res = mockResponse();

  await getBoardController(req, res);
  expect(res.status).toBeCalledTimes(1);
  expect(res.status).toBeCalledWith(400);
  expect(res.send).toBeCalledTimes(1);
  expect(res.send).toBeCalledWith('Error board not found');
  done();
});

test('Should not delete board', () => {
  const req = mockRequest({}, { board_id: '1' });
  const res = mockResponse();

  deleteBoardController(req, res);
  expect(res.status).toBeCalledTimes(1);
  expect(res.status).toBeCalledWith(400);
  expect(res.send).toBeCalledTimes(1);
  expect(res.send).toBeCalledWith('Error board not found');
});

test('Should delete board', () => {
  const req = mockRequest({}, { board_id: 1 });
  const res = mockResponse();

  deleteBoardController(req, res);
  expect(res.status).toBeCalledTimes(1);
  expect(res.status).toBeCalledWith(200);
  expect(res.send).toBeCalledTimes(1);
  expect(res.send).toBeCalledWith('board 1 deleted');
});
