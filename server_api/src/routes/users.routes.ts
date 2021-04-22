import { Router } from 'express';

import { ensureAuthenticated } from '../config/guards.config';
import {
  signup,
  uploadImage,
  userProfile,
  userList,
} from '../controllers/users.controller';

const router = Router();

router.get('/', userList);
router.get('/:username', userProfile);
router.post('/signup', signup);
router.post('/update/image', ensureAuthenticated, uploadImage);

export default router;
