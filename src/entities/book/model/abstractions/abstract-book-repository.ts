import type { DeleteResult } from 'mongoose';

import type { IBook } from '../../domain.js';

export abstract class AbstractBookRepository {
  public abstract createBook(book: IBook): Promise<IBook>;

  public abstract getUniqBook(id: string): Promise<IBook | null>;

  public abstract getBooks(): Promise<IBook[]>;

  public abstract updateBook(id: string, book: IBook): Promise<IBook>;

  public abstract deleteBook(id: string): Promise<DeleteResult>;
}
