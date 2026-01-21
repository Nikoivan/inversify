import { injectable } from 'inversify';
import type { DeleteResult } from 'mongoose';

import { Book } from '../../../db/models/book-schema.js';
import type { IBook } from '../domain.js';
import { AbstractBookRepository } from '../model/abstractions/abstract-book-repository.js';

@injectable()
export class BookRepository extends AbstractBookRepository {
  getBooks(): Promise<IBook[]> {
    return Book.find();
  }

  getUniqBook(id: string): Promise<IBook | null> {
    return Book.findById(id);
  }

  createBook(book: IBook): Promise<IBook> {
    return Book.create(book);
  }

  updateBook(id: string, book: IBook): Promise<IBook> {
    return Book.findByIdAndUpdate(id, book);
  }

  deleteBook(id: string): Promise<DeleteResult> {
    return Book.deleteOne({ _id: id });
  }
}
