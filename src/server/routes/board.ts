import { Router } from 'express';
import validateBoard from '../middleware/validateBoard';
import {
  getBoardController,
  deleteBoardController,
  postBoardController,
  putBoardController,
} from '../controller/Board';
const router = Router();

router.use(validateBoard);

router.get('/', getBoardController);
router.post('/', postBoardController);
router.put('/', putBoardController);
router.delete('/', deleteBoardController);

export default router;
