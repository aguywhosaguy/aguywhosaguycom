import db from "~/db/db";
import { router, publicProcedure, userProcedure } from "../trpc";
import { z } from "zod";
import { and, asc, eq, gt, gte, lt, lte, sql } from "drizzle-orm";
import { LevelsInsertSchema, LevelsSchema, listTable } from "~/db/schema";
import { seed } from "drizzle-seed";
import { TRPCError } from "@trpc/server";

export const levelRouter = router({

	// lists all levels. public
	list: publicProcedure
		.query(async () => {
			const levels = await db.query.listTable.findMany({
				orderBy: [asc(listTable.placement)]
			})

			return levels
		}),

	// gets a specific level by placement. public
	get: publicProcedure
		.input(z.number().min(1))
		.query(async ( {input} ) => {
			const level = await db.query.listTable.findFirst({
				where: eq(listTable.placement, input)
			})

			return level
		}),

	// fills the list with fake levels for debugging. rank 3
	seed: userProcedure
		.mutation(async (opts) => {
			if ((opts.ctx.user.rank ?? 0) < 3) {
				throw new TRPCError({
					code: "UNAUTHORIZED"
				})
			}
 
			await seed(db, { listTable }, { count: 150, seed: 12345 }).refine((f) => ({
				listTable: {
					columns: {
						placement: f.int({
							minValue: 1,
							maxValue: 150,
							isUnique: true
						}),
						creator: f.firstName(),
						verifier: f.firstName(),
						name: f.firstName()
					},
				}
			}))
		}),

	// deletes a level. rank 2
	delete: userProcedure
		.input(z.number().min(1))
		.mutation(async (opts) => {

			if ((opts.ctx.user.rank ?? 0) < 2) {
				throw new TRPCError({
					code: "UNAUTHORIZED"
				})
			}

			const level = await db.query.listTable.findFirst({
				where: eq(listTable.id, opts.input)
			})

			if (!level) {
				throw new TRPCError({
					code: "NOT_FOUND"
				})
			}

			await db.delete(listTable)
				.where(eq(listTable.id, opts.input))

			if (level.placement !== null) {
				await db.update(listTable)
					.set({ placement: sql`${listTable.placement} - 1`})
					.where(
						gt(listTable.placement, level.placement)
					)
				}

			return 'Successfully removed level.'
		}),

	// moves a level to a placement. rank 1
	move: userProcedure
		.input(z.object({
			id: z.number().min(1),
			newPlacement: z.number().min(1)
		})
		)
		.mutation(async (opts) => {
			const {id, newPlacement} = opts.input

			if ((opts.ctx.user.rank ?? 0) < 1) {
				throw new TRPCError({
					code: "UNAUTHORIZED"
				})
			}

			const level = await db.query.listTable.findFirst({
				where: eq(listTable.id, id)
			})

			if (!level) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Level does not exist"
				})
			}

			if (!level.placement) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Level has no placement"
				})
			}

			if (level.placement == newPlacement) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Level is already at placement"
				})
			}

			if (newPlacement > level.placement) {
				await db.update(listTable)
					.set({placement: sql`${listTable.placement} - 1`})
					.where(
						and(
							gt(listTable.placement, level.placement),
							lte(listTable.placement, newPlacement)
						)
					)
			} else {
				await db.update(listTable)
					.set({placement: sql`${listTable.placement} + 1`})
					.where(
						and(
							gte(listTable.placement, newPlacement),
							lt(listTable.placement, level.placement)
						)
					)
			}

			await db.update(listTable)
				.set({placement: newPlacement})
				.where(
					eq(listTable.id, id)
				)

			level.placement = newPlacement
			
			return level
		}),

	add: userProcedure
		.input(LevelsInsertSchema)
		.mutation(async (opts) => {
			if ((opts.ctx.user.rank ?? 0) < 2) {
				throw new TRPCError({
					code: "UNAUTHORIZED"
				})
			}

			const level = opts.input

			if (!level.placement) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Level has no placement"
				})
			}

			await db.update(listTable)
				.set({placement: sql`${listTable.placement} + 1`})
				.where(
					gte(listTable.placement, level.placement)
				)
			
			await db.insert(listTable).values(level)

			return level
		})
})