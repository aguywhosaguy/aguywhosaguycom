import { betterAuth, User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "~/db/db";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
	emailAndPassword: {  
        enabled: true
    },
    user: {
        additionalFields: {
            rank: {
                type: "number",
                required: false,
                defaultValue: 0,
                input: false
            }
        }
    }
});