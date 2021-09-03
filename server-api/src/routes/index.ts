import { Router } from 'express';

import users from './users.routes';
import auth from './auth.routes';

const router = Router();

router.use('/api/users', users);
router.use('/api/auth', auth);

export default router;
