import {Router} from 'express';
import rateRouter from './rateRouter.js';

const router = Router();

router.use('/rate', rateRouter);

export default router;