import { router } from "../trpc";

import { levelRouter } from "./levels";

export const appRouter = router({
	levels: levelRouter
})

export type AppRouter = typeof appRouter