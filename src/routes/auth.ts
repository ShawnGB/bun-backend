import { Elysia, t } from 'elysia';
import { createUser, login, validateUser } from '../controllers/auth';

const auth = new Elysia().group('auth', (app) =>
  app
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

    .post('/validate', () => validateUser())
    .post('/login', ({ body }) => login(body), {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    })
);

export { auth };
