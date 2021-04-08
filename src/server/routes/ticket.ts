import { Router } from 'express';
import validateTicket from '../middleware/validateTicket';
import {
  postTicketController,
  putTicketController,
  deleteTicketController,
} from '../controller/Ticket';
const router = Router();

router.delete('/', deleteTicketController);

router.use(validateTicket);
router.post('/', postTicketController);
router.put('/', putTicketController);

export default router;
