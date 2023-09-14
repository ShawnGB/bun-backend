import { Elysia, t } from 'elysia';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user';

const users = new Elysia().group('users', (app) =>
  app
    // get all users
    .get('/', () => getAllUsers())

    // get a user by id
    .get('/:id', ({ params: { id } }) => getUser(id), {
      params: t.Object({ id: t.String() }),
    })

    // update a user
    .patch('/:id', ({ body }) => updateUser(body), {
      body: t.Object({
        id: t.String(),
        firstName: t.Optional(t.String()),
        lastName: t.Optional(t.String()),
        email: t.Optional(t.String()),
        userName: t.Optional(t.String()),
        summary: t.Optional(t.String()),
        profileImage: t.Optional(t.String()),
      }),
    })

    // delete a user
    .delete('/:id', ({ params: { id } }) => deleteUser(id))
);

export { users };
