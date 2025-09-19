import { pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['job_seeker', 'employer', 'admin']);

export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: userRole('role').default('job_seeker').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const companies = pgTable('companies', {});
