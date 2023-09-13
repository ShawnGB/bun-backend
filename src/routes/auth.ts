import Elysia from 'elysia';

const auth = new Elysia().group('auth', (app) =>
  app.get('/', () => 'Hello World!')
);

export { auth };
