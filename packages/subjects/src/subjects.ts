import { createSubjects } from "@openauthjs/openauth"
import { z } from "zod"

export const subjects = createSubjects({
	user: z.object({
		rank: z.number().int().gte(0),
		email: z.string().email()
	})
})