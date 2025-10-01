import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';
import { and, count, desc, eq, ilike, inArray, sql } from 'drizzle-orm';
import { Hono } from 'hono';
import z from 'zod/v4';

import { db } from '@/db/drizzle';
import { insertJobSchema, jobs, users } from '@/db/schema';
import { formatZodError, generateMetadata } from '@/lib/utils';

const app = new Hono()
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        userId: z.string().optional(),
        q: z.string().max(60).optional(),
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
          .transform(Number),
        status: z.enum(['active', 'closed', 'draft']).default('active')
      }),
      (result, c) => {
        if (!result.success) {
          return c.json({ error: formatZodError(result.error) }, 400);
        }
      }
    ),
    async (c) => {
      const query = c.req.valid('query');

      const totalItems = await db
        .select({ count: count() })
        .from(jobs)
        .where(
          and(
            query.userId ? eq(jobs.userId, query.userId) : undefined,
            eq(jobs.status, query.status),
            query.q ? ilike(jobs.title, `%${query.q}%`) : undefined
          )
        );

      // TODO Add a order by
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
        .innerJoin(users, eq(jobs.userId, users.id))
        .where(
          and(
            query.userId ? eq(jobs.userId, query.userId) : undefined,
            eq(jobs.status, query.status),
            query.q ? ilike(jobs.title, `%${query.q}%`) : undefined
          )
        )
        .orderBy(desc(jobs.createdAt))
        .limit(query.pageSize)
        .offset((query.page - 1) * query.pageSize);

      const metadata = generateMetadata(totalItems[0].count, query.page, query.pageSize);
      return c.json({ data, metadata });
    }
  )
  .get(
    '/:id',
    zValidator(
      'param',
      z.object({
        id: z.string('id is required')
      })
    ),
    async (c) => {
      const { id } = c.req.valid('param');

      const [data] = await db
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
        .innerJoin(users, eq(jobs.userId, users.id))
        .where(eq(jobs.id, id));

      if (!data) {
        return c.json({ error: 'job not found' }, 404);
      }

      return c.json({ data });
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
        return c.json({ error: 'unauthorized', success: false }, 401);
      }

      const values = c.req.valid('json');

      const data = await db
        .insert(jobs)
        .values({ id: createId(), userId: auth.userId, ...values })
        .returning();

      return c.json({ data: data, success: true });
    }
  )
  .patch(
    '/:id',
    clerkMiddleware(),
    zValidator(
      'param',
      z.object({
        id: z.string('id is required')
      })
    ),
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

      const { id } = c.req.valid('param');
      const values = c.req.valid('json');

      const jobToUpdate = db.$with('job_to_update').as(
        db
          .select({ id: jobs.id })
          .from(jobs)
          .innerJoin(users, eq(jobs.userId, users.id))
          .where(and(eq(jobs.id, id), eq(jobs.userId, auth.userId)))
      );

      const [data] = await db
        .with(jobToUpdate)
        .update(jobs)
        .set(values)
        .where(inArray(jobs.id, sql`(SELECT id FROM ${jobToUpdate})`))
        .returning();

      if (!data) {
        return c.json({ error: 'job not found' }, 404);
      }

      return c.json({ data: data });
    }
  );

export default app;
