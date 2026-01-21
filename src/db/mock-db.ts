import { BookEntity } from '../entities/book/mock-book-entity.js';

class MockDb {
  _book: BookEntity = new BookEntity();

  public get book() {
    return this._book;
  }
}

export const mockDb: MockDb = new MockDb();
