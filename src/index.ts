import { Elysia } from 'elysia';
import { users } from './routes/users';

const app = new Elysia()
  .get('/', () => 'Hello Elysia')
  .use(users)
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
