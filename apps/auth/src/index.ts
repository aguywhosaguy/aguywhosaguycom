import { issuer } from "@openauthjs/openauth"
import { PasswordProvider } from "@openauthjs/openauth/provider/password"
import { PasswordUI } from "@openauthjs/openauth/ui/password"
import Mailgun from "mailgun.js"
import { subjects } from "@repo/subjects/subjects"
import { database } from "@repo/database/db"
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare"
import { eq } from "drizzle-orm"
import { accountsTable } from "@repo/database/schema"

export interface Env {
	BINDING_NAME: KVNamespace
	MAILGUN_API_KEY: string
	DATABASE_URL: string
}



export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (!process.env.MAILGUN_API_KEY) {
			throw new Error("MAILGUN_API_KEY environment variable is required")
		}
		
		if (!process.env.DATABASE_URL) {
			throw new Error("DATABASE_URL environment variable is required")
		}
		
		const db = database(process.env.DATABASE_URL)
		const mg = new Mailgun(FormData).client({username: "api", key: process.env.MAILGUN_API_KEY})
		
		const app = issuer({
			providers: {
				password: PasswordProvider(
					PasswordUI({
						copy: {
							login_title: "aguywhosaguy.com",
							register_title: "aguywhosaguy.com"
						},
						sendCode: async (email, code) => {
							try {
								await mg.messages.create("mail.aguywhosaguy.com", {
									from: "auth@mail.aguywhosaguy.com",
									to: email,
									subject: "aguywhosaguy.com auth code",
									text: "Your auth code is " + code + ". Don't share it with anyone.\nDo not reply to this email."
								})
							} catch (error) {
								console.log("EMAIL TIMED OUT !!")
							}
						},
					})
				)
			},
			subjects: subjects,
			storage: CloudflareStorage({namespace: env.BINDING_NAME}),
			success: async (response, input, req) => {
				if (input.provider !== "password") {
					throw new Error("Invalid Provider")
				}
				let user = await db.select()
					.from(accountsTable)
					.where(
						eq(accountsTable.email, input.email)
					)

				if (!user) {
					user = await db.insert(accountsTable).values({email: input.email, rank: 0}).returning()
				}

				return response.subject("user", user[0])
			},
		})

		return app.fetch(request, env)
	}
}