import db from "~/db/db";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import { listTable } from "~/db/schema";


export const levelRouter = router({
	list: publicProcedure
		.query(async () => {
			const levels = await db.query.listTable.findMany({
				orderBy: [asc(listTable.placement)]
			})

			return levels
		}),

	get: publicProcedure
		.input(z.number().min(1))
		.query(async ( {input} ) => {
			const level = await db.query.listTable.findFirst({
				where: eq(listTable.placement, input)
			})

			return level
		})

	//add: publicProcedure.mutation()
})