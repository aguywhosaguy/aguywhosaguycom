import { createAuthClient } from "better-auth/solid"
import 'dotenv/config'
import { getBaseUrl } from "~/trpc/client"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || getBaseUrl() // the base url of your auth server
})