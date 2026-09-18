import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  companyName: text('company_name'),
  role: text('role').default('user'), // 'user', 'admin'
  plan: text('plan').default('Free'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  industry: text('industry'),
  revenue: text('revenue'),
  employeeCount: integer('employee_count'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const healthChecks = pgTable('health_checks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  score: integer('score').notNull(),
  dsoDays: integer('dso_days'),
  revenueLeakage: text('revenue_leakage'),
  status: text('status').default('completed'), // completed, pending
  createdAt: timestamp('created_at').defaultNow(),
});
