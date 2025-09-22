import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const userRole = pgEnum('user_role', ['job_seeker', 'employer', 'admin']);
export const jobStatus = pgEnum('job_status', ['active', 'closed', 'draft']);
export const jobType = pgEnum('job_type', ['full_time', 'part_time', 'gig', 'any']);
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
  salary: varchar('salary', { length: 255 }),
  status: jobStatus('status').default('draft').notNull(),
  type: jobType('type').default('any').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const jobsRelations = relations(jobs, ({ one }) => ({
  users: one(users, {
    fields: [jobs.userId],
    references: [users.id]
  })
}));

export const insertJobSchema = createInsertSchema(jobs, {
  title: (schema) =>
    schema.min(1, 'title is required').max(255, 'title must not exceed 255 characters'),
  description: (schema) => schema.min(1, 'description is required'),
  salary: (schema) => schema.max(255, 'salary must not exceed 255 characters')
});
