import { Router } from 'express';
import validateBoard from '../middleware/validateBoard';
import {
  getBoardController,
  deleteBoardController,
  postBoardController,
  putBoardController,
} from '../controller/Board';
const router = Router();

router.get('/:board_id', getBoardController);
router.delete('/:board_id', deleteBoardController);

// validate remaining routes
router.use(validateBoard);

router.post('/', postBoardController);
router.put('/', putBoardController);

export default router;
