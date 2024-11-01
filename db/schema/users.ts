import { InferSelectModel, SQL, sql } from 'drizzle-orm';
import { pgTable, serial, text, uniqueIndex, AnyPgColumn, pgEnum, boolean, integer, timestamp } from 'drizzle-orm/pg-core';

//user roles enum
export const userRole = pgEnum('role', ['admin', 'user']);

export const userTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    emailVerifiedAt: timestamp('email_verified_at'),
    image: text('image'),
    role: userRole().notNull().$default(() => 'user'),
    isTwoFactorEnabled: boolean('is_two_factor_enabled').$default(() => false),
    
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex('emailUniqueIndex').on(lower(table.email)),
  }),
);

// custom lower function
export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;