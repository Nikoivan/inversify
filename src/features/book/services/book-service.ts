import type { DeleteResult } from 'mongoose';

import { container } from '~/container.js';
import { BookRepository } from '~/entities/book/repositories/book-repository.js';

import { type BookSchema } from '../../../db/models/book-schema.js';
import { BookError } from '../model/book-error.js';
import { typeguards } from '../model/typeguards.js';

const bookRepository = container.get(BookRepository);

export class BookService {
  public async getBooks(): Promise<BookSchema[] | null> {
    try {
      const books: BookSchema[] = await bookRepository.getBooks();

      if (!books) {
        return null;
      }

      return books;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  public async getUniqBook(id: string): Promise<BookSchema | null> {
    try {
      if (!id) {
        throw new BookError('Отсутствует идентификатор книги', 404);
      }

      const book = await bookRepository.getUniqBook(id);

      if (!book) {
        throw new BookError(`Книга с идентификаторм ${id} не найдена`, 404);
      }

      return book;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  public async createBook(book: BookSchema): Promise<BookSchema | null> {
    try {
      const isBook = typeguards.isBook(book);

      if (!isBook) {
        throw new BookError(
          `Validation error! ${JSON.stringify(book)} in not Book.`,
        );
      }

      const createdBook = await bookRepository.createBook(book);

      if (!createdBook) {
        throw new BookError('Ошибка при создание книги');
      }

      return createdBook;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  public async updateBook(
    id: string,
    book: BookSchema,
  ): Promise<BookSchema | null> {
    try {
      if (!id) {
        console.error('Id is missing');

        return null;
      }

      const foundedBook = await bookRepository.getUniqBook(id);

      if (!foundedBook) {
        console.error(`Книга с идентификаторм ${id} не найдена`);

        return null;
      }

      const isBook = typeguards.isBook(book);

      if (!isBook) {
        console.error(`Validation error! ${JSON.stringify(book)} in not Book.`);

        return null;
      }

      const updatedBook = await bookRepository.updateBook(id, book);

      if (!updatedBook) {
        console.error('Ошибка при обновление книги');

        return null;
      }
      return updatedBook;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  public async deleteBook(id: string): Promise<DeleteResult | null> {
    try {
      if (!id) {
        console.error('Отсутствует идентификатор книги');

        return null;
      }

      const book = await bookRepository.deleteBook(id);

      if (!book) {
        console.error(`Книга с идентификаторм ${id} не найдена`);

        return null;
      }

      return book;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}

export const bookService = new BookService();
