/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from 'hono';
import { Webhook } from 'svix';

import { db } from '@/db/drizzle';
import { users } from '@/db/schema';

const app = new Hono().post(async (c) => {
  try {
    const payload = await c.req.text();

    const svix_id = c.req.header('svix-id');
    const svix_timestamp = c.req.header('svix-timestamp');
    const svix_signature = c.req.header('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return c.text('Missing svix headers', 400);
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET || '');
    let evt: any;

    try {
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature
      });
    } catch (err) {
      console.error('Webhook verification failed:', err);
      return c.text('Error verifying webhook', 400);
    }

    const { id, email_addresses, first_name, last_name } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created') {
      await db.insert(users).values({
        id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`
      });
    }

    return c.text('Webhook received', 200);
  } catch (err) {
    console.error('Unexpected error:', err);
    return c.text('Server error', 500);
  }
});

export default app;
