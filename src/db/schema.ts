import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const listTable = pgTable("list", {
  id: integer().primaryKey(),
  name: varchar({ length: 20 }).notNull(),
  creator: varchar({ length: 20 }).notNull(),
  verifier: varchar({ length: 20 }).notNull(),
  placement: integer(),
});
export type Levels = typeof listTable.$inferSelect