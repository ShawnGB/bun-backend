import { Elysia } from 'elysia';
import { users } from './routes/users';
import { auth } from './routes/auth';
import { cookie } from '@elysiajs/cookie';
import cors from '@elysiajs/cors';

const app = new Elysia()
  .get('/', () => 'Hello Elysia')
  .use(cookie())
  .use(users)
  .use(auth)
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
