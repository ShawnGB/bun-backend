import { Elysia, t } from 'elysia';
import { getAllUsers, createUser, getUser } from '../controllers/user';

const users = new Elysia().group('users', (app) =>
  app

    .get('/', () => getAllUsers())
    .get('/:id', ({ params: { id } }) => getUser(id))
    .post('/', ({ body }) => createUser(body), {
      body: t.Object({
        firstName: t.String(),
        lastName: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    })
    .patch('/:id', () => '')
    .delete('/:id', () => '')
);

export { users };
