import type { Request, Response } from 'express';

import { container } from '~/container.js';
import { BookService } from '~/features/book/index.js';

const getBooksView = async (_: Request, res: Response) => {
  const bookService = container.get(BookService);
  const books = await bookService.getBooks();

  if (!books) {
    res.redirect('/404');
  }

  res.render('book/index', {
    title: 'Книга',
    books,
  });
};

const getUniqBookView = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookService = container.get(BookService);
  const book = await bookService.getUniqBook(id);

  if (!book) {
    res.redirect('/404');
  }

  res.render('book/view', {
    title: book?.title,
    book,
  });
};

const getCreateBookView = (_: Request, res: Response) => {
  res.render('book/create', {
    title: 'Book | Create',
    book: {},
  });
};

const createBook = async (req: Request, res: Response) => {
  const book = req.body;
  const bookService = container.get(BookService);
  const createdBook = await bookService.createBook(book);

  if (!createdBook) {
    res.redirect('/404');
  }

  res.redirect('/books');
};

const getUpdateBookView = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookService = container.get(BookService);
  const book = await bookService.getUniqBook(id);

  if (!book) {
    res.redirect('/404');
  }

  res.render('book/update', {
    title: 'Book | view',
    book,
  });
};

const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = req.body;
  const bookService = container.get(BookService);
  const updatedBook = await bookService.updateBook(id, book);

  if (!updatedBook) {
    res.redirect('/404');
  }

  res.redirect(`/books/${updatedBook.id}`);
};

const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookService = container.get(BookService);
  const deletedBook = await bookService.deleteBook(id);

  if (!deletedBook.acknowledged) {
    res.redirect('/404');
  }

  res.redirect(`/books`);
};

export const booksRoutes = {
  getBooksView,
  getCreateBookView,
  getUniqBookView,
  createBook,
  getUpdateBookView,
  updateBook,
  deleteBook,
};
