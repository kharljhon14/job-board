import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';

import { db } from '@/db/drizzle';
import { insertJobSchema, jobs, users } from '@/db/schema';
import { formatZodError } from '@/lib/utils';

const app = new Hono()
  .get(async (c) => {
    const data = await db
      .select({
        id: jobs.id,
        userId: jobs.userId,
        userName: users.name,
        title: jobs.title,
        description: jobs.description,
        salary: jobs.salary,
        type: jobs.type,
        status: jobs.status,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt
      })
      .from(jobs)
      .innerJoin(users, eq(jobs.userId, users.id));

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

      const data = await db
        .insert(jobs)
        .values({ id: createId(), userId: auth.userId, ...values })
        .returning();

      return c.json({ data: data });
    }
  );

export default app;
