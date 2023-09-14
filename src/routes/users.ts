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
    // get all users
    .get('/', () => getAllUsers())

    // get a user by id
    .get('/:id', ({ params: { id } }) => getUser(id))

    // create an new user
    .post('/signup', ({ body }) => createUser(body), {
      body: t.Object({
        firstName: t.String(),
        lastName: t.String(),
        email: t.String(),
        password: t.String(),
        userName: t.String(),
        summary: t.Optional(t.String()),
        profileImage: t.Optional(t.String()),
      }),
    })

    // update a user
    .patch('/:id', ({ params: { id }, body }) => updateUser(id, body), {
      body: t.Object({
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
