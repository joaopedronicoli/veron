import { Router } from 'express';
import authRoutes from './auth.routes';
import perfumeRoutes from './perfume.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/perfumes', perfumeRoutes);
router.use('/users', userRoutes);

export default router;
