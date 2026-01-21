import { Container } from 'inversify';

import { BookRepository } from './entities/book/index.js';

export const container = new Container();
container.bind(BookRepository).toSelf();
