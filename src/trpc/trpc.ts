import { initTRPC, TRPCError } from '@trpc/server'
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

	if (!ctx.session || !ctx.session?.user) {
		throw new TRPCError({
			code: "UNAUTHORIZED"
		})
	}

	return next({
		ctx: {
			user: ctx.session.user
		}
	})
})

export const mergeRouters = t.mergeRouters;
