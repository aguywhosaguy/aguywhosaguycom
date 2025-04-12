import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema'

export const database = (databaseURL: string) => {
	return drizzle(databaseURL, {schema})
}