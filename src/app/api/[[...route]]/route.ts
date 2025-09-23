import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { handle } from 'hono/vercel';

import health from './health';
import jobs from './jobs';
import users from './users';
import webhooks from './webhooks';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  console.log(err.message);
  return c.json({ error: 'internal server error' }, 500);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
const routes = app
  .route('/health', health)
  .route('/users', users)
  .route('/jobs', jobs)
  .route('/webhooks', webhooks);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
