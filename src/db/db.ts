import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema'

const db = drizzle(process.env.DATABASE_URL!, {schema});

console.log(db)

export default db