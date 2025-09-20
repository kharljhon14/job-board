import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

import { db } from '@/db/drizzle';
import { insertJobSchema, jobs } from '@/db/schema';

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
    zValidator('json', insertJobSchema.omit({ createdAt: true, updatedAt: true })),
    async (c) => {
      const values = c.req.valid('json');

      return c.json({ data: values });
    }
  );

export default app;
