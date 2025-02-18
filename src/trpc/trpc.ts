import { initTRPC } from '@trpc/server'
import { auth } from '~/lib/auth';

export const createContext = async (req: Request) => {
	const session = await auth.api.getSession({headers: req.headers})

	return {
		session: session
	}
}

export type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const userProcedure = t.procedure.use(async function checkUser(opts) {
	const { ctx, next } = opts

	console.log(ctx)

	return next()
})

export const mergeRouters = t.mergeRouters;
