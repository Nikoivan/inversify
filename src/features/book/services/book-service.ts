import { inject, injectable } from 'inversify';
import type { DeleteResult } from 'mongoose';

import { type BookSchema } from '../../../db/models/book-schema.js';
import { BookRepository } from '../../../entities/book/repositories/book-repository.js';
import { BookError } from '../model/book-error.js';
import { typeguards } from '../model/typeguards.js';

@injectable()
export class BookService {
  constructor(
    @inject(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  public async getBooks(): Promise<BookSchema[] | null> {
    try {
      const books: BookSchema[] = await this.bookRepository.getBooks();

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

      const book = await this.bookRepository.getUniqBook(id);

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

      const createdBook = await this.bookRepository.createBook(book);

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

      const foundedBook = await this.bookRepository.getUniqBook(id);

      if (!foundedBook) {
        console.error(`Книга с идентификаторм ${id} не найдена`);

        return null;
      }

      const isBook = typeguards.isBook(book);

      if (!isBook) {
        console.error(`Validation error! ${JSON.stringify(book)} in not Book.`);

        return null;
      }

      const updatedBook = await this.bookRepository.updateBook(id, book);

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

      const book = await this.bookRepository.deleteBook(id);

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
