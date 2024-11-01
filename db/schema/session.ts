import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { InferSelectModel } from "drizzle-orm";


export const sessions = pgTable(
  "gf_session",
  {
    id: text("id").primaryKey(),
    userId: serial("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (table) => ({
    userIdIdx: index("sessions_user_id_idx").on(table.userId),
  })
);

export type Session = InferSelectModel<typeof sessions>;