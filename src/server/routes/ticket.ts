import { Router } from 'express';
import validateTicket from '../middleware/validateTicket';
import { getTicketController, deleteTicketController } from '../controller/Ticket';
const router = Router();

router.use(validateTicket);

router.get('/', getTicketController);
router.delete('/', deleteTicketController);

export default router;
