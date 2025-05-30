import {Router} from 'express';
import authRoutes from './auth.route';

const rootRoutes: Router = Router();

rootRoutes.use('/auth', authRoutes);

export default rootRoutes;