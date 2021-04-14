import { Router } from 'express';
import { logIn, postUser } from '../controller/User';

const router = Router();

router.post('/create', postUser);
// router.delete('/:email', )
router.post('/login', logIn);

export default router;
