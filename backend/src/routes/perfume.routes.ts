import { Router } from 'express';
import * as perfumeController from '../controllers/perfume.controller';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

router.get('/', perfumeController.list);
router.get('/:slug', perfumeController.getBySlug);
router.post('/', authenticate, requireRole('ADMIN'), perfumeController.create);
router.put('/:id', authenticate, requireRole('ADMIN'), perfumeController.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), perfumeController.remove);

export default router;
