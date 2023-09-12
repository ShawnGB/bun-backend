import { Elysia } from 'elysia';

const users = new Elysia().group('users', (app) =>
  app
    .get('/', () => 'user')
    .get('/:id', () => 'user')
    .post('/', () => '')
    .patch('/:id', () => '')
    .delete('/:id', () => '')
);

export { users };
