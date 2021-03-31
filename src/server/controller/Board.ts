import { getBoard, createBoard, deleteBoard, updateBoard } from '../db/models/Board';
import { Request, Response } from 'express';
import cleanDocument from '../utils/cleanDocument';

const getBoardController = async (req: Request, res: Response) => {
  try {
    if (!req.params.board_id) {
      throw new Error('Error board_id not present');
    }

    const board = await getBoard(req.params.board_id);

    if (!board) {
      throw new Error('Error board not found');
    }

    res.status(200).send(cleanDocument(board));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const postBoardController = async (req: Request, res: Response) => {
  try {
    const board = await createBoard(req.body);

    res.status(200).send(cleanDocument(board));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const putBoardController = async (req: Request, res: Response) => {
  try {
    const board = await updateBoard(req.body);

    res.status(200).send(cleanDocument(board));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const deleteBoardController = async (req: Request, res: Response) => {
  try {
    await deleteBoard(req.body.board_id);

    res.status(200).send(`board ${req.body.board_id} deleted`);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export {
  getBoardController,
  deleteBoardController,
  postBoardController,
  putBoardController,
};
