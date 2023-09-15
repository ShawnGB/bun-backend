import { Elysia, t } from 'elysia';
import { createUser, login, validateUser } from '../controllers/auth';
import jwt from '@elysiajs/jwt';
import cookie from '@elysiajs/cookie';

const auth = new Elysia().group('auth', (app) =>
  app
    .use(
      jwt({
        name: 'jwt',
        secret: Bun.env.JWT_SECRET!,
      })
    )
    .use(cookie())
    .post('/signup', ({ body }) => createUser(body), {
      body: t.Object({
        firstName: t.String(),
        lastName: t.String(),
        email: t.String(),
        password: t.String(),
        username: t.String(), // Change userName to username
        bio: t.Optional(t.String()), // Change summary to bio
        profilePicture: t.Optional(t.String()),
      }),
    })
    .post('/validate', () => validateUser())
    .post(
      '/login',
      ({ body, jwt, setCookie }) => login({ body, jwt, setCookie }),
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
      }
    )
);

export { auth };
