import { Elysia } from 'elysia';
import { users } from './routes/users';
import { auth } from './routes/auth';
import { cookie } from '@elysiajs/cookie';
import { jwt } from '@elysiajs/jwt';

const app = new Elysia()
  .get('/', () => 'Hello Elysia')
  .use(
    jwt({
      name: 'jwt',
      secret: Bun.env.JWT_SECRET!,
    })
  )
  .use(cookie())
  .use(users)
  .use(auth)
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

console.log(Bun.env.DATABASE_URL);
