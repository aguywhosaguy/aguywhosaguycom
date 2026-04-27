import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 20 }).notNull().unique(),
  rank: integer("rank").notNull().default(0)
})
