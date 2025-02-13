import db from "~/db/db";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { asc } from "drizzle-orm";
import { listTable } from "~/db/schema";

export const levelRouter = router({
	list: publicProcedure.query(async () => {
		const levels = await db.query.listTable.findMany({
			orderBy: [asc(listTable.placement)]
		})

		return levels
	}),

	//add: publicProcedure.mutation()
})