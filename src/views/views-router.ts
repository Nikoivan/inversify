import type { Request, Response } from 'express';
import { Router } from 'express';

import { bookViewRouter } from '~/views/book/book-view-router.js';

export const viewsRouter = Router();

viewsRouter.get('/', (request: Request, response: Response) => {
  response.render('index', {
    title: 'Главная',
  });
});
viewsRouter.use('/books', bookViewRouter);
