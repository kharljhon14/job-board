import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';
import { count, eq } from 'drizzle-orm';
import { Hono } from 'hono';
import z from 'zod/v4';

import { db } from '@/db/drizzle';
import { insertJobSchema, jobs, users } from '@/db/schema';
import { formatZodError, generateMetadata } from '@/lib/utils';

const app = new Hono()
  .get(
    zValidator(
      'query',
      z.object({
        page: z
          .string()
          .regex(RegExp(/^\d+$/), 'page must be a valid number')
          .optional()
          .default('1')
          .transform(Number),
        pageSize: z
          .string()
          .regex(RegExp(/^\d+$/), 'page size must be a valid number')
          .optional()
          .default('10')
          .transform(Number)
      }),
      (result, c) => {
        if (!result.success) {
          return c.json({ error: formatZodError(result.error) }, 400);
        }
      }
    ),
    async (c) => {
      const query = c.req.valid('query');

      const totalItems = await db.select({ count: count() }).from(jobs);

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
        .limit(query.pageSize)
        .offset((query.page - 1) * query.pageSize)
        .innerJoin(users, eq(jobs.userId, users.id));

      const metadata = generateMetadata(totalItems[0].count, query.page, query.pageSize);
      return c.json({ data, metadata });
    }
  )
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
