import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { db } from '@/db/drizzle';
import { insertJobSchema, jobs } from '@/db/schema';
import { formatZodError } from '@/lib/utils';

const app = new Hono()
  .get(async (c) => {
    const data = await db
      .select({
        id: jobs.id
      })
      .from(jobs);

    return c.json({ data: data });
  })
  .post(
    '/',
    clerkMiddleware(),
    zValidator(
      'json',
      insertJobSchema.omit({ createdAt: true, updatedAt: true, userId: true, id: true }),
      (result, c) => {
        if (!result.success) {
          return c.json({ error: formatZodError(result.error) }, 400);
        }
      }
    ),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: 'unauthorized' }, 401);
      }

      const values = c.req.valid('json');
      return c.json({ data: values });
    }
  );

export default app;
