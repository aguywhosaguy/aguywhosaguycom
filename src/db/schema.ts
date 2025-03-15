import { pgTable, text, integer, timestamp, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
			
export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text('name').notNull(),
email: text('email').notNull().unique(),
emailVerified: boolean('email_verified').notNull(),
image: text('image'),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull(),
rank: integer('rank')
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
token: text('token').notNull().unique(),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull(),
ipAddress: text('ip_address'),
userAgent: text('user_agent'),
userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text('account_id').notNull(),
providerId: text('provider_id').notNull(),
userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
accessToken: text('access_token'),
refreshToken: text('refresh_token'),
idToken: text('id_token'),
accessTokenExpiresAt: timestamp('access_token_expires_at'),
refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
scope: text('scope'),
password: text('password'),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
value: text('value').notNull(),
expiresAt: timestamp('expires_at').notNull(),
createdAt: timestamp('created_at'),
updatedAt: timestamp('updated_at')
});









// MY schema

export const listTable = pgTable("list", {
  id: integer().primaryKey(),
  name: varchar({ length: 20 }).notNull(),
  creator: varchar({ length: 20 }).notNull(),
  verifier: varchar({ length: 20 }).notNull(),
  placement: integer(),
  url: varchar()
});
export type Levels = typeof listTable.$inferSelect;
export type LevelsInsert = typeof listTable.$inferSelect
export const LevelsSchema = createSelectSchema(listTable)
export const LevelsInsertSchema = createInsertSchema(listTable)