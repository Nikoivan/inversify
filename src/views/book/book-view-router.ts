import { Router } from 'express';

import { booksRoutes } from '../../features/book/routes/book-routes.js';

export const bookViewRouter = Router();

bookViewRouter.get('/', booksRoutes.getBooksView);
bookViewRouter.get('/create', booksRoutes.getCreateBookView);
bookViewRouter.post('/create', booksRoutes.createBook);
bookViewRouter.get('/:id', booksRoutes.getUniqBookView);
bookViewRouter.get('/update/:id', booksRoutes.getUpdateBookView);
bookViewRouter.post('/update/:id', booksRoutes.updateBook);
bookViewRouter.post('/delete/:id', booksRoutes.deleteBook);
