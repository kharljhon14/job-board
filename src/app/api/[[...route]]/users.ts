import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod/v4';

import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { mapZodError } from '@/lib/utils';

const app = new Hono()
  .get('/', clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: 'unauthorized' }, 401);
    }

    const [data] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updtaedAt: users.updatedAt
      })
      .from(users)
      .where(eq(users.id, auth.userId));

    if (!data) {
      return c.json({ error: 'not found' }, 404);
    }

    return c.json({ data: data });
  })
  .post(
    '/',

    zValidator(
      'json',
      z.object({
        name: z
          .string({
            error: 'name is required'
          })
          .min(1, 'name is required')
          .max(255, 'name must bot exceed 255 characters'),
        email: z
          .email({
            error: 'must be a valid email'
          })
          .min(1, 'email is required')
          .max(255, 'email must bot exceed 255 characters')
      }),
      (result, c) => {
        if (!result.success) {
          return c.json({ error: mapZodError(result.error) }, 400);
        }
      }
    ),
    async (c) => {
      const values = c.req.valid('json');

      return c.json({ data: values });
    }
  );

export default app;
