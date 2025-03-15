import { createAuthClient } from "better-auth/solid"
import { inferAdditionalFields } from "better-auth/client/plugins"
import 'dotenv/config'
import { getBaseUrl } from "~/trpc/client"
import { auth } from "./auth"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || getBaseUrl(),
    plugins: [inferAdditionalFields<typeof auth>()]
})

export type Session = typeof authClient.$Infer.Session