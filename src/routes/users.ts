import { Elysia, t } from 'elysia';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user';

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
    .patch('/:id', ({ params: { id }, body }) => updateUser(id, body), {
      body: t.Object({
        firstName: t.String(),
        lastName: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    })
    .delete('/:id', ({ params: { id } }) => deleteUser(id))
);

export { users };
