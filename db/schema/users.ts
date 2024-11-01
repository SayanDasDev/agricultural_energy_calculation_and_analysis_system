import { SQL, sql } from 'drizzle-orm';
import { pgTable, serial, text, uniqueIndex, AnyPgColumn, pgEnum, boolean } from 'drizzle-orm/pg-core';

//user roles enum
export const userRole = pgEnum('role', ['admin', 'user']);

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    emailVerified: text('email_verified'),
    image: text('image'),
    role: userRole().$default(() => 'user'),
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
