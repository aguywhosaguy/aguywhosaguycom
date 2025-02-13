import { createAsync, query } from "@solidjs/router"
import { asc } from "drizzle-orm"
import { For, Suspense } from "solid-js"
import Level from "~/components/Level"
import db from "~/db/db"
import { listTable } from "~/db/schema"

const getLevels = query(async () => {
	"use server"
	const levels = await db.query.listTable.findMany({
		orderBy: [asc(listTable.placement)]
	})
	return levels
}, "getlevels")


const List = () => {


	const levels = createAsync(() => getLevels())

	return (
		<div class="mx-auto my-5 w-4/5 space-y-5">
			<Suspense fallback={<div>Loading..</div>}>
				<For each={levels()}>
					{(level) => <Level level={level} />}
				</For>
			</Suspense>
		</div>
	)
}
export default List