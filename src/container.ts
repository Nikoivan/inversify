import { Container } from 'inversify';

import { BookRepository } from './entities/book/index.js';
import { BookService } from './features/book/index.js';

export const container = new Container();
container.bind(BookRepository).toSelf().inSingletonScope();
container.bind(BookService).toSelf().inSingletonScope();
