import { Router } from 'express';

import { userRouter } from '../src/features/user/user-routes.js';

export const baseRouter = Router();

baseRouter.use('/user', userRouter);
