import { database } from '@repo/database/db'

export const db = database(process.env.DATABASE_URL!)

