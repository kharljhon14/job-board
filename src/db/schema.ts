import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['job_seeker', 'employer', 'admin']);
export const jobStatus = pgEnum('job_status', ['active', 'closed', 'draft']);
export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: userRole('role').default('job_seeker').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const jobs = pgTable('jobs', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  salaryMin: integer('salary_min'),
  salaryMax: integer('salary_max'),
  status: jobStatus('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const jobsRelations = relations(jobs, ({ one }) => ({
  users: one(users, {
    fields: [jobs.userId],
    references: [users.id]
  })
}));
