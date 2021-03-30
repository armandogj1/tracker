import { Router } from 'express';
import validateTicket from '../middleware/validateTicket';
import {
  postTicketController,
  putTicketController,
  deleteTicketController,
} from '../controller/Ticket';
const router = Router();

router.use(validateTicket);

router.post('/', postTicketController);
router.delete('/', deleteTicketController);
router.put('/', putTicketController);

export default router;
